import { basename, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import lodash from 'lodash';

export function getNewestCommitDate(file: string) {
  const result = spawnSync('git', ['log', '--format=%ct', '--max-count=1', basename(file)], {
    cwd: dirname(file),
    encoding: 'utf-8',
  });

  if (result.error) {
    throw new Error(`Failed to retrieve the git history for file "${file}"`);
  }
  const output = result.stdout.trim();
  const regex = /^(?<timestamp>\d+)$/;
  const match = output.match(regex);

  if (!match?.groups?.timestamp) {
    return new Date();
  }

  const timestamp = Number(match.groups.timestamp);
  const date = new Date(timestamp * 1000);
  return date;
}


const { escape } = lodash;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Feature = {
    title: string;
    slug: string;
    description: string;
    contents: string;
    markdown: string;
    body: string;
};

export function getFeatures(): Feature[] {
    const featuresDir = path.join(__dirname, '../../../features');
    const outputDir = path.join(__dirname, '../../.astro/content/features');
    const features: Feature[] = [];

    function readFeaturesRecursively(directory: string): void {
        const files = fs.readdirSync(directory);

        files.forEach((file) => {
            const fullPath = path.join(directory, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                readFeaturesRecursively(fullPath);
            } else if (stat.isFile() && file.endsWith('.feature')) {
                const contents = fs.readFileSync(fullPath, 'utf-8');
                const formattedMarkdownContent = generateMarkdownContent(contents);

                const feature: Feature = {
                    title: extractTitle(contents),
                    slug: path.relative(featuresDir, fullPath).replace(/\\/g, '/').replace('.feature', ''),
                    description: extractDescription(contents),
                    contents: contents,
                    markdown: formattedMarkdownContent,
                    body: formattedMarkdownContent
                };

                features.push(feature);
                writeMarkdownFile(feature);
            }
        });
    }

    function extractTitle(contents: string): string {
        const titleMatch = contents.match(/Feature:\s*(.*)/);
        return titleMatch ? titleMatch[1] : 'Untitled';
    }

    function extractDescription(contents: string): string {
        const lines = contents.split('\n');
        let description = '';
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '' || lines[i].trim().startsWith('Scenario')) {
                break;
            }
            description += lines[i].trim() + '\n';
        }
        return description.trim();
    }

    function generateMarkdownContent(contents: string): string {
        const lines = contents.split('\n');
        let markdownContent = '';
        let inTable = false;

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            const sanitizedLine = escape(trimmedLine);

            if (trimmedLine.startsWith('Scenario') || trimmedLine.startsWith('Background')) {
                if (inTable) {
                    markdownContent += '\n';
                    inTable = false;
                }
                markdownContent += `## ${sanitizedLine}\n`;
            } else if (trimmedLine.startsWith('Given') || trimmedLine.startsWith('When') || trimmedLine.startsWith('Then') || trimmedLine.startsWith('And') || trimmedLine.startsWith('But')) {
                if (inTable) {
                    markdownContent += '\n';
                    inTable = false;
                }
                const keyword = trimmedLine.split(' ')[0];
                const stepContent = trimmedLine.slice(keyword.length).trim();
                markdownContent += `- **${keyword}** ${escape(stepContent)}\n`;
            } else if (trimmedLine.startsWith('|') && inTable) {
                const values = trimmedLine.split('|').map((v) => v.trim()).filter((v) => v);
                if (values.length > 0) {
                    markdownContent += `| ${values.join(' | ')} |\n`;
                }
            } else if (trimmedLine.startsWith('|') && (lines[index - 1].trim().startsWith('Given') || lines[index - 1].trim().startsWith('When') || lines[index - 1].trim().startsWith('Then'))) {
                if (!inTable) {
                    inTable = true;
                    const headers = trimmedLine.split('|').map((h) => h.trim()).filter((h) => h);
                    markdownContent += `\n| ${headers.join(' | ')} |\n`;
                    markdownContent += `| ${headers.map(() => '---').join(' | ')} |\n`;
                }
            } else if (trimmedLine.startsWith('Examples:')) {
                if (inTable) {
                    markdownContent += '\n';
                    inTable = false;
                }
                markdownContent += `### ${sanitizedLine}\n`;
                const headerLine = lines[index + 1].trim();
                if (headerLine.startsWith('|')) {
                    const headers = headerLine.split('|').map((h) => h.trim()).filter((h) => h);
                    markdownContent += `| ${headers.join(' | ')} |\n`;
                    markdownContent += `| ${headers.map(() => '---').join(' | ')} |\n`;
                    for (let i = index + 2; i < lines.length; i++) {
                        const exampleLine = lines[i].trim();
                        if (exampleLine === '' || exampleLine.startsWith('Scenario')) {
                            break;
                        }
                        const values = exampleLine.split('|').map((v) => v.trim()).filter((v) => v);
                        if (values.length > 0) {
                            markdownContent += `| ${values.join(' | ')} |\n`;
                        }
                    }
                }
            }
        });

        return markdownContent;
    }

    function writeMarkdownFile(feature: Feature): void {
        const { slug, markdown } = feature;
        const outputPath = path.join(outputDir, `${slug}.mdx`);
        const outputDirectory = path.dirname(outputPath);

        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, { recursive: true });
        }

        const markdownContent = `---\ntitle: "${feature.title}"\ntopic: "References"\n\nslug: "${feature.slug}"\n---\n\n${feature.description}\n\n<div class="feature-page">\n\n${markdown}\n\n</div>`;

        // Check if the target file exists and compare contents
        if (fs.existsSync(outputPath)) {
            const existingContent = fs.readFileSync(outputPath, 'utf-8');
            if (existingContent === markdownContent) {
                // Skip writing if the contents are identical
                return;
            }
        }

        // Write the file if contents are different or if the file does not exist
        fs.writeFileSync(outputPath, markdownContent, 'utf-8');
    }

    readFeaturesRecursively(featuresDir);

    return features;
}

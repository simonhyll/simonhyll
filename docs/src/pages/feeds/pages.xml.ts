import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { basename, dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context: any) {
  const docs = await getCollection('docs');
  return rss({
    title: 'Simon Hyll',
    description: 'Simon says: make something awesome!',
    site: context.site,
    trailingSlash: false,
    // TODO: Make sure it renders nicely
    // stylesheet: '/rss.xsl',
    items: docs
      .map((post) => ({
        title: post.data.title,
        pubDate: getNewestCommitDate(join('src', 'content', 'docs', post.id)),
        description: post.data.description,
        customData: post.data.customData,
        link: `/${post.slug}`,
        // Note: this will not process components or JSX expressions in MDX files.
        content: sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        }),
      }))
      .sort((a: any, b: any) => b.pubDate - a.pubDate),
  });
}

function getNewestCommitDate(file: string) {
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

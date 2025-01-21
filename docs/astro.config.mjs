import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'url';
import path from 'path';
import serviceWorker from 'astrojs-service-worker';
import starlightSidebarTopics from 'starlight-sidebar-topics';
// import starlightGlossary from '@simonhyll/starlight-glossary';
import starlightEnhanced from '@simonhyll/starlight-enhanced';
import starlightBlog from 'starlight-blog';
import vue from '@astrojs/vue';
import lunaria from '@lunariajs/starlight';
import sitemap from '@astrojs/sitemap';
import webmanifest from 'astro-webmanifest';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getNewestCommitDate } from './src/lib/index.ts';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://simon.hyll.nu',
  trailingSlash: 'never',
  vite: {
    build: {
      assetsInlineLimit: 1,
    },
  },
  build: {
    format: 'file',
  },
  vite: {
    build: {
      rollupOptions: {
        external: [/@docker\/.*/],
      },
    },
  },
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        { behavior: 'wrap', properties: { ariaHidden: true, tabIndex: -1, class: 'heading-link' } },
      ],
    ],
  },
  integrations: [
    starlight({
      title: 'Simon Hyll',
      logo: {
        src: '@assets/me.webp',
      },
      favicon: '/favicon.png',
      social: {
        rss: 'https://simon.hyll.nu/feeds',
        github: 'https://github.com/simonhyll',
        linkedin: 'https://linkedin.com/in/simonhyll',
        discord: 'https://discord.com/invite/tauri',
        stackOverflow: 'https://stackoverflow.com/users/5614602/simon-hyll',
        youtube: 'https://youtube.com/@hyllsimon',
        patreon: 'https://patreon.com/simonhyll',
      },
      lastUpdated: true,
      editLink: {
        baseUrl:
          process.env.NODE_ENV === 'development'
            ? `vscode://file/${path.dirname(fileURLToPath(import.meta.url))}`
            : 'https://github.com/simonhyll/simonhyll/edit/main/docs/',
      },
      expressiveCode: {
        styleOverrides: { borderRadius: '0.5rem' },
      },
      tableOfContents: {
        maxHeadingLevel: 6,
      },
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/navigate.js',
          },
        },
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2447350647052509',
            crossorigin: 'anonymous',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'application/rss+xml',
            title: 'Simon Says',
            href: 'https://simon.hyll.nu/blog/rss.xml',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'application/rss+xml',
            title: 'Simon Säger',
            href: 'https://simon.hyll.nu/sv/blog/rss.xml',
          },
        },
        {
          tag: 'link',
          attrs: {
            href: '/sitemap-index.xml',
          },
        },
        {
          tag: 'meta',
          attrs: {
            'http-equiv': 'Content-Security-Policy',
            content: `default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' google.com googlesyndication.com adtrafficquality.google;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: google.com googlesyndication.com adtrafficquality.google;
  connect-src 'self' google.com googlesyndication.com adtrafficquality.google;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  frame-src 'self' google.com googlesyndication.com adtrafficquality.google;`,
          },
        },
      ],
      customCss: ['./src/styles/main.scss'],
      components: {
        Sidebar: './src/components/overrides/Sidebar.astro',
        MarkdownContent: './src/components/overrides/MarkdownContent.astro',
      },
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        sv: {
          label: 'Svenska',
          lang: 'sv-SE',
        },
      },
      plugins: [
        starlightSidebarTopics([
          {
            label: {
              en: 'Projects',
              'sv-SE': 'Projekt',
            },
            id: 'projects',
            link: '/projects',
            icon: 'rocket',
            items: [
              {
                label: 'Introduction',
                link: '/projects',
              },
              {
                label: 'GitHub Actions',
                collapsed: true,
                autogenerate: { directory: 'projects/actions' },
              },
              {
                label: 'Docker Containers',
                collapsed: true,
                autogenerate: { directory: 'projects/docker' },
              },
              {
                label: 'Helm Charts',
                collapsed: true,
                autogenerate: { directory: 'projects/helm' },
              },
              {
                label: 'Python Packages',
                collapsed: true,
                autogenerate: { directory: 'projects/python' },
              },
              {
                label: 'Rust Crates',
                collapsed: true,
                autogenerate: { directory: 'projects/rust' },
              },
              {
                label: 'TypeScript Packages',
                collapsed: true,
                autogenerate: { directory: 'projects/typescript' },
              },
              {
                label: 'Tools',
                collapsed: true,
                items: [
                  {
                    label: 'Life',
                    collapsed: true,
                    autogenerate: { directory: 'projects/tools/life' },
                  },
                  {
                    label: 'Network',
                    collapsed: true,
                    autogenerate: { directory: 'projects/tools/network' },
                  },
                ],
              },
            ],
          },
          {
            label: 'Developer Handbook',
            link: '/developer-handbook',
            icon: 'open-book',
            items: [
              {
                label: 'Introduction',
                link: '/developer-handbook',
              },
              {
                label: 'Procedures',
                collapsed: false,
                autogenerate: { directory: 'developer-handbook/procedures' },
              },
            ],
          },
          {
            label: 'Rust by Simon',
            link: '/rust-by-simon',
            icon: 'open-book',
            items: [
              {
                label: 'Introduction',
                link: '/rust-by-simon',
              },
              {
                label: 'Setup',
                collapsed: false,
                autogenerate: { directory: 'rust-by-simon/setup' },
              },
              {
                label: 'Documentation',
                collapsed: false,
                autogenerate: { directory: 'rust-by-simon/documentation' },
              },
              {
                label: 'Frontend',
                collapsed: false,
                autogenerate: { directory: 'rust-by-simon/frontend' },
              },
              {
                label: 'Backend',
                collapsed: false,
                autogenerate: { directory: 'rust-by-simon/backend' },
              },
              {
                label: 'Debugging',
                collapsed: false,
                autogenerate: { directory: 'rust-by-simon/debugging' },
              },
              {
                label: 'Testing',
                collapsed: false,
                autogenerate: { directory: 'rust-by-simon/testing' },
              },
              {
                label: 'Distributing',
                collapsed: false,
                autogenerate: { directory: 'rust-by-simon/distributing' },
              },
              {
                label: 'Best Practices',
                collapsed: false,
                autogenerate: { directory: 'rust-by-simon/best-practices' },
              },
            ],
          },
          {
            label: 'Tauri by Simon',
            link: '/tauri-by-simon',
            icon: 'open-book',
            items: [
              {
                label: 'Introduction',
                link: '/tauri-by-simon',
              },
              {
                label: 'Setup',
                collapsed: false,
                autogenerate: { directory: 'tauri-by-simon/setup' },
              },
              {
                label: 'Documentation',
                collapsed: false,
                autogenerate: { directory: 'tauri-by-simon/documentation' },
              },
              {
                label: 'Frontend',
                collapsed: false,
                autogenerate: { directory: 'tauri-by-simon/frontend' },
              },
              {
                label: 'Backend',
                collapsed: false,
                autogenerate: { directory: 'tauri-by-simon/backend' },
              },
              {
                label: 'Debugging',
                collapsed: false,
                autogenerate: { directory: 'tauri-by-simon/debugging' },
              },
              {
                label: 'Testing',
                collapsed: false,
                autogenerate: { directory: 'tauri-by-simon/testing' },
              },
              {
                label: 'Distributing',
                collapsed: false,
                autogenerate: { directory: 'tauri-by-simon/distributing' },
              },
              {
                label: 'Best Practices',
                collapsed: false,
                autogenerate: { directory: 'tauri-by-simon/best-practices' },
              },
            ],
          },
          {
            label: 'Bevy by Simon',
            link: '/bevy-by-simon',
            icon: 'open-book',
            items: [
              {
                label: 'Introduction',
                link: '/bevy-by-simon',
              },
              {
                label: 'Setup',
                collapsed: false,
                autogenerate: { directory: 'bevy-by-simon/setup' },
              },
              {
                label: 'Documentation',
                collapsed: false,
                autogenerate: { directory: 'bevy-by-simon/documentation' },
              },
              {
                label: 'Frontend',
                collapsed: false,
                autogenerate: { directory: 'bevy-by-simon/frontend' },
              },
              {
                label: 'Backend',
                collapsed: false,
                autogenerate: { directory: 'bevy-by-simon/backend' },
              },
              {
                label: 'Debugging',
                collapsed: false,
                autogenerate: { directory: 'bevy-by-simon/debugging' },
              },
              {
                label: 'Testing',
                collapsed: false,
                autogenerate: { directory: 'bevy-by-simon/testing' },
              },
              {
                label: 'Distributing',
                collapsed: false,
                autogenerate: { directory: 'bevy-by-simon/distributing' },
              },
              {
                label: 'Best Practices',
                collapsed: false,
                autogenerate: { directory: 'bevy-by-simon/best-practices' },
              },
            ],
          },
          {
            label: {
              en: 'Cookbook',
              'sv-SE': 'Kokbok',
            },
            link: '/cookbook',
            icon: 'open-book',
            items: [
              {
                label: 'Introduction',
                link: '/cookbook',
              },
              {
                label: 'Basics',
                collapsed: false,
                autogenerate: { directory: 'cookbook/basics' },
              },
              {
                label: 'Dinner',
                collapsed: false,
                autogenerate: { directory: 'cookbook/dinner' },
              },
              {
                label: 'Desserts',
                collapsed: false,
                autogenerate: { directory: 'cookbook/desserts' },
              },
              {
                label: 'Snacks',
                collapsed: false,
                autogenerate: { directory: 'cookbook/snacks' },
              },
            ],
          },
          {
            label: {
              en: 'Blog',
              'sv-SE': 'Blogg',
            },
            id: 'blog',
            link: '/blog',
            icon: 'document',
            items: [],
          },
        ]),
        // starlightGlossary({}),
        starlightEnhanced({
          header: {
            links: [
              {
                title: 'Projects',
                value: '/projects',
                transfer: true,
              },
              {
                title: 'Handbook',
                value: '/developer-handbook',
                transfer: true,
              },
              {
                title: 'Tauri',
                value: '/tauri-by-simon',
                transfer: true,
              },
              {
                title: 'Blog',
                value: '/blog',
                transfer: true,
              },
            ],
          },
        }),
        starlightBlog({
          title: {
            en: 'Blog',
            sv: 'Blogg',
          },
          authors: {
            simon: {
              name: 'Simon Hyll',
              title: 'The Blue Crab',
              picture: '/me.webp',
              url: 'https://simon.hyll.nu',
            },
          },
        }),
        lunaria({
          sync: true,
        }),
      ],
    }),
    serviceWorker({
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        inlineWorkboxRuntime: true,
        skipWaiting: true,
        globIgnores: [],
        globPatterns: ['**/*.js', '**/*.css', '**/*.html'],
        runtimeCaching: [
          {
            urlPattern: new RegExp('.*'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'runtime-assets',
              expiration: {
                maxAgeSeconds: 30 * 60, // 30 minutes
              },
            },
          },
        ],
      },
    }),
    vue(),
    sitemap({
      xslURL: 'http://localhost:4321/sitemap.xsl',
      serialize(item) {
        item.changefreq = 'monthly'; // TODO: Calculate an average
        let path = item.url.replace('https://simon.hyll.nu', '');
        if (path.charAt(path.length - 1) === '/') path = `${path}index.mdx`;
        path = `src/content/docs${path}`;
        try {
          item.lastmod = getNewestCommitDate(path);
        } catch (e) {
          item.lastmod = new Date();
        }
        item.priority = 0.9;
        return item;
      },
    }),
    webmanifest({
      name: 'Simon Hyll',
      icon: 'src/assets/icon.png',
      short_name: 'Simon',
      description: 'My personal website',
      start_url: '/',
      theme_color: '#272727',
      background_color: '#272727',
      display: 'standalone',
    }),
    mdx(),
  ],
});

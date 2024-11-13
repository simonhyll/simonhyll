import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'url';
import path from 'path';
import serviceWorker from 'astrojs-service-worker';
import starlightSidebarTopics from 'starlight-sidebar-topics'
// import starlightGlossary from '@simonhyll/starlight-glossary';
import starlightEnhanced from '@simonhyll/starlight-enhanced';
import starlightBlog from 'starlight-blog'
import vue from "@astrojs/vue";
import lunaria from '@lunariajs/starlight';
import sitemap from '@astrojs/sitemap';
import webmanifest from 'astro-webmanifest';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// https://astro.build/config
export default defineConfig({
  site: 'https://simon.hyll.nu',
  trailingSlash: 'never',
  vite: {
    build: {
      assetsInlineLimit: 1
    }
  },
  build: {
    format: 'file'
  },
	markdown: {
		remarkPlugins: [],
		rehypePlugins: [
			rehypeHeadingIds, [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { ariaHidden: true, tabIndex: -1, class: 'heading-link' } }]]
	},
  integrations: [
    starlight({
      title: 'Simon Hyll',
      logo: {
        src: '@assets/me.jpg',
      },
      favicon: '/favicon.png',
      social: {
        rss: 'https://simon.hyll.nu/blog/rss.xml',
        github: 'https://github.com/simonhyll',
        linkedin: 'https://linkedin.com/in/simonhyll',
        discord: 'https://discord.com/invite/tauri',
        stackOverflow: 'https://stackoverflow.com/users/5614602/simon-hyll',
        youtube: 'https://youtube.com/@hyllsimon',
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
        maxHeadingLevel: 6
      },
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/navigate.js',
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
            'http-equiv':"Content-Security-Policy",
            content: `default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    connect-src 'self';
    font-src 'self';
    object-src 'none';
    base-uri 'self';`
          },
        },
      ],
      customCss: ['./src/styles/main.scss'],
      components: {
        Sidebar: '@simonhyll/starlight-enhanced/components/Sidebar.astro',
        MarkdownContent: './src/components/overrides/MarkdownContent.astro'
      },
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en', // lang is required for root locales
        },
        'sv': {
          label: 'Svenska',
          lang: 'sv-SE',
        },
      },
      plugins: [
        starlightSidebarTopics([
          {
            label: {
              en: 'Projects',
              'sv-SE': 'Projekt'
            },
            link: '/projects',
            icon: 'rocket',
            items: [{
              label: 'Welome',
              link: '/projects',
            },{
              label: 'GitHub Actions',
              collapsed: true,
              autogenerate: { directory: 'projects/actions' },
            },{
              label: 'Docker Containers',
              collapsed: true,
              autogenerate: { directory: 'projects/docker' },
            },{
              label: 'Helm Charts',
              collapsed: true,
              autogenerate: { directory: 'projects/helm' },
            },{
              label: 'Python Packages',
              collapsed: true,
              autogenerate: { directory: 'projects/python' },
            },{
              label: 'Rust Crates',
              collapsed: true,
              autogenerate: { directory: 'projects/rust' },
            },{
              label: 'TypeScript Packages',
              collapsed: true,
              autogenerate: { directory: 'projects/typescript' },
            }],
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
                label: 'Best Practices',
                collapsed: true,
                autogenerate: { directory: 'developer-handbook/best-practices' },
              },
              {
                label: 'Experiments',
                collapsed: true,
                autogenerate: { directory: 'developer-handbook/experiments' },
              },
              {
                label: 'Procedures',
                collapsed: true,
                autogenerate: { directory: 'developer-handbook/procedures' },
              },
              {
                label: 'Buzz Words',
                collapsed: true,
                autogenerate: { directory: 'developer-handbook/buzz-words' },
              }],
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
                label: 'Best Practices',
                collapsed: true,
                autogenerate: { directory: 'tauri-by-simon/best-practices' },
              }],
          },
          {
            label: {
              en: 'Cookbook',
              'sv-SE': 'Kokbok'
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
              }],
          },
          {
            label: {
              en: 'Blog',
              'sv-SE': 'Blogg'
            },
            id: 'blog',
            link: '/blog',
            icon: 'document',
            items: [],
          }]),
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
            sv: 'Blogg'
          },
          authors: {
            simon: {
              name: 'Simon Hyll',
              title: 'The Blue Crab',
              picture: '/me.jpg',
              url: 'https://simon.hyll.nu',
            },
          },
        }),
        lunaria({
          sync: true,
        })
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
    sitemap(),
    webmanifest({
      name: 'Simon Hyll',
      icon: 'src/assets/icon.png',
      short_name: 'Simon',
      description: 'My personal website',
      start_url: '/',
      theme_color: '#0069cd',
      background_color: '#0069cd',
      display: 'standalone',
    }),
  ],
});

import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'url';
import path from 'path';
import serviceWorker from 'astrojs-service-worker';
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightGlossary from '@simonhyll/starlight-glossary';
import starlightEnhanced from '@simonhyll/starlight-enhanced';
import starlightBlog from 'starlight-blog'
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://simon.hyll.nu',
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
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/navigate.js',
          },
        },
      ],
      customCss: ['./src/styles/main.scss'],
      components: {
        Sidebar: '@simonhyll/starlight-enhanced/components/Sidebar.astro',
        MarkdownContent: './src/components/overrides/MarkdownContent.astro'
      },
      plugins: [
        starlightSidebarTopics([
          {
            label: 'Projects',
            link: '/projects/start/',
            icon: 'rocket',
            items: [{
              label: 'Welome',
              link: '/projects/start/',
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
            link: '/developer-handbook/',
            icon: 'open-book',
            items: [
              {
                label: 'Introduction',
                link: '/developer-handbook/',
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
            link: '/tauri-by-simon/',
            icon: 'open-book',
            items: [
              {
                label: 'Introduction',
                link: '/tauri-by-simon/',
              },
              {
                label: 'Best Practices',
                collapsed: true,
                autogenerate: { directory: 'tauri-by-simon/best-practices' },
              }],
          },
          {
            label: 'Cookbook',
            link: '/cookbook/',
            icon: 'open-book',
            items: [
              {
                label: 'Introduction',
                link: '/cookbook/',
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
              }],
          },
          {
            label: 'Blog',
            link: '/blog/',
            icon: 'document',
            items: [],
          }]),
        starlightGlossary({}),
        starlightEnhanced({
          header: {
            links: [
              {
                title: 'Projects',
                value: '/projects/start/',
                transfer: true,
              },
              {
                title: 'Handbook',
                value: '/developer-handbook/best-practices/',
                transfer: true,
              },
              {
                title: 'Tauri',
                value: '/tauri-by-simon/best-practices/',
                transfer: true,
              },
              {
                title: 'Blog',
                value: '/blog/',
                transfer: false,
              },
            ],
          },
        }),
        starlightBlog({
          authors: {
            simon: {
              name: 'Simon Hyll',
              title: 'The Blue Crab',
              picture: '/me.jpg',
              url: 'https://simon.hyll.nu',
            },
          },
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
    vue()
  ],
});

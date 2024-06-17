import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'url';
import path from 'path';
import serviceWorker from 'astrojs-service-worker';
import starlightUtils from '@lorenzo_lewis/starlight-utils';
import starlightGlossary from '@simonhyll/starlight-glossary';
import starlightEnhanced from '@simonhyll/starlight-enhanced';

// https://astro.build/config
export default defineConfig({
  site: 'https://simon.hyll.nu',
  integrations: [
    starlight({
      title: 'Simon Hyll',
      logo: {
        src: '@assets/me.jpg',
      },
      favicon: './src/assets/icon.png',
      social: {
        rss: 'https://simon.hyll.nu/feed.xml',
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
      plugins: [
        starlightUtils({
          multiSidebar: {
            switcherStyle: 'horizontalList',
          },
        }),
        starlightGlossary({}),
        starlightEnhanced({
          header: {
            links: [
              {
                title: 'Guides',
                value: '/start/',
                transfer: true,
              },
              {
                title: 'References',
                value: '/reference/acl/capability/',
                transfer: true,
              },
              {
                title: 'Blog',
                value: '/blog/',
                transfer: false,
              },
              {
                title: 'Releases',
                value: '/release/',
                transfer: true,
              },
            ],
          },
        }),
      ],
      sidebar: [
        {
          label: 'Projects',
          collapsed: true,
          autogenerate: { directory: 'project' },
        },
        {
          label: 'Handbook',
          collapsed: true,
          autogenerate: { directory: 'handbook' },
        },
        {
          label: 'Blog',
          collapsed: true,
          items: [
            {
              label: 'Latest',
              link: '/blog/',
            },
            {
              label: 'All',
              collapsed: true,
              autogenerate: { directory: 'blog' },
            },
          ],
        },
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
  ],
});

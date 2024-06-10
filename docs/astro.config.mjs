import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightUtils from '@lorenzo_lewis/starlight-utils';
import { fileURLToPath } from 'url';
import path from 'path';

console.log(process.env.NODE_ENV);

// https://astro.build/config
export default defineConfig({
  site: 'https://simon.hyll.nu',
  integrations: [
    starlight({
      title: 'Simon Hyll',
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
      components: {
        ThemeSelect: './src/components/overrides/ThemeSelect.astro',
      },
      plugins: [
        starlightUtils({
          multiSidebar: {
            switcherStyle: 'horizontalList',
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
          autogenerate: { directory: 'reference' },
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
  ],
});

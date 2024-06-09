import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://simon.hyll.nu',
	integrations: [
		starlight({
			title: 'Simon Hyll',
			social: {
				rss: 'https://simon.hyll.nu/feed.xml',
				github: 'https://github.com/sponsors/simonhyll',
				linkedin: 'https://linkedin.com/in/simonhyll',
				discord: 'https://discord.com/invite/tauri',
				stackOverflow: 'https://stackoverflow.com/users/5614602/simon-hyll',
				youtube: 'https://youtube.com/@hyllsimon',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});

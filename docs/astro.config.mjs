import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightUtils from "@lorenzo_lewis/starlight-utils";

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
			plugins: [starlightUtils({
				multiSidebar: {
				  switcherStyle: "horizontalList",
				},
			})],
			sidebar: [
				{
					label: 'Projects',
					collapsed: true,
					autogenerate: { directory: 'project' },
				},
				{
					label: 'References',
					collapsed: true,
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Blog',
					collapsed: true,
					autogenerate: { directory: 'blog' },
				},
			],
		}),
	],
});

import type { StarlightPlugin } from '@astrojs/starlight/types';
import { validateConfig, type StarlightGlossaryConfig } from './config';
import integration from './integration';
// import { defineCollection, z } from 'astro:content';

function plugin(userConfig?: StarlightGlossaryConfig): StarlightPlugin {
  const configSchema = validateConfig(userConfig);
  return {
    name: 'starlight-glossary',
    hooks: {
      async setup({ addIntegration, config, updateConfig, astroConfig }) {
        // const allBlogPosts = await getCollection('glossary');
        // console.log(allBlogPosts)
        console.log(config);
        console.log();
        console.log(astroConfig);
        addIntegration(integration(configSchema));
      },
    },
  };
}

// const schema = defineCollection({
//     type: 'content',
//     schema: z.object({
//         title: z.string(),
//         tags: z.array(z.string()),
//         image: z.string().optional(),
//       }),
//   })

export {
  plugin as default,
  // schema
};

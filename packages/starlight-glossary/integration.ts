import { defineIntegration, addVirtualImports } from 'astro-integration-kit';
import { configSchema } from './config';

export default defineIntegration({
  name: 'starlight-glossary-integration',
  optionsSchema: configSchema,
  setup({ name, options }) {
    return {
      hooks: {
        'astro:config:setup': (params) => {
          params.injectRoute({
            entrypoint: '@simonhyll/starlight-glossary/routes/Glossary.astro',
            pattern: '/glossary/[url]',
            prerender: true,
          });
          addVirtualImports(params, {
            name,
            imports: {
              'virtual:starlight-glossary/config': `export default ${JSON.stringify(options)}`,
            },
          });
        },
      },
    };
  },
});

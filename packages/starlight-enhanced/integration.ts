import { defineIntegration, addVirtualImports } from 'astro-integration-kit';
import { configSchema } from './config';

export default defineIntegration({
  name: 'starlight-enhanced-integration',
  optionsSchema: configSchema,
  setup({ name, options }) {
    return {
      hooks: {
        'astro:config:setup': (params) => {
          addVirtualImports(params, {
            name,
            imports: {
              'virtual:@simonhyll/starlight-enhanced/config': `export default ${JSON.stringify(options)}`,
            },
          });
        },
      },
    };
  },
});

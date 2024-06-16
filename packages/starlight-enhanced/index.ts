import type { StarlightPlugin } from '@astrojs/starlight/types';
import { validateConfig, type StarlightEnhancedConfig } from './config';
import integration from './integration';

function plugin(userConfig?: StarlightEnhancedConfig): StarlightPlugin {
  const configSchema = validateConfig(userConfig);
  return {
    name: 'starlight-enhanced',
    hooks: {
      async setup({ addIntegration, config, updateConfig, astroConfig }) {
        addIntegration(integration(configSchema));
        const componentOverrides: typeof config.components = {};
        componentOverrides.ThemeSelect =
          '@simonhyll/starlight-enhanced/components/ThemeSelect.astro';
        componentOverrides.SiteTitle = '@simonhyll/starlight-enhanced/components/SiteTitle.astro';
        componentOverrides.Header = '@simonhyll/starlight-enhanced/components/Header.astro';
        componentOverrides.PageFrame = '@simonhyll/starlight-enhanced/components/PageFrame.astro';
        updateConfig({
          components: {
            ...componentOverrides,
            ...config.components,
          },
        });
      },
    },
  };
}

export { plugin as default };

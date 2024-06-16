import { AstroError } from 'astro/errors';
import { z } from 'astro/zod';

export const configSchema = z.object({}).optional();

export type StarlightEnhancedConfig = z.infer<typeof configSchema>;

export function validateConfig(userConfig: unknown): StarlightEnhancedConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    const errors = config.error.flatten();
    throw new AstroError(
      `Invalid starlight-enhanced configuration:

            ${errors.formErrors.map((formError) => ` - ${formError}`).join('\n')}
            ${Object.entries(errors.fieldErrors)
              .map(([fieldName, fieldErrors]) => `- ${fieldName}: ${JSON.stringify(fieldErrors)}`)
              .join('\n')}
            `
    );
  }

  return config.data;
}

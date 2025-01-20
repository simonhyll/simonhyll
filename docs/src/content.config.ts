import { defineCollection, z } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { docsLoader } from '@astrojs/starlight/loaders';
import { blogSchema } from 'starlight-blog/schema';
import { getFeatures } from '@lib/index';
import { glob } from 'astro/loaders';

getFeatures().map((val: any) => ({ id: val.slug + '.mdx', ...val }));

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: (context) => {
        return blogSchema(context).extend({
          description: z.string().optional(), // TODO: Make non-optional
          references: z.array(z.string()).optional(),
          summary: z.string().optional(),
          topic: z.string().optional(),
          simonShutsUp: z.boolean().optional(),
        });
      },
    }),
  }),
  i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
  features: defineCollection({
    loader: glob({ pattern: '**\/*.mdx', base: './.astro/content/features' }),
    schema: docsSchema(),
  }),
};

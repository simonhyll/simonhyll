import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { docsLoader } from '@astrojs/starlight/loaders';
import { blogSchema } from 'starlight-blog/schema';

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
};

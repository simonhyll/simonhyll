import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { join } from 'node:path';
import { getNewestCommitDate } from '@lib/index.ts';

export async function GET(context: any) {
  const docs = await getCollection('docs');
  return rss({
    title: 'Simon Hyll',
    description: 'Simon says: make something awesome!',
    site: context.site,
    trailingSlash: false,
    stylesheet: '/rss.xsl',
    items: docs
      .map((post) => ({
        title: post.data.title,
        pubDate: getNewestCommitDate(join('src', 'content', 'docs', post.id)),
        description: post.data.description,
        link: `/${post.slug}`,
      }))
      .sort((a: any, b: any) => b.pubDate - a.pubDate),
  });
}

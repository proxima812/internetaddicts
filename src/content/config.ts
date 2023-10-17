import { defineCollection, z } from 'astro:content'

const groupsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    dateTime: z.string().default('20:00'),
    description: z.string().optional(),
    type: z.string().default('Онлайн'),
    link: z.string().default('https://t.me/aiz_itta'),
  }),
})

const postsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().max(80),
      description: z.string(),
      pubDate: z.string(),
      img: image(),
    }),
})

const storyCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
})

export const collections = {
  groups: groupsCollection,
  posts: postsCollection,
  story: storyCollection,
}

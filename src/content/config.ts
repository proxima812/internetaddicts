import { defineCollection, z } from 'astro:content'

const groupCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    dateTime: z.string().default('20:00'),
    description: z.string().optional(),
    type: z.string().default('Онлайн'),
    link: z.string().default('https://t.me/aiz_itta'),
  }),
})

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string().max(80),
    description: z.string(),
    pubDate: z.string(),
    img: z.string().optional(),
  })
})

const notesCollection = defineCollection({
   schema: z.object({
    title: z.string().max(80),
    description: z.string(),
    img: z.string(),
  })
})

const storyCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
  })
})

export const collections = {
  groups: groupCollection,
  notes: notesCollection,
  posts: postsCollection,
  story: storyCollection,
}

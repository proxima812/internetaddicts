import { defineCollection, z } from 'astro:content'

const groupsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    when: z.string(),
    dateTime: z.string().default('20:00'),
    body: z.string().optional(),
    type: z.string().default('Онлайн'),
    link: z.string().default('https://t.me/aiz_itta'),
  }),
})

const spikers = defineCollection({
	schema: z.object({
		title: z.string(),
		pubDate: z.string(),
		desc: z.string().optional(),
		idYB: z.string(),
	}),
})

const pagesCollections = defineCollection({
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    ogImage: z.string().optional(),
  })
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
	pages: pagesCollections,
	spikers: spikers,
}

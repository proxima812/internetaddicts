import { defineCollection, z } from "astro:content"

const groups = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			when: z.string(),
			dateTime: z.string().default("20:00"),
			body: z.string().optional(),
			type: z.string().default("Онлайн"),
			link: z.string().default("https://t.me/aiz_itta"),
			groupImg: image().optional(),
		}),
})

const speakers = defineCollection({
	schema: z.object({
		title: z.string(),
		pubDate: z.string(),
		description: z.string().optional(),
		idYB: z.string(),
	}),
})

const pages = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		ogImage: z.string().optional(),
	}),
})

const posts = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string(),
			pubDate: z.union([z.string().datetime(), z.date()]).or(z.string()),
			img: image().optional(),
		}),
})

const story = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
	}),
})

export const collections = {
	groups,
	posts,
	story,
	pages,
	speakers,
}

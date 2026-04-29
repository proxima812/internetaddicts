import { getCollection } from "astro:content"

export const getAllPosts = async content => {
	const posts = (await getCollection(content))
		.filter(({ data }) => (import.meta.env.PROD ? data.draft !== true : true))
		.sort((a, b) => +new Date(b.data.pubDate) - +new Date(a.data.pubDate))
	return posts
}

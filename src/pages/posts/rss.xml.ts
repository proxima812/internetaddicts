import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export async function GET(context) {
	const blog = (await getCollection("posts"))
		.sort((a, b) => b.data.pubDate - a.data.pubDate)
		.slice(0, 6)

	return rss({
		title: "АИЗ",
		description: "АИЗ RSS лента последние 6 постов!",
		site: context.site,
		items: blog.map(post => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/posts/${post.slug}/`,
		})),
		stylesheet: "/rss/styles.xsl",
	})
}

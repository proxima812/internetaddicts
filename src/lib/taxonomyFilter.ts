import { slugify } from "./utils"

const taxonomyFilter = (posts: any[], name: string, key: any) =>
	posts.filter(
		post =>
			Array.isArray(post.data[name]) &&
			post.data[name].map((name: string) => slugify(name)).includes(key),
	)

export default taxonomyFilter

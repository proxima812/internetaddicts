import { getAllPosts } from "./getPosts"

const getTaxonomy = async (collection, name) => {
	const singlePages = await getAllPosts(collection)
	let taxonomies = []

	singlePages.forEach(page => {
		const tagArray = page.data[name]
		if (Array.isArray(tagArray)) {
			tagArray.forEach(tag => {
				taxonomies.push(tag)
			})
		}
	})

	const uniqueTaxonomies = [...new Set(taxonomies)]
	return uniqueTaxonomies
}

export default getTaxonomy

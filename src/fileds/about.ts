import { collection, fields } from "@keystatic/core"

export const about = collection({
	label: "Главная страница",
	slugField: "title",
	path: "src/data/page/*",
	entryLayout: "content",
	columns: ["title"],
	format: {
		contentField: "content",
	},
	schema: {
		title: fields.slug({ name: { label: "НИЧЕГО НЕ ПИСАТЬ" } }),
		description: fields.text({
			label: "НИЧЕГО НЕ ПИСАТЬ",
		}),
		content: fields.mdx({
			label: "Контент",
		}),
	},
})

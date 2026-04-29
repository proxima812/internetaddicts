import { collection, fields } from "@keystatic/core"

export const story = collection({
	label: "Л. истории",
	slugField: "title",
	path: "src/content/story/*",
	format: { contentField: "content" },
	entryLayout: "content",
	columns: ["title", "old"],
	schema: {
		title: fields.slug({ name: { label: "Заголовок" } }),
		description: fields.text({
			label: "Описание",
			description: "от 20 до 150 символов",
			validation: { length: { min: 40, max: 320 } },
		}),
		old: fields.text({ label: "Сколько в АИЗ?", defaultValue: "В АИЗ более 1-2 лет." }),
		content: fields.mdx({
			label: "Контент",
		}),
	},
})

import { collection, fields } from "@keystatic/core"

export const speakers = collection({
	label: "Спикерские",
	slugField: "title",
	path: "src/content/speakers/*",
	format: { contentField: "content" },
	schema: {
		title: fields.slug({ name: { label: "Заголовок" } }),
		desc: fields.text({
			label: "Описание",
			description: "от 20 до 150 символов",
		}),
		idYB: fields.text({
			label: "id видео или полная ссылка на видео с youtube",
		}),
		pubDate: fields.date({
			label: "Время",
			description: "Время публикации",
		}),
		content: fields.document({
			label: "Контент",
			formatting: true,
			dividers: true,
			links: true,
			images: {
				directory: "src/assets/images/stories",
				publicPath: "../../assets/images/stories/",
			},
		}),
	},
})

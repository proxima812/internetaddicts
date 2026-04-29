import { collection, fields } from "@keystatic/core"

export const posts = collection({
	label: "Посты",
	slugField: "title",
	path: "src/content/posts/*",
	entryLayout: "content",
	columns: ["title", "pubDate", "favorite"],
	format: {
		contentField: "content",
	},
	schema: {
		title: fields.slug({ name: { label: "Заголовок" } }),
		description: fields.text({
			label: "Описание",
			description: "от 20 до 150 символов",
			validation: { length: { min: 20, max: 150 } },
		}),
		pubDate: fields.date({
			label: "Время",
			description: "Время публикации",
			defaultValue: {
				kind: "today",
			},
		}),
		tags: fields.multiselect({
			label: "Теги к посту",
			description: "Выберите теги",
			options: [
				{ label: "Информация", value: "Информация" },
				{ label: "Для групп", value: "Для групп" },
				{ label: "Инструменты", value: "Инструменты" },
				{ label: "Идеи", value: "Идеи" },
				{ label: "Руководство", value: "Руководство" },
				{ label: "Тест", value: "Тест" },
				{ label: "12 шагов", value: "12 шагов" },
				{ label: "12 традиций", value: "12 традиций" },
			],
		}),
		author: fields.select({
			label: "Автор",
			description: "Выберите автора публикации",
			options: [
				{ label: "АИЗ", value: "АИЗ" },
				{ label: "SamGold", value: "SamGold" },
				{ label: "Олег", value: "Олег" },
				{ label: "Настя", value: "Настя" },
				{ label: "Сергей", value: "Сергей" },
				{ label: "Антон", value: "Антон" },
				{ label: "Василий", value: "Василий" },
				{ label: "Камиль", value: "Камиль" },
				{ label: "Станислав", value: "Станислав" },
				{ label: "Даниил", value: "Даниил" },
				{ label: "Салима", value: "Салима" },
			],
			defaultValue: "АИЗ",
		}),
		img: fields.image({
			label: "Изображение поста",
			directory: "src/assets/images/posts",
			publicPath: "../../assets/images/posts/",
		}),
		favorite: fields.checkbox({
			label: "Избранный пост",
			description: "Избранный пост в начале",
		}),
		content: fields.mdx({
			label: "Контент",
		}),
	},
})

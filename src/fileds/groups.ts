import { collection, fields } from "@keystatic/core"

export const groups = collection({
	label: "Группы",
	slugField: "title",
	path: "src/content/groups/*",
	entryLayout: "content",
	columns: ["title", "when", "dateTime", "type"],
	format: { contentField: "body" },
	schema: {
		title: fields.slug({ name: { label: "Название группы" } }),
		body: fields.mdx({
			label: "Описание группы",
		}),
		logo: fields.image({
			label: "Логотип",
			directory: "src/assets/images/groups_logos",
			publicPath: "../../assets/images/groups_logos/",
		}),
		when: fields.select({
			label: "Когда проводиться группа?",
			description:
				"Когда? Понедельник, Вторник, Среда, Четверг, Пятница, Суббота или Воскресенье",
			options: [
				{ label: "Понедельник", value: "Понедельник" },
				{ label: "Вторник", value: "Вторник" },
				{ label: "Среда", value: "Среда" },
				{ label: "Четверг", value: "Четверг" },
				{ label: "Пятница", value: "Пятница" },
				{ label: "Суббота", value: "Суббота" },
				{ label: "Воскресенье", value: "Воскресенье" },
			],
			defaultValue: "Понедельник",
		}),
		dateTime: fields.text({
			label: "Время",
			description: "Время проведения собрания по МСК +3",
		}),
		type: fields.select({
			label: "Тип группы",
			description: '"Онлайн" либо "Живая"',
			options: [
				{ label: "Онлайн", value: "Онлайн" },
				{ label: "Живая", value: "Живая" },
			],
			defaultValue: "Онлайн",
		}),
		link: fields.url({
			label: "Ссылка (URL) на нее, либо карта (если живая группа)",
			description: "https://t.me/aiz_meetings",
		}),
	},
})

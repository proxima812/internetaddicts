import { collection, config, fields } from "@keystatic/core"

const isProd = import.meta.env.PROD

export default config({
	storage: isProd
		? {
				kind: "github",
				repo: "itaaSite/internetaddicts",
				branchPrefix: "main/",
			}
		: { kind: "local" },
	ui: {
		brand: { name: "АИЗ" },
		navigation: {
			Content: ["pages", "posts"],
			Группы: ["groups"],
			Истории: ["story", "speakers"],
		},
	},
	collections: {
		posts: collection({
			label: "Посты",
			slugField: "title",
			path: "src/content/posts/*",
			columns: ["title", "pubDate"],
			entryLayout: "content",
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
					defaultValue: {
						kind: "today",
					},
					description: "Время публикации",
				}),
				img: fields.image({
					label: "Фото поста",
					directory: "src/assets/images/posts",
					publicPath: "../../assets/images/posts/",
				}),
				content: fields.mdx({
					label: "Контент",
					options: {
						image: {
							directory: "src/assets/images/posts",
							publicPath: "../../assets/images/posts/",
						},
					},
				}),
			},
		}),
		story: collection({
			label: "Л. истории",
			slugField: "title",
			path: "src/content/story/*",
			format: { contentField: "content" },
			columns: ["title"],
			schema: {
				title: fields.slug({ name: { label: "Заголовок" } }),
				description: fields.text({
					label: "Описание",
					description: "от 20 до 150 символов",
					validation: { length: { min: 40, max: 320 } },
				}),
				content: fields.mdx({
					label: "Контент",
					options: {
						image: {
							directory: "src/assets/images/posts",
							publicPath: "../../assets/images/posts/",
						},
					},
				}),
			},
		}),
		speakers: collection({
			label: "Спикерские",
			slugField: "title",
			path: "src/content/speakers/*",
			columns: ["title", "pubDate"],
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
					defaultValue: {
						kind: "today",
					},
					description: "Время публикации",
				}),
				content: fields.mdx({
					label: "Контент",
					options: {
						image: {
							directory: "src/assets/images/posts",
							publicPath: "../../assets/images/posts/",
						},
					},
				}),
			},
		}),
		groups: collection({
			label: "Группы",
			slugField: "title",
			path: "src/content/groups/*",
			entryLayout: "content",
			columns: ["title", "type", "when", "dateTime"],
			format: { contentField: "body" },
			schema: {
				title: fields.slug({ name: { label: "Название группы" } }),
				body: fields.document({
					label: "Описание группы",
					formatting: true,
					dividers: true,
					links: true,
				}),
				groupImg: fields.image({
					label: "Фото группы",
					directory: "src/assets/images/groups",
					publicPath: "../../assets/images/groups/",
				}),
				when: fields.text({
					label: "Время",
					defaultValue: "Пятница",
					description:
						"Когда? Понедельник, Вторник, Среда, Четверг, Пятница, Суббота или Воскресенье",
				}),
				dateTime: fields.text({
					label: "Время",
					defaultValue: "20:00",
					description: "Время проведения собрания по МСК +3",
				}),
				type: fields.text({
					label: "Тип группы",
					description: '"Онлайн" либо "Живая"',
					defaultValue: "Онлайн",
				}),
				link: fields.url({
					label: "Ссылка (URL) на нее, либо карта (если живая группа)",
				}),
			},
		}),
		pages: collection({
			label: "Страницы",
			slugField: "title",
			path: "src/content/pages/*",
			entryLayout: "content",
			columns: ["title", "description"],
			format: {
				contentField: "content",
			},
			schema: {
				title: fields.slug({ name: { label: "Заголовок страницы" } }),
				description: fields.text({
					label: "Описание страницы",
					description: "до 145 символов",
					validation: { length: { min: 20, max: 150 } },
				}),
				ogImage: fields.image({
					label: "ogImage (изображение страницы 1200x630)",
					directory: "src/assets/images/pages",
					publicPath: "../../assets/images/pages/",
				}),
				content: fields.mdx({
					label: "Контент страницы",
					options: {
						image: {
							directory: "src/assets/images/pages",
							publicPath: "../../assets/images/pages/",
						},
					},
				}),
			},
		}),
	},
})

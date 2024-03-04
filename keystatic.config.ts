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
	collections: {
		posts: collection({
			label: "Посты",
			slugField: "title",
			path: "src/content/posts/*",
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
					description: "Время публикации",
				}),
				img: fields.image({
					label: "Фото поста",
					directory: "src/assets/images/posts",
					publicPath: "../../assets/images/posts/",
				}),
				content: fields.document({
					label: "Контент",
					formatting: true,
					dividers: true,
					links: true,
					images: {
						directory: "src/assets/images/posts",
						publicPath: "../../assets/images/posts/",
					},
				}),
			},
		}),
		story: collection({
			label: "Л. истории",
			slugField: "title",
			path: "src/content/story/*",
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "Заголовок" } }),
				description: fields.text({
					label: "Описание",
					description: "от 20 до 150 символов",
					validation: { length: { min: 40, max: 320 } },
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
		}),
		spikers: collection({
			label: "Спикерские",
			slugField: "title",
			path: "src/content/spikers/*",
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
		}),
		groups: collection({
			label: "Группы",
			slugField: "title",
			path: "src/content/groups/*",
			entryLayout: "content",
			format: { contentField: "body" },
			schema: {
				title: fields.slug({ name: { label: "Название группы" } }),
				body: fields.document({
					label: "Описание группы",
					formatting: true,
					dividers: true,
					links: true,
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
			format: {
				contentField: "content",
			},
			schema: {
				title: fields.slug({ name: { label: "Заголовок страницы" } }),
				desc: fields.text({
					label: "Описание страницы",
					description: "до 145 символов",
					validation: { length: { min: 20, max: 150 } },
				}),
				ogImage: fields.image({
					label: "ogImage (изображение страницы 1200x630)",
					directory: "src/assets/images/pages",
					publicPath: "../../assets/images/pages/",
				}),
				content: fields.document({
					label: "Контент страницы",
					formatting: true,
					dividers: true,
					links: true,
					images: {
						directory: "src/assets/images/pages",
						publicPath: "../../assets/images/pages/",
					},
				}),
			},
		}),
	},
})

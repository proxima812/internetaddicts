import { collection, config, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'itaaSite',
      name: 'internetaddicts',
    },
  },

  collections: {
    posts: collection({
      label: 'Посты',
      slugField: 'title',
      path: 'src/content/posts/*',
      entryLayout: 'content',
      format: {
        contentField: 'content',
      },
      schema: {
        title: fields.slug({ name: { label: 'Заголовок' } }),
        description: fields.text({
          label: 'Описание',
          description: 'от 20 до 150 символов',
          validation: { length: { min: 20, max: 150 } },
        }),
        pubDate: fields.date({
          label: 'Время',
          description: 'Время публикации',
        }),
        img: fields.image({
          label: 'Фото поста',
          directory: 'src/assets/images/posts',
          publicPath: '../../assets/images/posts/',
        }),
        content: fields.document({
          label: 'Контент',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/assets/images/posts',
            publicPath: '../../assets/images/posts/',
          },
        }),
      },
    }),
    story: collection({
      label: 'Л. истории',
      slugField: 'title',
      path: 'src/content/story/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Заголовок' } }),
        description: fields.text({
          label: 'Описание',
          description: 'от 20 до 150 символов',
          validation: { length: { min: 40, max: 320 } },
        }),
        content: fields.document({
          label: 'Контент',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/assets/images/stories',
            publicPath: '../../assets/images/stories/',
          },
        }),
      },
    }),
    groups: collection({
      label: 'Группы',
      slugField: 'title',
      path: 'src/content/groups/*',
      schema: {
        title: fields.slug({ name: { label: 'Название' } }),
        description: fields.text({
          label: 'Описание',
          description: 'от 20 до 420 символов',
          validation: { length: { min: 20, max: 420 } },
        }),
        dateTime: fields.text({
          label: 'Время',
          defaultValue: '20:00',
          description: 'Время публикации',
        }),
        type: fields.text({
          label: 'Тип группы',
          description: 'Онлайн либо Живая',
          defaultValue: 'Онлайн',
        }),
        link: fields.url({
          label: 'Ссылка (URL)',
        }),
      },
    }),
  },
})

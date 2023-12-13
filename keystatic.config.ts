import { collection, config, fields } from '@keystatic/core'

const isProd = import.meta.env.PROD

export default config({
  storage: isProd
    ? {
        kind: 'github',
        repo: {
          owner: 'itaaSite',
          name: 'internetaddicts',
        },
      }
    : { kind: 'local' },
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
      entryLayout: 'content',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Название группы' } }),
        body: fields.document({
          label: 'Описание группы',
          formatting: true,
          dividers: true,
          links: true,
        }),
        when: fields.text({
          label: 'Время',
          defaultValue: 'Пятница',
          description:
            'Когда? Понедельник, Вторник, Среда, Четверг, Пятница, Суббота или Воскресенье',
        }),
        dateTime: fields.text({
          label: 'Время',
          defaultValue: '20:00',
          description: 'Время проведения собрания по МСК +3',
        }),
        type: fields.text({
          label: 'Тип группы',
          description: '"Онлайн" либо "Живая"',
          defaultValue: 'Онлайн',
        }),
        link: fields.url({
          label: 'Ссылка (URL) на нее, либо карта (если живая группа)',
        }),
      },
    }),
  },
})

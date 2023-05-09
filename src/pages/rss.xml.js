import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function get(context) {
  return rss({
    stylesheet: '/rss/styles.xsl',
    title: 'Анонимные Интернет Зависимые - СНГ',
    description: 'Это сообщество людей, которые поддерживают друг друга в преодолении проблем, вызванных одержимым использованием Интернета и технических устройств.',
    site: context.site,
    items: await pagesGlobToRssItems(
      import.meta.glob('./**/*.{md,mdx}'),
    ),
  });
}
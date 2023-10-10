import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config as config$1, collection, fields } from '@keystatic/core';

function makeHandler(_config) {
  var _config$clientId, _config$clientSecret, _config$secret;
  const handler = makeGenericAPIRouteHandler({
    ..._config,
    clientId: (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : tryOrUndefined(() => ({}).KEYSTATIC_GITHUB_CLIENT_ID),
    clientSecret: (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : tryOrUndefined(() => ({}).KEYSTATIC_GITHUB_CLIENT_SECRET),
    secret: (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : tryOrUndefined(() => ({}).KEYSTATIC_SECRET)
  }, {
    slugEnvName: 'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG'
  });
  return async function keystaticAPIRoute(context) {
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    // all this stuff should be able to go away when astro is using a version of undici with getSetCookie
    let headersInADifferentStructure = new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === 'function') {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ('getSetCookie' in headers && typeof headers.getSetCookie === 'function') {
          const setCookieHeaders = headers.getSetCookie();
          if (setCookieHeaders !== null && setCookieHeaders !== void 0 && setCookieHeaders.length) {
            headersInADifferentStructure.set('set-cookie', setCookieHeaders);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get('set-cookie');
    headersInADifferentStructure.delete('set-cookie');
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === 'lax' || sameSite === 'strict' || sameSite === 'none' ? sameSite : undefined
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map(x => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return undefined;
  }
}

const config = config$1({
  storage: {
    kind: "local"
  },
  collections: {
    posts: collection({
      label: "Посты",
      slugField: "title",
      path: "src/content/posts/*",
      entryLayout: "content",
      format: {
        contentField: "content"
      },
      schema: {
        title: fields.slug({ name: { label: "Заголовок" } }),
        description: fields.text({
          label: "Описание",
          description: "от 20 до 150 символов",
          validation: { length: { min: 20, max: 150 } }
        }),
        pubDate: fields.date({
          label: "Время",
          description: "Время публикации"
        }),
        img: fields.image({
          label: "Фото поста",
          directory: "src/assets/images/posts",
          publicPath: "../../assets/images/posts/"
        }),
        content: fields.document({
          label: "Контент",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "src/assets/images/posts",
            publicPath: "../../assets/images/posts/"
          }
        })
      }
    }),
    // notes: collection({
    //   label: 'Заметки',
    //   slugField: 'title',
    //   path: 'src/content/notes/*',
    //   entryLayout: 'content',
    //   format: {
    //       contentField: 'content',
    //     },
    //   schema: {
    //     title: fields.slug({ name: { label: 'Заголовок' } }),
    //     description: fields.text({
    //       label: 'Описание',
    //       description: 'от 20 до 150 символов',
    //       validation: { length: { min: 20, max: 150 } }
    //     }),
    //     pubDate: fields.date({
    //       label: 'Время',
    //       description: 'Время публикации',
    //     }),
    //     content: fields.document({
    //       label: 'Контент',
    //       formatting: true,
    //       dividers: true,
    //       links: true,
    //       images: {
    //         directory: 'src/assets/images/notes',
    //         publicPath: '../../assets/images/notes/',
    //       },
    //     }),
    //   },
    // }),
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
          validation: { length: { min: 40, max: 320 } }
        }),
        content: fields.document({
          label: "Контент",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "src/assets/images/stories",
            publicPath: "../../assets/images/stories/"
          }
        })
      }
    }),
    groups: collection({
      label: "Группы",
      slugField: "title",
      path: "src/content/groups/*",
      schema: {
        title: fields.slug({ name: { label: "Название" } }),
        description: fields.text({
          label: "Описание",
          description: "от 20 до 420 символов",
          validation: { length: { min: 20, max: 420 } }
        }),
        date: fields.text({
          label: "Время",
          defaultValue: "20:00",
          description: "Время публикации"
        }),
        type: fields.text({
          label: "Тип группы",
          description: "Онлайн либо Живая",
          defaultValue: "Онлайн"
        }),
        link: fields.url({
          label: "Ссылка (URL)"
        })
      }
    })
  }
});

const all = makeHandler({ config });

const prerender = false;

export { all, prerender };

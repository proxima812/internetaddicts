import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_f4260fe0.mjs';
import 'react';
import 'react-dom/server';
import './chunks/astro_321cb245.mjs';
import 'clsx';
import 'html-escaper';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/keystatic-api_cd3929ff.mjs');
const _page1  = () => import('./chunks/keystatic-astro-page_db90bd42.mjs');
const _page2  = () => import('./chunks/generic_ce025bc3.mjs');
const _page3  = () => import('./chunks/index_1a898e69.mjs');
const _page4  = () => import('./chunks/_slug__77cbe561.mjs');
const _page5  = () => import('./chunks/stories_55b90ece.mjs');
const _page6  = () => import('./chunks/groups_c4ce3bcf.mjs');
const _page7  = () => import('./chunks/_slug__1f7888a3.mjs');
const _page8  = () => import('./chunks/posts_aec2d8d8.mjs');
const _page9  = () => import('./chunks/404_8cfbeaa9.mjs');const pageMap = new Map([["node_modules/@keystatic/astro/internal/keystatic-api.js", _page0],["node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page1],["node_modules/astro/dist/assets/endpoint/generic.js", _page2],["src/pages/index.astro", _page3],["src/pages/stories/[slug].astro", _page4],["src/pages/stories.astro", _page5],["src/pages/groups.astro", _page6],["src/pages/posts/[slug].astro", _page7],["src/pages/posts.astro", _page8],["src/pages/404.astro", _page9]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };

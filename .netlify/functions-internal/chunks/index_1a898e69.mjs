export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'react';
import 'react-dom/server';
import './astro_321cb245.mjs';
import 'clsx';
import 'html-escaper';

const page = () => import('./prerender_6e6735f4.mjs').then(n => n.i);

export { page };

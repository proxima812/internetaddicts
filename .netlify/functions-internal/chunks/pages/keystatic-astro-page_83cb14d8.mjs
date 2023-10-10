import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent } from '../astro_321cb245.mjs';
import 'clsx';
import 'html-escaper';

const $$Astro = createAstro();
const prerender = false;
const $$KeystaticAstroPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$KeystaticAstroPage;
  return renderTemplate`${renderComponent($$result, "Keystatic", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/samgold/Desktop/\u041F\u0440\u043E\u0435\u043A\u0442\u044B/itaa/node_modules/@keystatic/astro/internal/keystatic-page", "client:component-export": "Keystatic" })}`;
}, "/Users/samgold/Desktop/\u041F\u0440\u043E\u0435\u043A\u0442\u044B/itaa/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", void 0);

const $$file = "/Users/samgold/Desktop/Проекты/itaa/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro";
const $$url = undefined;

export { $$KeystaticAstroPage as default, $$file as file, prerender, $$url as url };

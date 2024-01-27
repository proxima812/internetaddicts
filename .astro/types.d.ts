declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"groups": {
"net-nazvaniya-1.mdoc": {
	id: "net-nazvaniya-1.mdoc";
  slug: "net-nazvaniya-1";
  body: string;
  collection: "groups";
  data: InferEntrySchema<"groups">
} & { render(): Render[".mdoc"] };
"net-nazvaniya-2.mdoc": {
	id: "net-nazvaniya-2.mdoc";
  slug: "net-nazvaniya-2";
  body: string;
  collection: "groups";
  data: InferEntrySchema<"groups">
} & { render(): Render[".mdoc"] };
"net-nazvaniya-3.mdoc": {
	id: "net-nazvaniya-3.mdoc";
  slug: "net-nazvaniya-3";
  body: string;
  collection: "groups";
  data: InferEntrySchema<"groups">
} & { render(): Render[".mdoc"] };
"net-nazvaniya-4.mdoc": {
	id: "net-nazvaniya-4.mdoc";
  slug: "net-nazvaniya-4";
  body: string;
  collection: "groups";
  data: InferEntrySchema<"groups">
} & { render(): Render[".mdoc"] };
"net-nazvaniya-5.mdoc": {
	id: "net-nazvaniya-5.mdoc";
  slug: "net-nazvaniya-5";
  body: string;
  collection: "groups";
  data: InferEntrySchema<"groups">
} & { render(): Render[".mdoc"] };
"net-nazvaniya.mdoc": {
	id: "net-nazvaniya.mdoc";
  slug: "net-nazvaniya";
  body: string;
  collection: "groups";
  data: InferEntrySchema<"groups">
} & { render(): Render[".mdoc"] };
"svoboda-dlya-vseh.mdoc": {
	id: "svoboda-dlya-vseh.mdoc";
  slug: "svoboda-dlya-vseh";
  body: string;
  collection: "groups";
  data: InferEntrySchema<"groups">
} & { render(): Render[".mdoc"] };
"utro-aiz.mdoc": {
	id: "utro-aiz.mdoc";
  slug: "utro-aiz";
  body: string;
  collection: "groups";
  data: InferEntrySchema<"groups">
} & { render(): Render[".mdoc"] };
"zhivoj-internet.mdoc": {
	id: "zhivoj-internet.mdoc";
  slug: "zhivoj-internet";
  body: string;
  collection: "groups";
  data: InferEntrySchema<"groups">
} & { render(): Render[".mdoc"] };
};
"pages": {
"testovaya-stranicza.mdoc": {
	id: "testovaya-stranicza.mdoc";
  slug: "testovaya-stranicza";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
};
"posts": {
"12-shagov-chast-zhizni.mdoc": {
	id: "12-shagov-chast-zhizni.mdoc";
  slug: "12-shagov-chast-zhizni";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"12step-netlify-app.mdoc": {
	id: "12step-netlify-app.mdoc";
  slug: "12step-netlify-app";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"12steps-group-aiz.mdoc": {
	id: "12steps-group-aiz.mdoc";
  slug: "12steps-group-aiz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"chto-delat-esli-vash-drug-ili-chlen-semi-internet-zavisimyj.mdoc": {
	id: "chto-delat-esli-vash-drug-ili-chlen-semi-internet-zavisimyj.mdoc";
  slug: "chto-delat-esli-vash-drug-ili-chlen-semi-internet-zavisimyj";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"instrumenty-dlya-polnoczennoj-zhizni.mdoc": {
	id: "instrumenty-dlya-polnoczennoj-zhizni.mdoc";
  slug: "instrumenty-dlya-polnoczennoj-zhizni";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"internet-zavisimost-i-12-shagov.mdoc": {
	id: "internet-zavisimost-i-12-shagov.mdoc";
  slug: "internet-zavisimost-i-12-shagov";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"kak-otklyuchit-you-tube-shorts.mdoc": {
	id: "kak-otklyuchit-you-tube-shorts.mdoc";
  slug: "kak-otklyuchit-you-tube-shorts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"kak-perestat-zalipat-v-internete.mdoc": {
	id: "kak-perestat-zalipat-v-internete.mdoc";
  slug: "kak-perestat-zalipat-v-internete";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"kak-preodolet-internet-zavisimost-s-pomoshhyu-duhovnyh-princzipov.mdoc": {
	id: "kak-preodolet-internet-zavisimost-s-pomoshhyu-duhovnyh-princzipov.mdoc";
  slug: "kak-preodolet-internet-zavisimost-s-pomoshhyu-duhovnyh-princzipov";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"kak-sozdat-gruppu-aiz.mdoc": {
	id: "kak-sozdat-gruppu-aiz.mdoc";
  slug: "kak-sozdat-gruppu-aiz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"kto-takie-aiz.mdoc": {
	id: "kto-takie-aiz.mdoc";
  slug: "kto-takie-aiz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"kto-takoj-sponsor-nastavnik-v-anonimnyh-internet-zavisimyh.mdoc": {
	id: "kto-takoj-sponsor-nastavnik-v-anonimnyh-internet-zavisimyh.mdoc";
  slug: "kto-takoj-sponsor-nastavnik-v-anonimnyh-internet-zavisimyh";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"odin-iz-metodov-prohozhdeniya-shagov-aiz.mdoc": {
	id: "odin-iz-metodov-prohozhdeniya-shagov-aiz.mdoc";
  slug: "odin-iz-metodov-prohozhdeniya-shagov-aiz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"online-cowork.mdoc": {
	id: "online-cowork.mdoc";
  slug: "online-cowork";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"ponyatie-trezvosti-ili-chistoty-v-aiz-est-li-eti-ponyatiya-zdes.mdoc": {
	id: "ponyatie-trezvosti-ili-chistoty-v-aiz-est-li-eti-ponyatiya-zdes.mdoc";
  slug: "ponyatie-trezvosti-ili-chistoty-v-aiz-est-li-eti-ponyatiya-zdes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"princzipy-12-shagov-v-nashih-delah.mdoc": {
	id: "princzipy-12-shagov-v-nashih-delah.mdoc";
  slug: "princzipy-12-shagov-v-nashih-delah";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"proekt-dlya-12-shagov.mdoc": {
	id: "proekt-dlya-12-shagov.mdoc";
  slug: "proekt-dlya-12-shagov";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"sluzhenie-eto-vyrazhenie-nashej-blagodarnosti-sodruzhestvu.mdoc": {
	id: "sluzhenie-eto-vyrazhenie-nashej-blagodarnosti-sodruzhestvu.mdoc";
  slug: "sluzhenie-eto-vyrazhenie-nashej-blagodarnosti-sodruzhestvu";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"vse-chto-est-v-aiz.mdoc": {
	id: "vse-chto-est-v-aiz.mdoc";
  slug: "vse-chto-est-v-aiz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
};
"spikers": {
"aiz-anonimnye-internet-zavisimye-demyan-spikerskaya.mdoc": {
	id: "aiz-anonimnye-internet-zavisimye-demyan-spikerskaya.mdoc";
  slug: "aiz-anonimnye-internet-zavisimye-demyan-spikerskaya";
  body: string;
  collection: "spikers";
  data: InferEntrySchema<"spikers">
} & { render(): Render[".mdoc"] };
"aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-5-tradicziya-i-prodvizheniya.mdoc": {
	id: "aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-5-tradicziya-i-prodvizheniya.mdoc";
  slug: "aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-5-tradicziya-i-prodvizheniya";
  body: string;
  collection: "spikers";
  data: InferEntrySchema<"spikers">
} & { render(): Render[".mdoc"] };
"aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-pro-nezavisimost-grupp-4-tradicziya.mdoc": {
	id: "aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-pro-nezavisimost-grupp-4-tradicziya.mdoc";
  slug: "aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-pro-nezavisimost-grupp-4-tradicziya";
  body: string;
  collection: "spikers";
  data: InferEntrySchema<"spikers">
} & { render(): Render[".mdoc"] };
"aiz-anonimnye-internet-zavisimye-sergej-spikerskaya-opyt-programmy.mdoc": {
	id: "aiz-anonimnye-internet-zavisimye-sergej-spikerskaya-opyt-programmy.mdoc";
  slug: "aiz-anonimnye-internet-zavisimye-sergej-spikerskaya-opyt-programmy";
  body: string;
  collection: "spikers";
  data: InferEntrySchema<"spikers">
} & { render(): Render[".mdoc"] };
"aiz-itaa-spikerskaya-evgenij-n-g-cheboksary-tema-kak-ya-izbavilsya-ot-internet.mdoc": {
	id: "aiz-itaa-spikerskaya-evgenij-n-g-cheboksary-tema-kak-ya-izbavilsya-ot-internet.mdoc";
  slug: "aiz-itaa-spikerskaya-evgenij-n-g-cheboksary-tema-kak-ya-izbavilsya-ot-internet";
  body: string;
  collection: "spikers";
  data: InferEntrySchema<"spikers">
} & { render(): Render[".mdoc"] };
"evelina-r-spikerskaya-tema-sluzhenie-neotemlemaya-chast-vyzdorovleniya.mdoc": {
	id: "evelina-r-spikerskaya-tema-sluzhenie-neotemlemaya-chast-vyzdorovleniya.mdoc";
  slug: "evelina-r-spikerskaya-tema-sluzhenie-neotemlemaya-chast-vyzdorovleniya";
  body: string;
  collection: "spikers";
  data: InferEntrySchema<"spikers">
} & { render(): Render[".mdoc"] };
};
"story": {
"daniil.mdoc": {
	id: "daniil.mdoc";
  slug: "daniil";
  body: string;
  collection: "story";
  data: InferEntrySchema<"story">
} & { render(): Render[".mdoc"] };
"demyan.mdoc": {
	id: "demyan.mdoc";
  slug: "demyan";
  body: string;
  collection: "story";
  data: InferEntrySchema<"story">
} & { render(): Render[".mdoc"] };
"kamil.mdoc": {
	id: "kamil.mdoc";
  slug: "kamil";
  body: string;
  collection: "story";
  data: InferEntrySchema<"story">
} & { render(): Render[".mdoc"] };
"vasilij.mdoc": {
	id: "vasilij.mdoc";
  slug: "vasilij";
  body: string;
  collection: "story";
  data: InferEntrySchema<"story">
} & { render(): Render[".mdoc"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}

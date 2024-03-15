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
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

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
"12x12.mdoc": {
	id: "12x12.mdoc";
  slug: "12x12";
  body: string;
  collection: "groups";
  data: InferEntrySchema<"groups">
} & { render(): Render[".mdoc"] };
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
"test.mdx": {
	id: "test.mdx";
  slug: "test";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
};
"posts": {
"new-group.mdx": {
	id: "new-group.mdx";
  slug: "new-group";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"shorts-delete.mdx": {
	id: "shorts-delete.mdx";
  slug: "shorts-delete";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"sponsor.mdx": {
	id: "sponsor.mdx";
  slug: "sponsor";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
};
"speakers": {
"12-tradiczij-dlya-iz-po-illyustracziyam-primerami-i-opytom.mdoc": {
	id: "12-tradiczij-dlya-iz-po-illyustracziyam-primerami-i-opytom.mdoc";
  slug: "12-tradiczij-dlya-iz-po-illyustracziyam-primerami-i-opytom";
  body: string;
  collection: "speakers";
  data: InferEntrySchema<"speakers">
} & { render(): Render[".mdoc"] };
"aiz-anonimnye-internet-zavisimye-demyan-spikerskaya.mdoc": {
	id: "aiz-anonimnye-internet-zavisimye-demyan-spikerskaya.mdoc";
  slug: "aiz-anonimnye-internet-zavisimye-demyan-spikerskaya";
  body: string;
  collection: "speakers";
  data: InferEntrySchema<"speakers">
} & { render(): Render[".mdoc"] };
"aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-5-tradicziya-i-prodvizheniya.mdoc": {
	id: "aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-5-tradicziya-i-prodvizheniya.mdoc";
  slug: "aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-5-tradicziya-i-prodvizheniya";
  body: string;
  collection: "speakers";
  data: InferEntrySchema<"speakers">
} & { render(): Render[".mdoc"] };
"aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-pro-nezavisimost-grupp-4-tradicziya.mdoc": {
	id: "aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-pro-nezavisimost-grupp-4-tradicziya.mdoc";
  slug: "aiz-anonimnye-internet-zavisimye-kamil-spikerskaya-pro-nezavisimost-grupp-4-tradicziya";
  body: string;
  collection: "speakers";
  data: InferEntrySchema<"speakers">
} & { render(): Render[".mdoc"] };
"aiz-anonimnye-internet-zavisimye-sergej-spikerskaya-opyt-programmy.mdoc": {
	id: "aiz-anonimnye-internet-zavisimye-sergej-spikerskaya-opyt-programmy.mdoc";
  slug: "aiz-anonimnye-internet-zavisimye-sergej-spikerskaya-opyt-programmy";
  body: string;
  collection: "speakers";
  data: InferEntrySchema<"speakers">
} & { render(): Render[".mdoc"] };
"aiz-itaa-spikerskaya-evgenij-n-g-cheboksary-tema-kak-ya-izbavilsya-ot-internet.mdoc": {
	id: "aiz-itaa-spikerskaya-evgenij-n-g-cheboksary-tema-kak-ya-izbavilsya-ot-internet.mdoc";
  slug: "aiz-itaa-spikerskaya-evgenij-n-g-cheboksary-tema-kak-ya-izbavilsya-ot-internet";
  body: string;
  collection: "speakers";
  data: InferEntrySchema<"speakers">
} & { render(): Render[".mdoc"] };
"evelina-r-spikerskaya-tema-sluzhenie-neotemlemaya-chast-vyzdorovleniya.mdoc": {
	id: "evelina-r-spikerskaya-tema-sluzhenie-neotemlemaya-chast-vyzdorovleniya.mdoc";
  slug: "evelina-r-spikerskaya-tema-sluzhenie-neotemlemaya-chast-vyzdorovleniya";
  body: string;
  collection: "speakers";
  data: InferEntrySchema<"speakers">
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

	export type ContentConfig = typeof import("../src/content/config.js");
}

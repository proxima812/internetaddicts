export function slugify(input) {
	if (!input) return ""

	const ruToEn = {
		а: "a",
		б: "b",
		в: "v",
		г: "g",
		д: "d",
		е: "e",
		ё: "yo",
		ж: "zh",
		з: "z",
		и: "i",
		й: "y",
		к: "k",
		л: "l",
		м: "m",
		н: "n",
		о: "o",
		п: "p",
		р: "r",
		с: "s",
		т: "t",
		у: "u",
		ф: "f",
		х: "kh",
		ц: "ts",
		ч: "ch",
		ш: "sh",
		щ: "shch",
		ы: "y",
		э: "e",
		ю: "yu",
		я: "ya",
		ъ: "",
		ь: "",
	}

	let slug = input
		.toLowerCase()
		.trim()
		.replace(/[а-яё]/gi, match => ruToEn[match] || match)

	slug = slug.normalize("NFD").replace(/\p{M}/gu, "")

	slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim()

	slug = slug.replace(/[\s-]+/g, "-").replace(/^-+|-+$/g, "")

	return slug
}

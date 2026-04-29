export const AUTHOR_IDS = [
	"АИЗ",
	"SamGold",
	"Олег",
	"Настя",
	"Сергей",
	"Антон",
	"Василий",
	"Камиль",
	"Станислав",
	"Даниил",
	"Салима",
] as const

export type AuthorId = (typeof AUTHOR_IDS)[number]

type AuthorMeta = {
	name: AuthorId
	initials: string
	gradient: string
}

const TELEGRAM_GRADIENTS = [
	"linear-gradient(135deg, #6bc6ff 0%, #326cff 100%)",
	"linear-gradient(135deg, #58d6c8 0%, #0f9ca8 100%)",
	"linear-gradient(135deg, #8ec5fc 0%, #4f7cff 100%)",
	"linear-gradient(135deg, #ff9a9e 0%, #f77062 100%)",
	"linear-gradient(135deg, #a18cd1 0%, #6b73ff 100%)",
	"linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
	"linear-gradient(135deg, #84fab0 0%, #3bb2b8 100%)",
	"linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
] as const

const getInitials = (name: string) => {
	const parts = name
		.trim()
		.split(/\s+/)
		.filter(Boolean)
	if (parts.length === 0) return "?"
	const first = parts[0][0] ?? ""
	const second = parts.length > 1 ? parts[1][0] ?? "" : ""
	return `${first}${second}`.toUpperCase()
}

const hashName = (name: string) => {
	let hash = 0
	for (let i = 0; i < name.length; i++) {
		hash = (hash << 5) - hash + name.charCodeAt(i)
		hash |= 0
	}
	return Math.abs(hash)
}

const createAuthorMeta = (name: AuthorId): AuthorMeta => ({
	name,
	initials: getInitials(name),
	gradient: TELEGRAM_GRADIENTS[hashName(name) % TELEGRAM_GRADIENTS.length],
})

const AUTHORS: Record<AuthorId, AuthorMeta> = Object.fromEntries(
	AUTHOR_IDS.map(name => [name, createAuthorMeta(name)]),
) as Record<AuthorId, AuthorMeta>

export const getAuthorMeta = (author?: string): AuthorMeta => {
	if (author && author in AUTHORS) return AUTHORS[author as AuthorId]
	return AUTHORS["АИЗ"]
}

export const BOOKMARKS_STORAGE_KEY = "aiz:post-bookmarks"
export const BOOKMARKS_EVENT_NAME = "aiz:bookmarks-changed"

export type BookmarkItem = {
	slug: string
	title: string
	path: string
	updatedAt: number
}

const isBrowser = () => typeof window !== "undefined"

export const readBookmarks = (): BookmarkItem[] => {
	if (!isBrowser()) return []

	try {
		const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
		if (!raw) return []
		const parsed = JSON.parse(raw)
		if (!Array.isArray(parsed)) return []
		return parsed.filter(item => item && typeof item.slug === "string")
	} catch {
		return []
	}
}

const writeBookmarks = (items: BookmarkItem[]) => {
	if (!isBrowser()) return
	localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(items))
	window.dispatchEvent(
		new CustomEvent(BOOKMARKS_EVENT_NAME, { detail: { count: items.length } }),
	)
}

export const isBookmarked = (slug: string) =>
	readBookmarks().some(item => item.slug === slug)

export const toggleBookmark = (payload: Omit<BookmarkItem, "updatedAt">) => {
	const current = readBookmarks()
	const exists = current.some(item => item.slug === payload.slug)
	if (exists) {
		const next = current.filter(item => item.slug !== payload.slug)
		writeBookmarks(next)
		return { active: false, count: next.length }
	}
	const next: BookmarkItem[] = [
		{ ...payload, updatedAt: Date.now() },
		...current.filter(item => item.slug !== payload.slug),
	]
	writeBookmarks(next)
	return { active: true, count: next.length }
}

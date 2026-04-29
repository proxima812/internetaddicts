import { createSignal, onCleanup, onMount } from "solid-js"
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks"

type BookmarkButtonProps = {
	slug: string
	title?: string
	path?: string
	size?: "sm" | "md"
}

export default function BookmarkButton(props: BookmarkButtonProps) {
	const [active, setActive] = createSignal(false)

	const sync = () => {
		setActive(isBookmarked(props.slug))
	}

	const onToggle = (event: MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()
		const result = toggleBookmark({
			slug: props.slug,
			title: props.title || props.slug,
			path: props.path || `/posts/${props.slug}`,
		})
		setActive(result.active)
	}

	onMount(() => {
		sync()
		window.addEventListener("storage", sync)
		window.addEventListener("aiz:bookmarks-changed", sync)
		onCleanup(() => {
			window.removeEventListener("storage", sync)
			window.removeEventListener("aiz:bookmarks-changed", sync)
		})
	})

	return (
		<button
			type="button"
			onClick={onToggle}
			aria-pressed={active()}
			aria-label={active() ? "Убрать из закладок" : "Добавить в закладки"}
			class={`${props.size === "md" ? "h-10 px-3 text-sm" : "h-8 px-2.5 text-xs"} inline-flex items-center gap-2 rounded-lg ring-1 font-medium transition ${
				active()
					? "bg-zinc-900 text-white ring-zinc-900"
					: "bg-white/90 text-zinc-700 ring-zinc-300 hover:bg-zinc-100"
			}`}
		>
			<svg
				viewBox="0 0 24 24"
				aria-hidden="true"
				class={`h-4 w-4 ${active() ? "text-white" : "text-zinc-700"}`}
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M12 5v14" />
				<path d="M5 12h14" />
			</svg>
			<span>{active() ? "В закладках" : "В закладки"}</span>
		</button>
	)
}

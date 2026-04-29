import { createSignal, onCleanup, onMount } from "solid-js"
import { readBookmarks } from "@/lib/bookmarks"

type BookmarksCounterProps = {
	mobile?: boolean
}

export default function BookmarksCounter(props: BookmarksCounterProps) {
	const [count, setCount] = createSignal(0)

	const sync = () => {
		setCount(readBookmarks().length)
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
		<a
			href="/bookmarks"
			class={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
				props.mobile
					? "w-full justify-between bg-stone-50 text-stone-800 ring-1 ring-stone-200 hover:bg-stone-100"
					: "bg-stone-50 text-stone-800 ring-1 ring-stone-300 hover:bg-stone-100"
			}`}
			aria-label="Закладки"
		>
			<span>Закладки</span>
			<span class="rounded-full bg-stone-700 px-2 py-0.5 text-xs text-white">{count()}</span>
		</a>
	)
}

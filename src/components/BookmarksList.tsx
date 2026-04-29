import { createSignal, For, onCleanup, onMount, Show } from "solid-js"
import { readBookmarks, toggleBookmark, type BookmarkItem } from "@/lib/bookmarks"

export default function BookmarksList() {
	const [items, setItems] = createSignal<BookmarkItem[]>([])

	const sync = () => {
		setItems(readBookmarks().sort((a, b) => b.updatedAt - a.updatedAt))
	}

	const removeBookmark = (item: BookmarkItem) => {
		toggleBookmark({
			slug: item.slug,
			title: item.title,
			path: item.path,
		})
		sync()
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
		<Show
			when={items().length > 0}
			fallback={
				<div class="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center">
					<h2 class="text-2xl font-bold text-zinc-800">Закладок пока нет</h2>
					<p class="mt-2 text-zinc-600">Откройте статьи и добавьте нужные в закладки.</p>
					<a
						href="/posts"
						class="mt-5 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
					>
						Перейти к статьям
					</a>
				</div>
			}
		>
			<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
				<For each={items()}>
					{item => (
						<article class="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
							<a href={item.path} class="block">
								<h3 class="text-xl font-bold text-zinc-900 hover:text-stone-700">{item.title}</h3>
							</a>
							<p class="mt-2 text-sm text-zinc-500">{item.path}</p>
							<div class="mt-4 flex items-center justify-between gap-2">
								<a
									href={item.path}
									class="inline-flex rounded-lg bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-800"
								>
									Открыть
								</a>
								<button
									type="button"
									onClick={() => removeBookmark(item)}
									class="inline-flex rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200"
								>
									Убрать
								</button>
							</div>
						</article>
					)}
				</For>
			</div>
		</Show>
	)
}

const CACHE_NAME = "aiz-v1"
const STATIC_ASSETS = ["/", "/manifest.webmanifest"]

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting()),
	)
})

self.addEventListener("activate", event => {
	event.waitUntil(
		caches
			.keys()
			.then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
			.then(() => self.clients.claim()),
	)
})

self.addEventListener("fetch", event => {
	if (event.request.method !== "GET") return
	const url = new URL(event.request.url)
	if (url.origin !== self.location.origin) return

	if (event.request.mode === "navigate") {
		event.respondWith(
			fetch(event.request)
				.then(response => {
					const copy = response.clone()
					caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))
					return response
				})
				.catch(() => caches.match(event.request).then(hit => hit || caches.match("/"))),
		)
		return
	}

	const isStaticAsset =
		url.pathname.startsWith("/_astro/") ||
		url.pathname.startsWith("/favicons/") ||
		url.pathname.startsWith("/image/") ||
		url.pathname.endsWith(".css") ||
		url.pathname.endsWith(".js") ||
		url.pathname.endsWith(".avif") ||
		url.pathname.endsWith(".webp") ||
		url.pathname.endsWith(".png") ||
		url.pathname.endsWith(".jpg") ||
		url.pathname.endsWith(".svg")

	if (!isStaticAsset) return

	event.respondWith(
		caches.match(event.request).then(cached => {
			const network = fetch(event.request)
				.then(response => {
					const copy = response.clone()
					caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))
					return response
				})
				.catch(() => cached)
			return cached || network
		}),
	)
})

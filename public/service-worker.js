const urlsToCache = ["/", "/equal.png", "/index.html", "/manifest.json", "/service-worker.js", "/skura.ico", "/skura.png", "/static/css/main.a1bd5797.css", "/static/js/main.e00d87a7.js"]
self.addEventListener("install", (event) => {
  event.waitUntil(
      caches.open('japan-v1').then(cache => cache.addAll(urlsToCache))
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request to make a network request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
        .then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response to cache it
          const responseToCache = response.clone();

          caches.open('japan-v1')
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
  );
});
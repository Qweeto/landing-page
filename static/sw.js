const cacheList = [
  'index.html',
];

const CACHE_NAME = 'v1';
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(cacheList);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

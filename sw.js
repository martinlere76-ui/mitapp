const CACHE_NAME = 'hello-world-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './main.js',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&display=swap'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

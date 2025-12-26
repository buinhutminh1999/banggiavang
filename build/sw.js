// Service Worker - Auto Reload on Update
// Change this version number when deploying new code
const VERSION = 'v1766743003904';

self.addEventListener('install', event => {
    console.log(`[SW] Installing version ${VERSION}`);
    self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', event => {
    console.log(`[SW] Activating version ${VERSION}`);
    event.waitUntil(
        Promise.all([
            // Clear old caches
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => caches.delete(cache))
                );
            }),
            // Take control of all clients immediately
            self.clients.claim().then(() => {
                // Notify all clients to reload
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.postMessage({ type: 'NEW_VERSION', version: VERSION });
                    });
                });
            })
        ])
    );
});

self.addEventListener('fetch', event => {
    // Always fetch from network (no caching)
    event.respondWith(fetch(event.request));
});


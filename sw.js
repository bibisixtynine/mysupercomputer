/*
 * ServiceWorker to make site function as a PWA (Progressive Web App)
 *
 * Based on https://glitch.com/~pwa by https://glitch.com/@PaulKinlan
 */

// Specify what we want added to the cache for offline use
self.addEventListener("install", e => {
  e.waitUntil(
    // Give the cache a name
    caches.open("mysupercomputer-pwa").then(cache => {
      // Cache the homepage and stylesheets - add any assets you want to cache!
      return cache.addAll([
        "/",
        "/index.js",
        "/styles.css",
        "/jsui.js",
        "/zutils.js",
        "https://cdn.glitch.global/3d4c6936-ea72-4e35-8159-be211884b2e2/mysupercomputer_splash.png?v=1649689543527"
      ]);
    })
  );
});

// Network falling back to cache approach
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
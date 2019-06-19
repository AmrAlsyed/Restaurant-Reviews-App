var staticCacheName = 'restaurant-cahce-1';

// the files we need to cache for our survice worker.
let urlToCache = [
    '/',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',

];


self.addEventListener('install', function (event) {

    // when our survice worker is in the install stage we open the cache folder and add all the files we need to cache.
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            console.log(cache);
            return cache.addAll(urlToCache);

        }).catch(erroe => {
            console.log(erroe);
        })
    );
});
// when in activate stage we get all the cache names, get the latest restaurant name and delete the old caches if there are any and create new ones.
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
//fetching the data, matching it with the cache name and then returning it to the page.
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
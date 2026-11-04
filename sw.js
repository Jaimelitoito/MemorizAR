const CACHE_NAME = 'memorizar-cache-v1';

// Lista de archivos que se guardarán en la memoria local del teléfono
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './targets.mind',
  './guanaco.glb',
  './nirre.glb',
  './zapatito.glb',
  './lupino.glb',
  './canelo.glb',
  './chilco.glb',
  './calafate.glb',
  './armadillo.glb',
  './lobo_marino.glb',
  './carpintero.glb',
  './chingue.glb',
  './zorro.glb',
  './condor.glb',
  './ballena.glb',
  './puma.glb',
  './pinguino.glb',
  'https://aframe.io/releases/1.4.2/aframe.min.js',
  'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js'
];

// Instalación: descarga y almacena todo en caché local
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activación: limpia versiones viejas de caché si actualizas la versión
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia Cache-First: si el archivo ya está en el teléfono, no lo descarga de internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
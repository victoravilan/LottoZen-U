const CACHE_NAME = 'lottozen-ultra-v4-clean';

self.addEventListener('install', (event) => {
  // Borrar TODA la caché anterior incondicionalmente
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          // Borrar todas las cachés, incluyendo la nueva (forzar descarga fresca)
          return caches.delete(key);
        })
      );
    }).then(() => {
      self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => {
      // Forzar_claim: toma control inmediatamente
      return self.clients.claim();
    })
  );
});

// Network-only strategy: NUNCA usar caché
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Siempre ir a la red, nunca cachear nada
  event.respondWith(
    fetch(event.request, { 
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    }).catch(() => {
      // Solo si la red falla, intentar caché como ultimo recurso
      return caches.match(event.request);
    })
  );
});

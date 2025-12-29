const CACHE_NAME = 'carteira-cache-v1';
// Lista exata dos arquivos que queremos salvar offline
const urlsToCache = [
  './',
  './index.html',
  './carteira.png',
  './manifest.json'
  // Adicione './icon.png' aqui se você criou o ícone
];

// Quando o app é aberto pela primeira vez, ele "instala" os arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Abrindo cache e salvando a imagem...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Quando você abre o app, ele tenta buscar do cache (offline) primeiro
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se achou no cache (offline), retorna ele. Se não, tenta a rede.
        return response || fetch(event.request);
      })
  );
});
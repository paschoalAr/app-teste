const CACHE_NAME = 'srb-v6';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './carteira.png', // Carteira
  './banner.jpg',     // Novo Banner
  './logo.png',       // Ícone
  './perfil.jpg',     // Foto perfil
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
// Service Worker بسيط جدًا خاص بالمنصة نفسها (منفصل عن Service Worker بتاع OneSignal)
// هدفه الوحيد: تثبيت شرط "قابلية التثبيت" (installability) اللي بتطلبه المتصفحات
// (خصوصًا Chrome على أندرويد) عشان تنشئ WebAPK حقيقي وتضمن إن التطبيق يفتح صحيح
// بعد التثبيت، مش يرجع المستخدم للشاشة الرئيسية.

const CACHE_NAME = 'gess-edu-shell-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// أهم جزء: لازم يكون فيه fetch handler حقيقي (حتى لو بسيط) عشان المتصفح
// يعتبر الموقع "قابل للتثبيت" بشكل كامل ومضمون.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

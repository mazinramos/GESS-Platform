// Service Worker - GESS EDU
// نسخة الكاش: زوّد الرقم ده لما تعمل تحديث كبير عشان يجبر المتصفح يحدّث الكاش
const CACHE_VERSION = 'gess-edu-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// تثبيت الـ Service Worker وتخزين الملفات الأساسية في الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch(() => {
        // لو أي ملف فشل تحميله وقت التثبيت، ما نوقفش عملية التثبيت كلها
        return Promise.resolve();
      });
    }).then(() => self.skipWaiting())
  );
});

// تفعيل الـ Service Worker وحذف أي نسخ كاش قديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// استراتيجية "الشبكة أولًا، وبعدين الكاش" لضمان إن المستخدم دايمًا ياخد أحدث نسخة لو النت متاح
self.addEventListener('fetch', (event) => {
  // نتعامل بس مع طلبات GET، وبنتجاهل أي طلب لسيرفرات أو APIs خارجية (زي Firebase/Auth)
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // خزّن نسخة من الاستجابة الناجحة في الكاش عشان تشتغل أوفلاين لاحقًا
        const responseClone = response.clone();
        caches.open(CACHE_VERSION).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // لو مفيش نت، ارجع لنسخة الكاش لو موجودة
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          // لو الطلب كان لصفحة (navigation) ومفيش كاش، رجّع الصفحة الرئيسية كـ fallback
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

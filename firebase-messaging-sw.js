importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// إعدادات الفايربيز الحقيقية لمنصة GESS PLATFORM
const firebaseConfig = {
  apiKey: "AIzaSyCtQtSikYfWEPtKjwxVIJim8fHzeW5ACtY",
  authDomain: "gess-platform.firebaseapp.com",
  projectId: "gess-platform",
  storageBucket: "gess-platform.firebasestorage.app",
  messagingSenderId: "794482265366",
  appId: "1:794482265366:web:0108b0cae375d8efd3d437",
  measurementId: "G-JGMGBK6CVW"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// استقبال الإشعار والمنصة مقفولة تماماً في الموبايل
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo.png', // أيقونة المنصة الشيك في الشاشة
        badge: '/logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

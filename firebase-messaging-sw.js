importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCtQtSikYfWEPtKjwxVIJim8fHzeW5ACtY",
    authDomain: "gess-platform.firebaseapp.com",
    projectId: "gess-platform",
    storageBucket: "gess-platform.firebasestorage.app",
    messagingSenderId: "794482265366",
    appId: "1:794482265366:web:0108b0cae375d8efd3d437"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {

    return self.registration.showNotification(
        payload.notification.title,
        {
            body: payload.notification.body,
            icon: "/logo.png",
            badge: "/logo.png"
        }
    );

});

// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDZFflau4i1D-bRCU0VYtCQacEyfmbOMEY",
  authDomain: "elvecimarket-push-svc.firebaseapp.com",
  projectId: "elvecimarket-push-svc",
  storageBucket: "elvecimarket-push-svc.firebasestorage.app",
  messagingSenderId: "516304000089",
  appId: "1:516304000089:web:f9583a8a2967858a4acd48",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📨 Received background message: ", payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: icon || "/vite.svg",
  });
});

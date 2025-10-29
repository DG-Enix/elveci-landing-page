// src/firebase-messaging.ts
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDZFflau4i1D-bRCU0VYtCQacEyfmbOMEY",
  authDomain: "elvecimarket-push-svc.firebaseapp.com",
  projectId: "elvecimarket-push-svc",
  storageBucket: "elvecimarket-push-svc.firebasestorage.app",
  messagingSenderId: "your_s516304000089ender_id",
  appId: "1:516304000089:web:f9583a8a2967858a4acd48",
};

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification?.title || "Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

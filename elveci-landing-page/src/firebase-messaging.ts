// src/firebase-messaging.ts
import { messaging } from "./firebase/firebase";
import { getToken, onMessage } from "firebase/messaging";

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission not granted.");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: "YOUR_PUBLIC_VAPID_KEY",
      serviceWorkerRegistration: await navigator.serviceWorker.register("/firebase-messaging-sw.js"),
    });

    console.log("✅ FCM Token:", token);
    return token;
  } catch (err) {
    console.error("🔥 Error getting token:", err);
  }
}

export function listenMessages() {
  onMessage(messaging, (payload) => {
    console.log("📩 Message received in foreground:", payload);
  });
}

// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef",
};

// ✅ Initialize Firebase once
export const app = initializeApp(firebaseConfig);

// ✅ Messaging instance (for foreground)
export const messaging = getMessaging(app);

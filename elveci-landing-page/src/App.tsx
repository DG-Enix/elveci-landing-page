import { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminForm from "./pages/AdminForm";
import Catalog from "./pages/Catalog";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import "./App.css";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(async (registration) => {
          console.log("✅ Service Worker registered:", registration.scope);
          try {
            const mod = await import("./firebase/firebase");
            if (
              typeof (mod as any).requestNotificationPermission === "function"
            ) {
              (mod as any).requestNotificationPermission();
            } else {
              console.warn(
                "requestNotificationPermission is not exported by ./firebase/firebase"
              );
            }
          } catch (e) {
            console.warn(
              "Could not load ./firebase/firebase to request notification permission:",
              e
            );
          }
        })
        .catch((err) => console.error("❌ SW registration failed:", err));
    }
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/form" element={<AdminForm />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
      <WhatsAppFloatingButton
        phone="573001234567" // <-- your number (country code + number)
        message="Hola! Estoy interesado en la promo de hoy 👋"
      />
    </HashRouter>
  );
}

export default App;

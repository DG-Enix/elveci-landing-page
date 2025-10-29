import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  requestNotificationPermission,
  listenMessages,
} from "../firebase-messaging";
import logo from "../assets/logo.png"; // Add your logo here

const SCRIPT_URL =
  "https://n8n.elvecimarket.com/webhook-test/elvecimarket-form";
//"https://script.google.com/macros/s/AKfycbzjp_g0ylncmtTLQ5gDmcN6idh9oA0AvJiA592iPa9pkdDtiYa20mcvxpe2vo3_sD86tw/exec"; //TEST
//"https://script.google.com/macros/s/AKfycbzX_-hqgP_0EN18s1zZR_Y1XODUUsb3STC015BYfHAKY431S9ML-bL5YHSsMWJ7ZpWA/exec"; //PROD

function LandingPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    requestNotificationPermission();
    listenMessages();
  }, []);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        console.log("✅ Service Worker registered:", registration);
      } catch (err) {
        console.error("❌ Service Worker registration failed:", err);
      }
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true); // 👉 show "Guardando..."

    try {
      // Convert FormData to an object and then to URLSearchParams
      const form = e.currentTarget;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", "57" + phone);

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Gracias por unirte a la lista!");
        form.reset();
      } else {
        alert("Error al enviar. Intenta de nuevo.");
      }

      setSaving(false);
    } catch (e) {
      alert("Error al enviar. Intenta de nuevo.");
      setSaving(false);
    }
  };

  return (
    <div className="landing-hero-bg">
      <div className="hidden landing-muy-pronto">Muy pronto</div>
      <img src={logo} alt="El Veci Logo" className="landing-logo" />
      <h1 className="landing-headline">Donde comprar es ahorrar.</h1>
      <p className="landing-subheadline">
        Encuentra tus productos favoritos y aprovecha las ofertas diarias desde
        tu casa.
        <br />
        ¡Frescura, variedad y descuentos en un solo lugar!
      </p>

      <div>
        <button
          onClick={() => navigate("/catalog")}
          className="hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          🔥 Aprovecha las promociones de hoy!
        </button>
      </div>

      <div className="landing-disclaimer">
        Sé el primero en recibir actualizaciones de El Veci. Prometemos no
        enviarte spam.
      </div>

      <form onSubmit={handleSubmit} className="landing-form">
        <label htmlFor="phone" className="block font-small">
          Tu nombre
        </label>

        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="landing-input"
        />

        <label htmlFor="phone" className="block font-small">
          Tu teléfono
        </label>
        <div className="landing-input-group">
          <span className="landing-phone-prefix">+57</span>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="3001234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0-9]{10}"
            required
            className="landing-input"
          />
        </div>
        <small className="text-gray-500">
          Ingresa los 10 dígitos del celular
        </small>
        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Suscribirme!
        </button>
        <div className="landing-page-progress">
          {saving ? "Guardando..." : ""}
        </div>
      </form>
    </div>
  );
}

export default LandingPage;

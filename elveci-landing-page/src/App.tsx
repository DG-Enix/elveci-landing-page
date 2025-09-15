import React from "react";
import logo from "./assets/logo.png"; // Add your logo here

import "./App.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyMkqbLZurVhNxa0qAatdEjbYJIzuS9nhPod5cEi4PahC3uEVW8ggUOfU5dwxlsW_q2BQ/exec";

function App() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Convert FormData to an object and then to URLSearchParams
      const formEntries = Array.from(formData.entries()) as [string, string][];
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams(formEntries),
      });
      if (response.ok) {
        alert("Gracias por unirte a la lista!");
        form.reset();
      } else {
        alert("Error al enviar. Intenta de nuevo.");
      }
    } catch {
      alert("Error al enviar. Intenta de nuevo.");
    }
  };

  return (
    <div className="landing-hero-bg">
      <div className="landing-muy-pronto">Muy pronto</div>
      <img src={logo} alt="El Veci Logo" className="landing-logo" />
      <h1 className="landing-headline">
        Tu mercado de barrio, ¡a solo un clic!
      </h1>
      <p className="landing-subheadline">
        Pide productos frescos y esenciales desde casa, recibe entrega rápida y
        segura en Chía y alrededores.
        <br />
        Fácil, económico y sin complicaciones.
      </p>
      <form className="landing-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
          className="landing-input"
          required
        />
        <button type="submit" className="landing-btn">
          ¡Únete a la lista!
        </button>
      </form>
      <div className="landing-disclaimer">
        Sé el primero en recibir actualizaciones de El Veci. Prometemos no
        enviarte spam.
      </div>
    </div>
  );
}

export default App;

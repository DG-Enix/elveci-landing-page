import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzjp_g0ylncmtTLQ5gDmcN6idh9oA0AvJiA592iPa9pkdDtiYa20mcvxpe2vo3_sD86tw/exec";

export default function AdminForm() {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); // 👉 show "Guardando..."

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Guardado correctamente ✅");
        setName("");
        setPhone("");
      } else {
        alert("Error al guardar ❌");
      }

      setSaving(false);
    } catch {
      alert("Error al enviar ❌");
      setSaving(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Registrar Cliente en Tienda</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="3001234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="[0-9]{10}$"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Guardar
        </button>
        <div style={styles.progress}>{saving ? "Guardando..." : ""}</div>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  progress: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "green",
    marginTop: "0.5rem",
  },
};

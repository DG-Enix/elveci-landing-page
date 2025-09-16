import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AdminLogin from "./pages/AdminLogin";
import AdminForm from "./pages/AdminForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/form" element={<AdminForm />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

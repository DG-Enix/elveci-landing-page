import React from "react";
import wsImg from "../assets/whatsapp.svg"; // Add your logo here

type Props = {
  phone: string; // E.g. "573001234567" (country code + number, no + or dashes)
  message?: string; // optional prefilled message
  className?: string;
};

const WhatsAppFloatingButton: React.FC<Props> = ({
  phone,
  message = "",
  className = "",
}) => {
  const encoded = encodeURIComponent(message);
  const href = `https://wa.me/${phone}${message ? `?text=${encoded}` : ""}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className={
        "fixed right-4 bottom-4 z-50 flex items-center justify-center " +
        "w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-105 " +
        "bg-green-600 hover:bg-green-700 text-white " +
        className
      }
    >
      <img id="floating-btn-img" src={wsImg} alt="chat"></img>
    </a>
  );
};

export default WhatsAppFloatingButton;

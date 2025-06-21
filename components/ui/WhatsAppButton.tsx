import React from "react";

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

const DEFAULT_PHONE = "79188888824";

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phone = DEFAULT_PHONE,
  message = "Здравствуйте! Хочу заказать бытовку.",
  className = "",
  children,
}) => {
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-3d-btn ${className}`}
      aria-label="Написать в WhatsApp"
    >
      <span className="whatsapp-icon">
        {/* SVG WhatsApp */}
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#25D366"/>
          <path d="M23.5 19.5c-.3-.2-1.8-.9-2.1-1-..." fill="#fff"/>
        </svg>
      </span>
      <span className="whatsapp-text">{children || "WhatsApp"}</span>
      <style jsx>{`
        .whatsapp-3d-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5em;
          background: linear-gradient(145deg, #25d366 60%, #128c7e 100%);
          color: #fff;
          font-weight: bold;
          font-size: 1.2rem;
          border: none;
          border-radius: 2.5em;
          box-shadow: 0 6px 24px rgba(18,140,126,0.18), 0 1.5px 4px rgba(0,0,0,0.10);
          padding: 0.7em 1.6em;
          cursor: pointer;
          transition: transform 0.15s cubic-bezier(.4,2,.6,1), box-shadow 0.2s, background 0.2s;
          outline: none;
          user-select: none;
          will-change: transform;
          animation: whatsapp-fade-in 0.7s cubic-bezier(.4,2,.6,1);
        }
        .whatsapp-3d-btn:hover, .whatsapp-3d-btn:focus {
          transform: scale(1.06) perspective(80px) translateY(-2px) rotateX(4deg);
          box-shadow: 0 12px 32px rgba(18,140,126,0.22), 0 2px 8px rgba(0,0,0,0.13);
          background: linear-gradient(145deg, #128c7e 60%, #25d366 100%);
        }
        .whatsapp-3d-btn:active {
          transform: scale(0.97) perspective(80px) translateY(1px) rotateX(-2deg);
          box-shadow: 0 2px 8px rgba(18,140,126,0.15), 0 1px 2px rgba(0,0,0,0.10);
        }
        .whatsapp-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.10));
          animation: whatsapp-swing 2.5s infinite ease-in-out alternate;
        }
        @media (max-width: 600px) {
          .whatsapp-3d-btn {
            font-size: 1rem;
            padding: 0.6em 1.2em;
          }
          .whatsapp-icon svg {
            width: 22px;
            height: 22px;
          }
        }
        @keyframes whatsapp-fade-in {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes whatsapp-swing {
          0% { transform: rotate(-6deg); }
          100% { transform: rotate(6deg); }
        }
      `}</style>
    </a>
  );
};

export default WhatsAppButton; 
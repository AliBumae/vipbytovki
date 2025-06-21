'use client';

import { Phone, MessageCircle } from "lucide-react";

export default function FloatingContactButtons() {
  return (
    <div className="fixed z-50 bottom-6 right-6 flex flex-col gap-4 items-end">
      {/* WhatsApp */}
      <a
        href="https://wa.me/79188888824"
        target="_blank"
        rel="noopener noreferrer"
        className="group shadow-xl rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 p-4 flex items-center justify-center animate-pulse hover:scale-110 hover:shadow-2xl"
        style={{ boxShadow: "0 6px 24px 0 rgba(34,197,94,0.4), 0 1.5px 4px 0 rgba(0,0,0,0.15)" }}
        aria-label="Написать в WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] group-hover:rotate-12 transition-transform" />
      </a>
      {/* Звонок */}
      <a
        href="tel:+79188888824"
        className="group shadow-xl rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 p-4 flex items-center justify-center animate-pulse hover:scale-110 hover:shadow-2xl"
        style={{ boxShadow: "0 6px 24px 0 rgba(59,130,246,0.4), 0 1.5px 4px 0 rgba(0,0,0,0.15)" }}
        aria-label="Позвонить"
      >
        <Phone className="w-7 h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] group-hover:-rotate-12 transition-transform" />
      </a>
    </div>
  );
} 
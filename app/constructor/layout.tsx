"use client";

import { useEffect } from "react";

export default function ConstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Принудительно загружаем клиентские компоненты
    if (typeof window !== "undefined") {
      // Дополнительная проверка для клиентской среды
    }
  }, []);

  return (
    <div className="constructor-layout">
      {children}
    </div>
  );
}

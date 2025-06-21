"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Menu, Clock } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between gap-6 flex-wrap md:flex-nowrap">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">БытовкиПро</span>
          </Link>
        </div>

        {/* Десктопная навигация */}
        <nav className="hidden md:flex gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Главная
          </Link>
          <Link 
            href="/catalog" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Каталог
          </Link>
          <Link 
            href="/constructor" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            3D Конструктор
          </Link>
          <Link 
            href="/delivery" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Доставка
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            О компании
          </Link>
          <Link 
            href="/contacts" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Контакты
          </Link>
        </nav>

        {/* Контакты, режим работы и кнопка заказа — всё в одну строку */}
        <div className="hidden md:flex items-center gap-6 flex-nowrap">
          <div className="flex flex-col items-end gap-0">
            <a href="tel:+79188888824" className="text-sm font-medium flex items-center gap-1 whitespace-nowrap">
              <Phone className="h-3 w-3" />
              +7 (918) 888-88-24
            </a>
            <a href="mailto:alievbull@mail.ru" className="text-xs text-muted-foreground whitespace-nowrap">
              alievbull@mail.ru
            </a>
          </div>
          {/* Анимированные часы и время работы — компактно */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-xl px-4 py-2 shadow animate-fade-in-up whitespace-nowrap">
            <span className="relative flex h-6 w-6">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-60 animate-ping"></span>
              <Clock className="h-6 w-6 text-blue-700 animate-spin-slow relative z-10" />
            </span>
            <span className="text-xs font-semibold text-blue-900">09:00–20:00</span>
          </div>
          <Button size="sm" className="whitespace-nowrap">Заказать звонок</Button>
        </div>

        {/* Мобильное меню */}
        <button 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Выпадающее мобильное меню */}
      {mobileMenuOpen && (
        <div className="container md:hidden py-4 bg-white border-t">
          <nav className="flex flex-col gap-2">
            <Link 
              href="/" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              href="/catalog" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Каталог
            </Link>
            <Link 
              href="/constructor" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              3D Конструктор
            </Link>
            <Link 
              href="/delivery" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Доставка
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              О компании
            </Link>
            <Link 
              href="/contacts" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Контакты
            </Link>
          </nav>
          <div className="mt-4 pt-4 border-t flex flex-col gap-2">
            <a href="tel:+79188888824" className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +7 (918) 888-88-24
            </a>
            <a href="mailto:alievbull@mail.ru" className="text-sm flex items-center gap-2">
              <Mail className="h-4 w-4" />
              alievbull@mail.ru
            </a>
            <Button className="mt-2" onClick={() => setMobileMenuOpen(false)}>
              Заказать звонок
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

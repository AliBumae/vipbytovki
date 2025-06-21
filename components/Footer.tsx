"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 space-y-6 md:space-y-0 text-center md:text-left">
          {/* Лого и О компании */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold">БытовкиПро</h3>
            <p className="text-gray-400 text-sm max-w-xs md:max-w-none">
              Производство и продажа качественных бытовок и модульных конструкций. 
              Индивидуальный подход к каждому заказу.
            </p>
            <div className="flex space-x-6 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-7 w-7" />
              </a>
            </div>
          </div>
          
          {/* Навигация */}
          <div>
            <h4 className="font-medium text-lg mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-400 hover:text-white text-sm">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/constructor" className="text-gray-400 hover:text-white text-sm">
                  3D Конструктор
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-400 hover:text-white text-sm">
                  Доставка
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-400 hover:text-white text-sm">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Каталог */}
          <div>
            <h4 className="font-medium text-lg mb-4">Каталог</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-gray-400 hover:text-white text-sm">
                  Все модели
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Контакты */}
          <div>
            <h4 className="font-medium text-lg mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="h-5 w-5 flex-shrink-0 text-white" />
                <span>г. Москва, ул. Производственная, д. 123, стр. 1</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+79188888824" className="hover:text-white">+7 (918) 888-88-24</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:alievbull@mail.ru" className="text-gray-400 hover:text-white">
                  alievbull@mail.ru
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Clock className="h-5 w-5 flex-shrink-0 text-white animate-spin-slow" />
                <span className="font-semibold text-white animate-fade-in-up transition-all duration-700">Работаем без перерывов и выходных<br/>с 09:00 до 20:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Копирайт */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-gray-500 text-sm flex flex-col md:flex-row justify-between gap-4 items-center md:items-start text-center md:text-left">
          <p>© 2024 БытовкиПро. Все права защищены.</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <Link href="/privacy" className="hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-white">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

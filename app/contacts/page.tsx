"use client";
import { Phone, Mail, MapPin, Clock, Award, User } from "lucide-react";
// import Image from "next/image";

export default function ContactsPage() {
  return (
    <div className="container py-16 animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-blue-800">Контакты</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Контактная информация */}
        <div className="space-y-6">
          <div className="bg-white/80 rounded-2xl p-6 shadow flex flex-col gap-4">
            <div className="flex items-center gap-3 text-lg text-blue-900 font-semibold">
              <User className="w-6 h-6 text-blue-500" />
              ИП Алиев Уружбек Касумович
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Award className="w-5 h-5 text-blue-500" />
              ОГРНИП: 3240500000091710
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Award className="w-5 h-5 text-blue-500" />
              ИНН: 053003517147
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-blue-500" />
              г. Москва, ул. Производственная, д. 123, стр. 1
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-blue-500" />
              <a href="tel:+79188888824" className="hover:underline">+7&nbsp;(918)&nbsp;888-88-24</a>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-blue-500" />
              <a href="mailto:alievbull@mail.ru" className="hover:underline">alievbull@mail.ru</a>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-blue-500" />
              09:00–20:00, без выходных
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-6 text-yellow-900 text-base shadow-md animate-fade-in-up">
            <div className="font-bold mb-2 text-yellow-700 flex items-center gap-2"><Award className="w-5 h-5 text-yellow-500" />Важная информация</div>
            <ul className="space-y-2">
              <li>Перед визитом, пожалуйста, согласуйте время с менеджером</li>
              <li>Все консультации бесплатны</li>
              <li>Реквизиты для оплаты предоставляются по запросу</li>
            </ul>
          </div>
        </div>
        {/* Карта и фото */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A1b1e1b1e1b1e1b1e1b1e1b1e1b1e1b1e&amp;source=constructor"
              width="100%"
              height="320"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              title="Карта"
            ></iframe>
          </div>
          <img src="/products/deluxe-6m/main.jpg" alt="Офис" width={600} height={320} className="rounded-2xl object-cover shadow" />
        </div>
      </div>
      {/* Быстрая связь */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-lg">
        <div className="flex-1">
          <div className="text-2xl font-bold mb-2">Быстрая связь с менеджером</div>
          <div className="flex items-center gap-4 mt-4">
            <a href="tel:+79188888824" className="bg-white/20 hover:bg-white/40 rounded-xl px-6 py-3 flex items-center gap-2 font-semibold text-lg transition-all">+7 (918) 888-88-24</a>
            <a href="mailto:alievbull@mail.ru" className="bg-white/20 hover:bg-white/40 rounded-xl px-6 py-3 flex items-center gap-2 font-semibold text-lg transition-all">alievbull@mail.ru</a>
            <a href="https://wa.me/79188888824" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 rounded-xl px-6 py-3 flex items-center gap-2 font-semibold text-lg transition-all">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
        <div className="flex-1 text-right hidden md:block">
          <img src="/products/premium-6m/main.jpg" alt="Связь" width={300} height={180} className="rounded-2xl object-cover inline-block shadow" />
        </div>
      </div>
    </div>
  );
} 
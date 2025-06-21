import { Award, Users, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container py-16 animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">О компании</h1>
      <div className="max-w-2xl text-lg text-gray-700 mb-10">
        <p className="mb-4">
          <span className="font-semibold text-blue-700">БытовкиПро</span> — современное производство бытовок, хозблоков и модульных конструкций под ключ. Мы работаем на рынке более 10 лет и предлагаем индивидуальные решения для каждого клиента.
        </p>
        <p className="mb-4">
          Собственное производство, опытная команда и контроль качества на всех этапах позволяют нам гарантировать надежность и долговечность наших изделий. Мы ценим доверие клиентов и всегда открыты к диалогу.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-blue-50 rounded-2xl p-6 text-center shadow-md">
          <Award className="w-10 h-10 mx-auto text-blue-500 mb-3" />
          <div className="text-xl font-bold mb-1">1 год гарантии</div>
          <div className="text-gray-600 text-sm">На все изделия</div>
        </div>
        <div className="bg-green-50 rounded-2xl p-6 text-center shadow-md">
          <Users className="w-10 h-10 mx-auto text-green-500 mb-3" />
          <div className="text-xl font-bold mb-1">5000+ клиентов</div>
          <div className="text-gray-600 text-sm">Довольны качеством</div>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-6 text-center shadow-md">
          <Clock className="w-10 h-10 mx-auto text-yellow-500 mb-3 animate-spin-slow" />
          <div className="text-xl font-bold mb-1">1-3 дня</div>
          <div className="text-gray-600 text-sm">Срок изготовления</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
        <div className="flex-1">
          <Image src="/products/deluxe-6m/main.jpg" alt="Производство бытовок" width={600} height={400} className="rounded-2xl shadow-lg object-cover" />
        </div>
        <div className="flex-1 text-lg text-gray-700">
          <ul className="space-y-4">
            <li className="flex items-center gap-3"><span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span> Индивидуальный подход к каждому заказу</li>
            <li className="flex items-center gap-3"><span className="inline-block w-3 h-3 rounded-full bg-green-500"></span> Современные материалы и технологии</li>
            <li className="flex items-center gap-3"><span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span> Доставка и монтаж под ключ</li>
            <li className="flex items-center gap-3"><span className="inline-block w-3 h-3 rounded-full bg-purple-500"></span> Гибкие условия оплаты</li>
          </ul>
        </div>
      </div>
      <div className="bg-white/80 rounded-2xl p-8 shadow flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <div className="text-2xl font-bold mb-2 text-blue-800">Контакты</div>
          <div className="flex items-center gap-3 mb-2 text-gray-700"><Phone className="w-5 h-5 text-blue-500" /> <a href="tel:+79188888824" className="hover:underline">+7&nbsp;(918)&nbsp;888-88-24</a></div>
          <div className="flex items-center gap-3 mb-2 text-gray-700"><MapPin className="w-5 h-5 text-blue-500" /> г. Москва, ул. Производственная, д. 123, стр. 1</div>
          <div className="flex items-center gap-3 mb-2 text-gray-700"><Clock className="w-5 h-5 text-blue-500" /> 09:00–20:00, без выходных</div>
        </div>
        <div className="flex-1">
          <Image src="/products/premium-6m/main.jpg" alt="Бытовки на заказ" width={500} height={350} className="rounded-2xl shadow object-cover" />
        </div>
      </div>
      {/* Важная информация */}
      <div className="my-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-400/80 rounded-full p-2 shadow animate-pulse">
            <Award className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-yellow-700">Важная информация</span>
        </div>
        <ul className="bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-6 text-yellow-900 text-base shadow-md space-y-3 animate-fade-in-up">
          <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>На фотоматериалах комплектация может отличаться от стандартной</li>
          <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>Пожалуйста, ознакомьтесь с характеристиками и описанием перед заказом</li>
          <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>Ступени и пандусы в стоимость не входят</li>
          <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>Стоимость дополнительных опций уточняйте у менеджера</li>
        </ul>
      </div>
    </div>
  );
} 
"use client";

import Image from "next/image";
import Editor3D from "@/components/3d-editor/Editor3D";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Phone, Square, DoorOpen, Building2, Shield, AlertTriangle, Clock, CreditCard, Award, Users, MapPin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-20 md:py-32 overflow-hidden">
        {/* Фоновые элементы */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/5 rounded-full -translate-x-32 -translate-y-32"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Заголовок */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Современные <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">бытовки</span> и <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">хозблоки</span>
                </h1>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-300">
                    с 3D конструктором
                  </h2>
                </div>
              </div>

              {/* Описание */}
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Спроектируйте идеальную бытовку в нашем 3D редакторе и получите точный расчет стоимости за считанные минуты.
              </p>

              {/* Ключевые преимущества */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-sm md:text-base">Быстрый расчет стоимости</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Check className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm md:text-base">3D визуализация</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Check className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-sm md:text-base">Индивидуальный проект</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Check className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="text-sm md:text-base">Гарантия качества</span>
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  asChild
                >
                  <Link href="/constructor" className="flex items-center">
                    <Building2 className="mr-3 h-6 w-6" />
                    Перейти в 3D конструктор
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Phone className="mr-3 h-5 w-5" />
                  Получить консультацию
                </Button>
              </div>

              {/* Дополнительная информация */}
              <div className="flex items-center gap-8 pt-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span>Быстрое производство</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span>Гарантия 1 год</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>5000+ клиентов</span>
                </div>
              </div>
            </div>

            {/* 3D редактор */}
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '300ms'}}>
              <div className="relative">
                {/* Декоративные элементы */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg opacity-80"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg opacity-80"></div>
                
                {/* Основной контейнер */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-700/50">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <Editor3D />
                  </div>
                  
                  {/* Информационная панель */}
                  <div className="mt-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-4 border border-blue-500/30">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-300">3D редактор активен</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400">
                        <span>Время загрузки: ~2с</span>
                        <span>•</span>
                        <span>Поддерживается на всех устройствах</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Почему <span className="text-blue-600">выбирают нас</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Мы предлагаем качественные бытовки и хозблоки с гарантией и полным сервисом. 
              Наша команда работает для вашего комфорта и удовлетворения.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Качественные материалы */}
            <div className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '200ms'}}>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Качественные материалы</h3>
              <p className="text-gray-600 mb-4">Мы используем только сертифицированные и экологически чистые материалы для производства наших бытовок.</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Сертифицированная древесина</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Экологичные утеплители</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Качественная фурнитура</span>
                </div>
              </div>
            </div>

            {/* Быстрое производство */}
            <div className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '400ms'}}>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Быстрое производство</h3>
              <p className="text-gray-600 mb-4">Производство и доставка бытовки занимает <span className="font-bold text-blue-700 animate-pulse">от 1 до 3 дней</span> в зависимости от сложности проекта.</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Собственное производство</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Современное оборудование</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Быстрая доставка</span>
                </div>
              </div>
            </div>

            {/* Гибкая оплата */}
            <div className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '600ms'}}>
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Гибкая оплата</h3>
              <p className="text-gray-600 mb-4">Оплата по факту, банковским переводом или на расчетный счет ИП.</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Оплата по факту</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Банковский перевод</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Рассрочка возможна</span>
                </div>
              </div>
            </div>

            {/* Гарантия и сервис */}
            <div className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '800ms'}}>
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Гарантия и сервис</h3>
              <p className="text-gray-600 mb-4">Предоставляем гарантию на все изделия и полный сервис после продажи.</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Гарантия 1 год</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Техническая поддержка</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Выезд специалиста</span>
                </div>
              </div>
            </div>
          </div>

          {/* Дополнительные преимущества */}
          <div className={`mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '1000ms'}}>
            {/* Опыт работы */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Опыт работы</h4>
              <p className="text-blue-100 text-sm">Более 10 лет на рынке бытовок и хозблоков</p>
            </div>

            {/* Количество проектов */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Довольные клиенты</h4>
              <p className="text-green-100 text-sm">Более 5000 реализованных проектов</p>
            </div>

            {/* Регион работы */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Регион работы</h4>
              <p className="text-purple-100 text-sm">Москва и Московская область</p>
            </div>
          </div>
        </div>
      </section>

      {/* Каталог продукции */}
      <section className="py-16">
        <div className="container">
          <div className={`text-center mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Каталог продукции</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Выберите готовое решение из нашего каталога или создайте индивидуальный проект в конструкторе
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Хозблоки */}
            <div className={`group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '200ms'}}>
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Хозблоки</h3>
                <p className="text-blue-100 mb-6">
                  Неутепленные строения для хозяйственных нужд. 
                  От компактных 2х1,5 м до промышленных 8х3 м.
                </p>
                <div className="space-y-2 mb-6 text-sm text-blue-100">
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Стандартные модели</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>С дровником</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>С верандой</span>
                  </div>
                </div>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold w-full"
                >
                  <Link href="/catalog">
                    Смотреть хозблоки
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Бытовки */}
            <div className={`group bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '400ms'}}>
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Бытовки</h3>
                <p className="text-green-100 mb-6">
                  Утепленные строения для проживания и комфорта. 
                  Полная комплектация для любых нужд.
                </p>
                <div className="space-y-2 mb-6 text-sm text-green-100">
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Утепленные модели</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>С дровником</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>С верандой</span>
                  </div>
                </div>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold w-full"
                >
                  <Link href="/catalog">
                    Смотреть бытовки
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Дополнительная кнопка для конструктора */}
          <div className={`text-center mt-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '600ms'}}>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Создать индивидуальный проект</h3>
              <p className="text-purple-100 mb-6">
                Используйте наш 3D конструктор для создания идеальной бытовки под ваши требования
              </p>
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-purple-50 font-semibold"
              >
                <Link href="/constructor">
                  Перейти в 3D конструктор
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Дополнительные опции */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container">
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Дополнительные <span className="text-blue-600">опции</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Персонализируйте свою бытовку с помощью наших дополнительных опций. 
              Мы предлагаем широкий выбор материалов и комплектующих для создания идеального решения.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Окна */}
            <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '200ms'}}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Square className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Окна</h3>
                  <p className="text-gray-600">Пластиковые и утепленные окна</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Большой выбор размеров</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Любой конфигурации</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Собственное производство</span>
                </div>
              </div>
            </div>

            {/* Двери */}
            <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '400ms'}}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <DoorOpen className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Двери</h3>
                  <p className="text-gray-600">Любой тип дверей в ассортименте</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Российского производства</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Металлические</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Филенчатые</span>
                </div>
              </div>
            </div>

            {/* Кровельное покрытие */}
            <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '600ms'}}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Кровельное покрытие</h3>
                  <p className="text-gray-600">Надежная защита от непогоды</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Металлочерепица</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Профлист</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Ондулин</span>
                </div>
              </div>
            </div>

            {/* Обшивка */}
            <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '800ms'}}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Обшивка</h3>
                  <p className="text-gray-600">Из любого материала</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Профлист</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Блокхаус</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Другие материалы</span>
                </div>
              </div>
            </div>
          </div>

          {/* Важное примечание */}
          <div className={`mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-2xl p-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '1000ms'}}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-amber-800 mb-2">Важная информация</h4>
                <div className="space-y-2 text-amber-700">
                  <p>• На фотоматериалах комплектация может отличаться от стандартной</p>
                  <p>• Пожалуйста, ознакомьтесь с характеристиками и описанием перед заказом</p>
                  <p>• Ступени и пандусы в стоимость не входят</p>
                  <p>• Стоимость дополнительных опций уточняйте у менеджера</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Как мы работаем */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container">
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Как мы <span className="text-green-600">работаем</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Простой и понятный процесс от заявки до установки. 
              Мы делаем все возможное, чтобы ваш заказ был выполнен качественно и в срок.
            </p>
          </div>
          
          <div className="relative">
            {/* Линия соединения для десктопа */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-green-400 to-green-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { 
                  title: "Заявка", 
                  desc: "Оставьте заявку на сайте или свяжитесь по телефону",
                  details: [
                    "Заполните форму на сайте",
                    "Позвоните по телефону",
                    "Напишите в WhatsApp"
                  ],
                  icon: Phone,
                  color: "blue"
                },
                { 
                  title: "Проектирование", 
                  desc: "Согласуем все детали проекта и рассчитаем стоимость",
                  details: [
                    "Обсуждение требований",
                    "Расчет стоимости",
                    "Согласование проекта"
                  ],
                  icon: Square,
                  color: "green"
                },
                { 
                  title: "Производство", 
                  desc: "Изготовим бытовку согласно согласованному проекту",
                  details: [
                    "Изготовление на заводе",
                    "Контроль качества",
                    "Подготовка к доставке"
                  ],
                  icon: Building2,
                  color: "orange"
                },
                { 
                  title: "Доставка", 
                  desc: "Доставим и установим бытовку на вашем участке",
                  details: [
                    "Доставка на участок",
                    "Установка на место",
                    "Проверка работы"
                  ],
                  icon: Shield,
                  color: "purple"
                },
              ].map((step, index) => {
                const IconComponent = step.icon;
                const colorClasses: Record<string, string> = {
                  blue: "bg-blue-500 text-white",
                  green: "bg-green-500 text-white", 
                  orange: "bg-orange-500 text-white",
                  purple: "bg-purple-500 text-white"
                };
                
                return (
                  <div key={index} className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: `${(index + 1) * 200}ms`}}>
                    <div className="text-center">
                      {/* Номер этапа */}
                      <div className={`w-20 h-20 rounded-full ${colorClasses[step.color]} flex items-center justify-center text-2xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 relative z-20`}>
                        {index + 1}
                      </div>
                      
                      {/* Иконка */}
                      <div className={`w-16 h-16 bg-${step.color}-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-8 h-8 text-${step.color}-600`} />
                      </div>
                      
                      {/* Заголовок и описание */}
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">{step.title}</h3>
                      <p className="text-gray-600 mb-6">{step.desc}</p>
                      
                      {/* Детали этапа */}
                      <div className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-3 text-sm text-gray-600">
                            <div className={`w-2 h-2 rounded-full bg-${step.color}-500 flex-shrink-0`}></div>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '1000ms'}}>
            {/* Время выполнения */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Время выполнения</h4>
              <p className="text-blue-100 text-sm"><span className="font-bold text-yellow-200 animate-pulse">От 1 до 3 дней</span> в зависимости от сложности</p>
            </div>

            {/* Гарантия */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Гарантия качества</h4>
              <p className="text-green-100 text-sm">1 год гарантии на все изделия</p>
            </div>

            {/* Поддержка */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Поддержка клиентов</h4>
              <p className="text-purple-100 text-sm">Консультации на всех этапах работы</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 relative overflow-hidden">
        {/* Фоновые элементы */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
        
        <div className="container relative z-10">
          <div className={`text-center mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готовы заказать <span className="text-yellow-300">бытовку</span>?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-blue-100 leading-relaxed">
              Свяжитесь с нами любым удобным способом или создайте свой проект в 3D конструкторе. 
              Мы поможем подобрать идеальное решение для ваших нужд.
            </p>
          </div>

          {/* Основные кнопки */}
          <div className={`flex flex-col lg:flex-row gap-6 justify-center mb-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '200ms'}}>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Phone className="mr-3 h-6 w-6" />
              Заказать звонок
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link href="/constructor" className="flex items-center">
                <Building2 className="mr-3 h-6 w-6" />
                Перейти в 3D конструктор
              </Link>
            </Button>
          </div>

          {/* Дополнительные способы связи */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '400ms'}}>
            {/* WhatsApp */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">WhatsApp</h3>
              <p className="text-blue-100 text-sm mb-4">Быстрая связь в мессенджере</p>
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-green-500 hover:border-green-500">
                <a href="https://wa.me/79188888824" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Написать
                </a>
              </Button>
            </div>

            {/* Телефон */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Телефон</h3>
              <p className="text-blue-100 text-sm mb-4">Прямая связь с менеджером</p>
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-blue-500 hover:border-blue-500">
                <a href="tel:+79188888824" className="flex items-center gap-2">+7 (918) 888-88-24</a>
              </Button>
            </div>

            {/* Каталог */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Каталог</h3>
              <p className="text-blue-100 text-sm mb-4">Готовые решения</p>
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-purple-500 hover:border-purple-500">
                <Link href="/catalog">Смотреть</Link>
              </Button>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className={`mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '600ms'}}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-300 mb-1">24/7</div>
                <div className="text-blue-100 text-sm">Поддержка клиентов</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300 mb-1">1-3</div>
                <div className="text-blue-100 text-sm">Дней до готовности</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300 mb-1">1 год</div>
                <div className="text-blue-100 text-sm">Гарантия на изделия</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300 mb-1">5000+</div>
                <div className="text-blue-100 text-sm">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

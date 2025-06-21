"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter, CheckCircle2, Star, Zap, Shield, Home } from "lucide-react";
import { getModelById } from "../../lib/buildingModels";
import WhatsAppButton from '../../components/ui/WhatsAppButton';

// Типы для товаров каталога
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  size: string;
  category: string;
  features: string[];
  popular: boolean;
  specifications: {
    dimensions: string;
    ceiling: string;
    windows: string;
    doors: string;
    closedPart?: string; // Для хозблоков с верандой
    gates?: string; // Для хозблоков с воротами
  };
  type: 'hozblok' | 'bytovka'; // Тип товара
}

// Галерея для фото товара
function PhotoGallery({ photos = [], alt }: { photos: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  if (!photos.length) return (
    <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl mb-6">Нет фото</div>
  );
  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);
  return (
    <div className="mb-6">
      <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <Image
          src={photos[current]}
          alt={alt}
          fill
          style={{objectFit: "cover"}}
          className="transition-all duration-500"
        />
        {photos.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md">
              <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md">
              <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </>
        )}
        {photos.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {photos.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${i === current ? 'bg-blue-600' : 'bg-white/70 border border-blue-200'} block`}></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Компонент для безопасной генерации ссылки WhatsApp
function WhatsAppLink({ product }: { product: Product }) {
  const message = `Здравствуйте! Хочу заказать: ${product.name} (${product.size})\nЦена: ${product.price.toLocaleString('ru-RU')} ₽`;
  return (
    <WhatsAppButton message={message} className="w-full">
      WhatsApp
    </WhatsAppButton>
  );
}

export default function CatalogPage() {
  // Состояние для фильтрации
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalProductId, setModalProductId] = useState<string | null>(null);
  const modalBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Данные каталога - хозблоки
  const products: Product[] = [
    {
      id: "hozblok-2x1.5",
      name: "Хозблок 2х1,5",
      description: "Компактный хозблок для небольших участков. Идеально подходит для хранения садового инвентаря.",
      price: 35000,
      imageSrc: "/products/hozblok-small/main.jpg",
      size: "2 х 1,5 м",
      category: "standard",
      features: ["Компактный размер", "Быстрая сборка", "Надежная конструкция"],
      popular: false,
      specifications: {
        dimensions: "2 х 1,5 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-3x2",
      name: "Хозблок 3х2",
      description: "Стандартный хозблок с оптимальным соотношением цены и функциональности.",
      price: 45000,
      imageSrc: "/products/hozblok-firewood-3x2/main.jpg",
      size: "3 х 2 м",
      category: "standard",
      features: ["Оптимальный размер", "Удобное размещение", "Прочная конструкция"],
      popular: false,
      specifications: {
        dimensions: "3 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-3x3",
      name: "Хозблок 3х3",
      description: "Популярная модель квадратной формы с увеличенным внутренним пространством.",
      price: 54000,
      imageSrc: "/products/hozblok-firewood-3x3/main.jpg",
      size: "3 х 3 м",
      category: "standard",
      features: ["Квадратная форма", "Просторный интерьер", "Универсальность"],
      popular: true,
      specifications: {
        dimensions: "3 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-4x2",
      name: "Хозблок 4х2",
      description: "Удлиненный хозблок для размещения большого количества инструментов и инвентаря.",
      price: 50000,
      imageSrc: "/products/hozblok-4x2/main.jpg",
      size: "4 х 2 м",
      category: "standard",
      features: ["Удлиненная форма", "Больше места", "Удобная организация"],
      popular: false,
      specifications: {
        dimensions: "4 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-4x3",
      name: "Хозблок 4х3",
      description: "Просторный хозблок с увеличенной шириной для максимального комфорта.",
      price: 63000,
      imageSrc: "/products/hozblok-4x3/main.jpg",
      size: "4 х 3 м",
      category: "standard",
      features: ["Увеличенная ширина", "Максимальный комфорт", "Гибкая планировка"],
      popular: false,
      specifications: {
        dimensions: "4 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-5x2",
      name: "Хозблок 5х2",
      description: "Самый длинный стандартный хозблок для больших участков и хозяйственных нужд.",
      price: 56000,
      imageSrc: "/products/hozblok-5x2/main.jpg",
      size: "5 х 2 м",
      category: "standard",
      features: ["Максимальная длина", "Большая вместимость", "Профессиональное использование"],
      popular: false,
      specifications: {
        dimensions: "5 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-5x3",
      name: "Хозблок 5х3",
      description: "Просторный хозблок с увеличенной шириной для максимального комфорта и удобства.",
      price: 71000,
      imageSrc: "/products/hozblok-5x3/main.jpg",
      size: "5 х 3 м",
      category: "standard",
      features: ["Увеличенная ширина", "Максимальный комфорт", "Гибкая планировка"],
      popular: false,
      specifications: {
        dimensions: "5 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-6x2",
      name: "Хозблок 6х2",
      description: "Популярная модель удлиненного хозблока для больших участков и хозяйственных нужд.",
      price: 58000,
      imageSrc: "/textures/deluxe/wall_deluxe.jpg",
      size: "6 х 2 м",
      category: "standard",
      features: ["Максимальная длина", "Большая вместимость", "Профессиональное использование"],
      popular: true,
      specifications: {
        dimensions: "6 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-6x3",
      name: "Хозблок 6х3",
      description: "Самый просторный стандартный хозблок с максимальными размерами для любых нужд.",
      price: 74000,
      imageSrc: "/textures/floor.jpg",
      size: "6 х 3 м",
      category: "standard",
      features: ["Максимальные размеры", "Просторный интерьер", "Универсальность"],
      popular: false,
      specifications: {
        dimensions: "6 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-7x3",
      name: "Хозблок 7х3",
      description: "Огромный хозблок для промышленных нужд и больших хозяйств.",
      price: 95000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "7 х 3 м",
      category: "standard",
      features: ["Промышленные размеры", "Максимальная вместимость", "Профессиональное использование"],
      popular: false,
      specifications: {
        dimensions: "7 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-8x3",
      name: "Хозблок 8х3",
      description: "Самый большой хозблок в нашем каталоге для максимальных потребностей.",
      price: 116000,
      imageSrc: "/textures/deluxe/floor_deluxe.jpg",
      size: "8 х 3 м",
      category: "standard",
      features: ["Максимальные размеры", "Промышленное использование", "Полная комплектация"],
      popular: false,
      specifications: {
        dimensions: "8 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-firewood-3x2",
      name: "Хозблок с дровником 3х2",
      description: "Практичный хозблок с отдельным отсеком для хранения дров. Идеально для дачного участка.",
      price: 47000,
      imageSrc: "/textures/premium/roof_premium.jpg",
      size: "3 х 2 м",
      category: "firewood",
      features: ["Дровник", "Удобное хранение", "Практичность"],
      popular: false,
      specifications: {
        dimensions: "3 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-firewood-3x3",
      name: "Хозблок с дровником 3х3",
      description: "Просторный хозблок с дровником квадратной формы для максимального комфорта.",
      price: 56000,
      imageSrc: "/textures/deluxe/roof_deluxe.jpg",
      size: "3 х 3 м",
      category: "firewood",
      features: ["Дровник", "Квадратная форма", "Просторный интерьер"],
      popular: false,
      specifications: {
        dimensions: "3 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-firewood-4x2",
      name: "Хозблок с дровником 4х2",
      description: "Удлиненный хозблок с дровником для размещения большого количества инструментов и дров.",
      price: 52000,
      imageSrc: "/textures/premium/roof_premium.jpg",
      size: "4 х 2 м",
      category: "firewood",
      features: ["Дровник", "Удлиненная форма", "Больше места"],
      popular: false,
      specifications: {
        dimensions: "4 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-firewood-4x3",
      name: "Хозблок с дровником 4х3",
      description: "Просторный хозблок с дровником увеличенной ширины для максимального комфорта.",
      price: 65000,
      imageSrc: "/textures/deluxe/roof_deluxe.jpg",
      size: "4 х 3 м",
      category: "firewood",
      features: ["Дровник", "Увеличенная ширина", "Максимальный комфорт"],
      popular: false,
      specifications: {
        dimensions: "4 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-firewood-5x2",
      name: "Хозблок с дровником 5х2",
      description: "Длинный хозблок с дровником для больших участков и хозяйственных нужд.",
      price: 59000,
      imageSrc: "/textures/floor.jpg",
      size: "5 х 2 м",
      category: "firewood",
      features: ["Дровник", "Максимальная длина", "Большая вместимость"],
      popular: false,
      specifications: {
        dimensions: "5 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-firewood-5x3",
      name: "Хозблок с дровником 5х3",
      description: "Популярная модель просторного хозблока с дровником для максимального комфорта.",
      price: 74000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "5 х 3 м",
      category: "firewood",
      features: ["Дровник", "Увеличенная ширина", "Максимальный комфорт"],
      popular: true,
      specifications: {
        dimensions: "5 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-firewood-6x2",
      name: "Хозблок с дровником 6х2",
      description: "Самый длинный хозблок с дровником для промышленных нужд и больших хозяйств.",
      price: 61000,
      imageSrc: "/textures/deluxe/floor_deluxe.jpg",
      size: "6 х 2 м",
      category: "firewood",
      features: ["Дровник", "Промышленные размеры", "Максимальная вместимость"],
      popular: false,
      specifications: {
        dimensions: "6 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-firewood-6x3",
      name: "Хозблок с дровником 6х3",
      description: "Огромный хозблок с дровником для максимальных потребностей и промышленного использования.",
      price: 78000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "6 х 3 м",
      category: "firewood",
      features: ["Дровник", "Максимальные размеры", "Промышленное использование"],
      popular: false,
      specifications: {
        dimensions: "6 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-firewood-7x3",
      name: "Хозблок с дровником 7х3",
      description: "Самый большой хозблок с дровником для промышленных нужд и больших хозяйств.",
      price: 99000,
      imageSrc: "/textures/deluxe/floor_deluxe.jpg",
      size: "7 х 3 м",
      category: "firewood",
      features: ["Дровник", "Промышленные размеры", "Максимальная вместимость"],
      popular: false,
      specifications: {
        dimensions: "7 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-veranda-3x3",
      name: "Хозблок 3х3 с верандой 3х2",
      description: "Комфортный хозблок с просторной верандой для отдыха на свежем воздухе.",
      price: 96000,
      imageSrc: "/textures/premium/wall_premium.jpg",
      size: "3 х 5 м",
      category: "veranda",
      features: ["Веранда", "Открытое пространство", "Комфортный отдых"],
      popular: false,
      specifications: {
        dimensions: "3 х 5 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "3 х 3 м"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-veranda-4x3",
      name: "Хозблок 4х3 с верандой 4х2",
      description: "Просторный хозблок с большой верандой для максимального комфорта.",
      price: 110000,
      imageSrc: "/textures/deluxe/wall_deluxe.jpg",
      size: "4 х 5 м",
      category: "veranda",
      features: ["Веранда", "Увеличенная ширина", "Максимальный комфорт"],
      popular: false,
      specifications: {
        dimensions: "4 х 5 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "4 х 3 м"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-veranda-5x2",
      name: "Хозблок 5х2 с верандой 5х2",
      description: "Длинный хозблок с просторной верандой для больших участков.",
      price: 110000,
      imageSrc: "/textures/floor.jpg",
      size: "5 х 4 м",
      category: "veranda",
      features: ["Веранда", "Максимальная длина", "Большая вместимость"],
      popular: false,
      specifications: {
        dimensions: "5 х 4 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "5 х 2 м"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-veranda-5x3",
      name: "Хозблок 5х3 с верандой 5х2",
      description: "Просторный хозблок с верандой для максимального комфорта и удобства.",
      price: 124000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "5 х 5 м",
      category: "veranda",
      features: ["Веранда", "Увеличенная ширина", "Максимальный комфорт"],
      popular: false,
      specifications: {
        dimensions: "5 х 5 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "5 х 3 м"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-veranda-6x2",
      name: "Хозблок 6х2 с верандой 6х2",
      description: "Самый длинный хозблок с верандой для промышленных нужд и больших хозяйств.",
      price: 118000,
      imageSrc: "/textures/deluxe/floor_deluxe.jpg",
      size: "6 х 4 м",
      category: "veranda",
      features: ["Веранда", "Промышленные размеры", "Максимальная вместимость"],
      popular: false,
      specifications: {
        dimensions: "6 х 4 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "6 х 2 м"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-veranda-6x3",
      name: "Хозблок 6х3 с верандой 6х2",
      description: "Самый просторный хозблок с верандой для максимальных потребностей.",
      price: 137000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "6 х 5 м",
      category: "veranda",
      features: ["Веранда", "Максимальные размеры", "Промышленное использование"],
      popular: false,
      specifications: {
        dimensions: "6 х 5 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "6 х 3 м"
      },
      type: 'hozblok'
    },
    {
      id: "hozblok-samokat-4x2",
      name: 'Хозблок 4х2 "Самокат"',
      description: "Специальная модель хозблока с двустворчатыми воротами для удобной загрузки.",
      price: 61000,
      imageSrc: "/textures/deluxe/wall_deluxe.jpg",
      size: "4 х 2 м",
      category: "custom",
      features: ["Двустворчатые ворота", "Удобная загрузка", "Специальная модель"],
      popular: false,
      specifications: {
        dimensions: "4 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "нет",
        doors: "нет",
        gates: "1 шт"
      },
      type: 'hozblok'
    },
    // Бытовки утепленные стандартные
    {
      id: "bytovka-3x2",
      name: "Бытовка 3х2",
      description: "Компактная утепленная бытовка для проживания и хранения инструментов.",
      price: 54000,
      imageSrc: "/textures/premium/wall_premium.jpg",
      size: "3 х 2 м",
      category: "standard",
      features: ["Утепление", "Электрика", "Компактность"],
      popular: false,
      specifications: {
        dimensions: "3 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-3x3",
      name: "Бытовка 3х3",
      description: "Квадратная утепленная бытовка с оптимальным использованием пространства.",
      price: 67000,
      imageSrc: "/textures/deluxe/wall_deluxe.jpg",
      size: "3 х 3 м",
      category: "standard",
      features: ["Утепление", "Квадратная форма", "Универсальность"],
      popular: false,
      specifications: {
        dimensions: "3 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-4x2",
      name: "Бытовка 4х2",
      description: "Удлиненная утепленная бытовка с оптимальной планировкой.",
      price: 60000,
      imageSrc: "/textures/floor.jpg",
      size: "4 х 2 м",
      category: "standard",
      features: ["Утепление", "Удлиненная форма", "Больше места"],
      popular: false,
      specifications: {
        dimensions: "4 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-4x3",
      name: "Бытовка 4х3",
      description: "Просторная утепленная бытовка с увеличенной шириной.",
      price: 78000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "4 х 3 м",
      category: "standard",
      features: ["Утепление", "Увеличенная ширина", "Максимальный комфорт"],
      popular: false,
      specifications: {
        dimensions: "4 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-5x2",
      name: "Бытовка 5х2",
      description: "Длинная утепленная бытовка для больших участков.",
      price: 67000,
      imageSrc: "/textures/deluxe/floor_deluxe.jpg",
      size: "5 х 2 м",
      category: "standard",
      features: ["Утепление", "Максимальная длина", "Большая вместимость"],
      popular: false,
      specifications: {
        dimensions: "5 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-5x3",
      name: "Бытовка 5х3",
      description: "Просторная утепленная бытовка с увеличенной шириной для максимального комфорта.",
      price: 97000,
      imageSrc: "/textures/premium/wall_premium.jpg",
      size: "5 х 3 м",
      category: "standard",
      features: ["Утепление", "Увеличенная ширина", "Максимальный комфорт"],
      popular: false,
      specifications: {
        dimensions: "5 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-6x2",
      name: "Бытовка 6х2",
      description: "Популярная модель удлиненной утепленной бытовки для больших участков.",
      price: 69000,
      imageSrc: "/textures/deluxe/wall_deluxe.jpg",
      size: "6 х 2 м",
      category: "standard",
      features: ["Утепление", "Максимальная длина", "Большая вместимость"],
      popular: true,
      specifications: {
        dimensions: "6 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-6x3",
      name: "Бытовка 6х3",
      description: "Самый просторный стандартный утепленный хозблок с максимальными размерами.",
      price: 107000,
      imageSrc: "/textures/floor.jpg",
      size: "6 х 3 м",
      category: "standard",
      features: ["Утепление", "Максимальные размеры", "Просторный интерьер"],
      popular: false,
      specifications: {
        dimensions: "6 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-7x3",
      name: "Бытовка 7х3",
      description: "Огромная утепленная бытовка для промышленных нужд и больших хозяйств.",
      price: 145000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "7 х 3 м",
      category: "standard",
      features: ["Утепление", "Промышленные размеры", "Максимальная вместимость"],
      popular: false,
      specifications: {
        dimensions: "7 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    // Бытовки утепленные с дровником
    {
      id: "bytovka-firewood-3x2",
      name: "Бытовка с дровником 3х2",
      description: "Компактная утепленная бытовка с дровником для небольших участков.",
      price: 56000,
      imageSrc: "/textures/premium/roof_premium.jpg",
      size: "3 х 2 м",
      category: "firewood",
      features: ["Дровник", "Утепление", "Компактность"],
      popular: false,
      specifications: {
        dimensions: "3 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-firewood-3x3",
      name: "Бытовка с дровником 3х3",
      description: "Квадратная утепленная бытовка с дровником для максимального комфорта.",
      price: 69000,
      imageSrc: "/textures/deluxe/roof_deluxe.jpg",
      size: "3 х 3 м",
      category: "firewood",
      features: ["Дровник", "Утепление", "Квадратная форма"],
      popular: false,
      specifications: {
        dimensions: "3 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-firewood-4x2",
      name: "Бытовка с дровником 4х2",
      description: "Удлиненная утепленная бытовка с дровником для размещения инструментов и дров.",
      price: 62000,
      imageSrc: "/textures/floor.jpg",
      size: "4 х 2 м",
      category: "firewood",
      features: ["Дровник", "Утепление", "Удлиненная форма"],
      popular: false,
      specifications: {
        dimensions: "4 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-firewood-4x3",
      name: "Бытовка с дровником 4х3",
      description: "Просторная утепленная бытовка с дровником увеличенной ширины.",
      price: 80000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "4 х 3 м",
      category: "firewood",
      features: ["Дровник", "Утепление", "Увеличенная ширина"],
      popular: false,
      specifications: {
        dimensions: "4 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-firewood-5x2",
      name: "Бытовка с дровником 5х2",
      description: "Длинная утепленная бытовка с дровником для больших участков.",
      price: 70000,
      imageSrc: "/textures/deluxe/floor_deluxe.jpg",
      size: "5 х 2 м",
      category: "firewood",
      features: ["Дровник", "Утепление", "Максимальная длина"],
      popular: false,
      specifications: {
        dimensions: "5 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-firewood-5x3",
      name: "Бытовка с дровником 5х3",
      description: "Популярная модель просторной утепленной бытовки с дровником.",
      price: 100000,
      imageSrc: "/textures/premium/wall_premium.jpg",
      size: "5 х 3 м",
      category: "firewood",
      features: ["Дровник", "Утепление", "Увеличенная ширина"],
      popular: true,
      specifications: {
        dimensions: "5 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-firewood-6x2",
      name: "Бытовка с дровником 6х2",
      description: "Самый длинный утепленный хозблок с дровником для промышленных нужд.",
      price: 72000,
      imageSrc: "/textures/deluxe/wall_deluxe.jpg",
      size: "6 х 2 м",
      category: "firewood",
      features: ["Дровник", "Утепление", "Промышленные размеры"],
      popular: false,
      specifications: {
        dimensions: "6 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-firewood-6x3",
      name: "Бытовка с дровником 6х3",
      description: "Огромная утепленная бытовка с дровником для максимальных потребностей.",
      price: 111000,
      imageSrc: "/textures/floor.jpg",
      size: "6 х 3 м",
      category: "firewood",
      features: ["Дровник", "Утепление", "Максимальные размеры"],
      popular: false,
      specifications: {
        dimensions: "6 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-firewood-7x3",
      name: "Бытовка с дровником 7х3",
      description: "Самый большой утепленный хозблок с дровником для промышленного использования.",
      price: 149000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "7 х 3 м",
      category: "firewood",
      features: ["Дровник", "Утепление", "Промышленные размеры"],
      popular: false,
      specifications: {
        dimensions: "7 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    // Бытовки утепленные с верандой
    {
      id: "bytovka-veranda-3x3",
      name: "Бытовка 3х3 с верандой 3х2",
      description: "Комфортная утепленная бытовка с просторной верандой для отдыха на свежем воздухе.",
      price: 105000,
      imageSrc: "/textures/premium/wall_premium.jpg",
      size: "3 х 5 м",
      category: "veranda",
      features: ["Веранда", "Утепление", "Открытое пространство"],
      popular: false,
      specifications: {
        dimensions: "3 х 5 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "3 х 3 м"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-veranda-4x3",
      name: "Бытовка 4х3 с верандой 4х2",
      description: "Просторная утепленная бытовка с большой верандой для максимального комфорта.",
      price: 124000,
      imageSrc: "/textures/deluxe/wall_deluxe.jpg",
      size: "4 х 5 м",
      category: "veranda",
      features: ["Веранда", "Утепление", "Увеличенная ширина"],
      popular: false,
      specifications: {
        dimensions: "4 х 5 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "4 х 3 м"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-veranda-5x2",
      name: "Бытовка 5х2 с верандой 5х2",
      description: "Длинная утепленная бытовка с просторной верандой для больших участков.",
      price: 133000,
      imageSrc: "/textures/floor.jpg",
      size: "5 х 4 м",
      category: "veranda",
      features: ["Веранда", "Утепление", "Максимальная длина"],
      popular: false,
      specifications: {
        dimensions: "5 х 4 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "5 х 2 м"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-veranda-5x3",
      name: "Бытовка 5х3 с верандой 5х2",
      description: "Просторная утепленная бытовка с верандой для максимального комфорта и удобства.",
      price: 160000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "5 х 5 м",
      category: "veranda",
      features: ["Веранда", "Утепление", "Увеличенная ширина"],
      popular: false,
      specifications: {
        dimensions: "5 х 5 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "5 х 3 м"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-veranda-6x2",
      name: "Бытовка 6х2 с верандой 6х2",
      description: "Самый длинный утепленный хозблок с верандой для промышленных нужд.",
      price: 138000,
      imageSrc: "/textures/deluxe/floor_deluxe.jpg",
      size: "6 х 4 м",
      category: "veranda",
      features: ["Веранда", "Утепление", "Промышленные размеры"],
      popular: false,
      specifications: {
        dimensions: "6 х 4 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "6 х 2 м"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-veranda-6x3",
      name: "Бытовка 6х3 с верандой 6х2",
      description: "Популярная модель самого просторного утепленного хозблока с верандой.",
      price: 180000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "6 х 5 м",
      category: "veranda",
      features: ["Веранда", "Утепление", "Максимальные размеры"],
      popular: true,
      specifications: {
        dimensions: "6 х 5 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "6 х 3 м"
      },
      type: 'bytovka'
    },
    // Нестандартные утепленные бытовки
    {
      id: "bytovka-comfort-5x2",
      name: 'Бытовка 5х2 "Комфорт"',
      description: "Популярная модель утепленной бытовки с улучшенной комплектацией.",
      price: 93000,
      imageSrc: "/textures/deluxe/wall_deluxe.jpg",
      size: "5 х 2 м",
      category: "custom",
      features: ["Окно ПВХ", "Металлическая дверь", "Улучшенная комплектация"],
      popular: true,
      specifications: {
        dimensions: "5 х 2 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-comfort-6x3",
      name: 'Бытовка 6х3 "Комфорт"',
      description: "Популярная модель просторной утепленной бытовки с улучшенной комплектацией.",
      price: 140000,
      imageSrc: "/textures/premium/wall_premium.jpg",
      size: "6 х 3 м",
      category: "custom",
      features: ["Окно ПВХ", "Металлическая дверь", "Максимальные размеры"],
      popular: true,
      specifications: {
        dimensions: "6 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-dvuskat-comfort-6x3",
      name: 'Бытовка 6х3 "Двускат + Комфорт"',
      description: "Утепленная бытовка с ровным потолком и улучшенной комплектацией.",
      price: 169000,
      imageSrc: "/textures/deluxe/floor_deluxe.jpg",
      size: "6 х 3 м",
      category: "custom",
      features: ["Ровный потолок", "Окно ПВХ", "Металлическая дверь"],
      popular: false,
      specifications: {
        dimensions: "6 х 3 м",
        ceiling: "2,1 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-comfort-7x3",
      name: 'Бытовка 7х3 "Комфорт"',
      description: "Огромная утепленная бытовка с улучшенной комплектацией для промышленных нужд.",
      price: 185000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "7 х 3 м",
      category: "custom",
      features: ["Окно ПВХ", "Металлическая дверь", "Промышленные размеры"],
      popular: false,
      specifications: {
        dimensions: "7 х 3 м",
        ceiling: "1,95 ÷ 2,15 м",
        windows: "1 шт",
        doors: "1 шт"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-veranda-tulpan-6x2",
      name: 'Бытовка 6х2 с верандой 6х2 "Тюльпан"',
      description: "Популярная модель утепленной бытовки с верандой и улучшенной комплектацией.",
      price: 167000,
      imageSrc: "/textures/deluxe/wall_deluxe.jpg",
      size: "6 х 4 м",
      category: "veranda",
      features: ["Веранда", "Окно ПВХ", "Металлическая дверь"],
      popular: true,
      specifications: {
        dimensions: "6 х 4 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "6 х 2 м"
      },
      type: 'bytovka'
    },
    {
      id: "bytovka-veranda-tulpan-6x3",
      name: 'Бытовка 6х3 с верандой 6х2 "Тюльпан"',
      description: "Самый просторный утепленный хозблок с верандой и улучшенной комплектацией.",
      price: 205000,
      imageSrc: "/textures/premium/floor_premium.jpg",
      size: "6 х 5 м",
      category: "veranda",
      features: ["Веранда", "Окно ПВХ", "Металлическая дверь"],
      popular: false,
      specifications: {
        dimensions: "6 х 5 м",
        ceiling: "2,0 ÷ 2,3 м",
        windows: "1 шт",
        doors: "1 шт",
        closedPart: "6 х 3 м"
      },
      type: 'bytovka'
    }
  ].map(product => ({
    ...product,
    imageSrc: `/products/${product.id}/main.jpg`,
    type: product.type as 'hozblok' | 'bytovka',
  }));

  // Категории для фильтрации
  const categories = [
    { id: "all", name: "Все товары", icon: Home },
    { id: "standard", name: "Стандартные", icon: Shield },
    { id: "firewood", name: "С дровником", icon: Zap },
    { id: "veranda", name: "С верандой", icon: Star },
    { id: "custom", name: "Нестандартные", icon: Star }
  ];

  // Фильтрация продуктов
  const filteredProducts = products.filter(product => 
    activeCategory === "all" || product.category === activeCategory
  );

  // Сортировка продуктов
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "popular") {
      return a.popular === b.popular ? 0 : a.popular ? -1 : 1;
    } else if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Анимированный заголовок страницы */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000"></div>
          </div>
        </div>
        <div className="container relative z-10">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white text-center">
              Каталог <span className="text-blue-300">хозблоков и бытовок</span>
            </h1>
            <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto leading-relaxed">
              Неутепленные хозблоки и утепленные бытовки различных размеров для любых нужд
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Информационные блоки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '200ms'}}>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Хозблоки холодные</h3>
            <p className="text-gray-600">Неутепленные строения для хозяйственных нужд</p>
          </div>
          
          <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '400ms'}}>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Бытовки утепленные</h3>
            <p className="text-gray-600">Утепленные строения для проживания и комфорта</p>
          </div>
          
          <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '600ms'}}>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">С верандой</h3>
            <p className="text-gray-600">Строения с просторной верандой для отдыха</p>
          </div>
        </div>

        {/* Фильтры и сортировка */}
        <div className={`bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '800ms'}}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeCategory === category.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    style={{transitionDelay: `${900 + index * 100}ms`}}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 px-4 py-2 rounded-xl text-sm border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="popular">По популярности</option>
                <option value="price-low">Сначала дешевле</option>
                <option value="price-high">Сначала дороже</option>
              </select>
            </div>
          </div>
        </div>

        {/* Результаты фильтрации */}
        <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '1000ms'}}>
          <p className="mb-6 text-gray-600 text-lg">
            Найдено <span className="font-semibold text-blue-600">{sortedProducts.length}</span> {declension(sortedProducts.length, ['хозблок', 'хозблока', 'хозблоков'])}
          </p>
        </div>

        {/* Список товаров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product, index) => {
            // Получаем details из buildingModels, если есть
            const model = getModelById(product.id);
            const details = model?.details;
            return (
              <div 
                key={product.id} 
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{transitionDelay: `${1100 + index * 100}ms`}}
              >
                {/* Изображение */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    style={{objectFit: "cover"}}
                    className="group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Бейдж популярности */}
                  {product.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Популярный
                    </div>
                  )}
                  
                  {/* Цена */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3">
                      <div className="text-2xl font-bold text-blue-600">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Контент */}
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Характеристики */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Характеристики
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Габариты:</span>
                        <div className="font-medium">{product.specifications.dimensions}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Потолок:</span>
                        <div className="font-medium">{product.specifications.ceiling}</div>
                      </div>
                      {product.specifications.closedPart && (
                        <div className="col-span-2">
                          <span className="text-gray-500">Закрытая часть:</span>
                          <div className="font-medium">{product.specifications.closedPart}</div>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">Окно:</span>
                        <div className="font-medium">{product.specifications.windows}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Дверь:</span>
                        <div className="font-medium">{product.specifications.doors}</div>
                      </div>
                      {product.specifications.gates && (
                        <div className="col-span-2">
                          <span className="text-gray-500">Ворота:</span>
                          <div className="font-medium">{product.specifications.gates}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Особенности */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold py-3 rounded-xl transition-all duration-300"
                      onClick={() => setModalProductId(product.id)}
                    >
                      Описание
                    </Button>
                    <WhatsAppLink product={product} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Нет результатов */}
        {sortedProducts.length === 0 && (
          <div className={`text-center py-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '1200ms'}}>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Ничего не найдено</h3>
              <p className="text-gray-600 mb-6">Попробуйте изменить фильтры поиска</p>
              <Button 
                onClick={() => setActiveCategory("all")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Сбросить фильтры
              </Button>
            </div>
          </div>
        )}
        
        {/* Призыв к действию */}
        <div className={`mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '1300ms'}}>
          <h2 className="text-3xl font-bold mb-4">Нужен нестандартный размер?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Мы готовы спроектировать и изготовить хозблок именно тех размеров, которые вам необходимы. 
            Индивидуальные решения для ваших конкретных нужд.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            >
              <Link href="/constructor">
                Создать в 3D-конструкторе 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
      {/* Модальное окно для details */}
      {modalProductId && (
        <div
          ref={modalBgRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={e => { if (e.target === modalBgRef.current) setModalProductId(null); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in-up">
            <PhotoGallery photos={getModelById(modalProductId)?.photos || []} alt={getModelById(modalProductId)?.name || ''} />
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold"
              onClick={() => setModalProductId(null)}
              aria-label="Закрыть"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue-800">{getModelById(modalProductId)?.name || "Описание"}</h2>
            <pre className="whitespace-pre-wrap text-gray-700 text-base leading-relaxed">
              {getModelById(modalProductId)?.details || 'Информация скоро появится'}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// Вспомогательная функция для склонения слов
function declension(number: number, titles: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

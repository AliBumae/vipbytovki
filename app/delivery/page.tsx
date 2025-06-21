"use client";
import { Truck, AlertTriangle, PackageSearch, MoveRight } from "lucide-react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

const Delivery3D = dynamic(() => import("../../components/3d-editor/Delivery3D"), { ssr: false });

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-900">
          Сборка, доставка и оплата
        </motion.h1>
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration:0.7}} className="mb-12 flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="flex-1">
            <Delivery3D />
          </div>
          <div className="flex-1 flex flex-col gap-8">
            {/* Сборка и доставка материалов */}
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration:0.7}} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-3">
                <Truck className="w-7 h-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-800">Сборка на участке и доставка материалов</h2>
              </div>
              <ul className="space-y-2 text-gray-700 text-base">
                <li>Тариф на сборку на участке <b>от 6 000 руб.</b> (зависит от габаритов, типа, сезонности)</li>
                <li>Доставка материалов <b>ГАЗель/Porter</b> до 1,5т, разгрузка мастерами</li>
                <li>Доставка до 50 км — <b>7 000 руб.</b>, далее 1 км = 50 руб.</li>
                <li>Для крупных строений (&gt;6×3 м, тяжёлые) — может потребоваться несколько доставок</li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-amber-700 bg-amber-50 rounded-xl p-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>В стоимость доставки входит перенос материалов <b>не более 20 метров</b> от машины до места сборки! За превышение — доплата.</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">Точную стоимость уточняйте у менеджера</div>
            </motion.div>
            {/* Доставка манипулятором */}
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.4, duration:0.7}} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-3">
                <PackageSearch className="w-7 h-7 text-purple-600" />
                <h2 className="text-2xl font-bold text-purple-800">Доставка манипулятором</h2>
              </div>
              <ul className="space-y-2 text-gray-700 text-base">
                <li>Сборка <b>0 руб.</b> — при доставке готового строения манипулятором</li>
                <li>Манипуляторы 3–10 тонн, стоимость зависит от направления и сезонности</li>
                <li>Ограничение габаритов: <b>6×2,3 м</b> для доставки в сборе</li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-amber-700 bg-amber-50 rounded-xl p-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Стоимость и возможность доставки уточняйте у менеджера</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.4, duration:0.7}} className="text-center mt-8">
          <Link href="/constructor" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-semibold shadow-lg transition-all">
            <MoveRight className="w-5 h-5" /> Перейти к 3D конструктору
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 
"use client";

import dynamic from "next/dynamic";

// Динамический импорт 3D редактора с отключением SSR
const Editor3D = dynamic(() => import("./Editor3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-300 text-lg">Загрузка 3D редактора...</p>
      </div>
    </div>
  )
});

interface ClientEditor3DProps {
  onConfigChange?: (config: any) => void;
  buildingParams?: any;
}

export default function ClientEditor3D({ onConfigChange, buildingParams }: ClientEditor3DProps) {
  return <Editor3D onConfigChange={onConfigChange} buildingParams={buildingParams} />;
}

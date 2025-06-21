"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Download, 
  Share2, 
  Settings, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Maximize2, 
  Save,
  Calculator,
  FileText,
  Camera,
  Palette,
  Home,
  Zap,
  Droplets,
  Snowflake,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow
} from "lucide-react";
import { useState, useEffect } from "react";
import captureScreenshot from "../../components/3d-editor/captureScreenshot";

// Динамический импорт 3D редактора с отключением SSR
const Editor3D = dynamic(() => import("@/components/3d-editor/ClientEditor3D"), {
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

export default function ConstructorPage() {
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dimensions' | 'materials' | 'options' | 'furniture' | 'lighting'>('dimensions');
  
  // Создаем состояние для параметров бытовки
  const [buildingParams, setBuildingParams] = useState({
    width: 2.4,
    length: 6,
    height: 2.5,
    roofType: "flat", // flat, gable, hip
    doorPosition: "front", // front, back, left, right
    windowsCount: 2,
    finishType: "standard", // standard, premium, deluxe
    options: [] as string[],
    // Новые параметры
    wallColor: "#f0f0f0",
    roofColor: "#d0d0d0",
    doorColor: "#8b4513",
    windowType: "standard", // standard, sliding, panoramic
    insulation: "standard", // standard, premium, deluxe
    foundation: "none", // none, concrete, wooden
    ventilation: false,
    electricity: false,
    heating: false,
    water: false,
    furniture: [] as string[],
    lighting: "natural", // natural, artificial, mixed
    timeOfDay: "day", // day, night, sunset
    weather: "clear" // clear, rain, snow
  });
  
  // Состояние для панелей
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showTopPanel, setShowTopPanel] = useState(true);
  
  // Состояние для сохраненных конфигураций
  const [savedConfigs, setSavedConfigs] = useState<any[]>([]);
  const [currentConfigName, setCurrentConfigName] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  
  useEffect(() => {
    // Имитация загрузки
    setTimeout(() => setIsLoading(false), 1000);
    
    // Загружаем сохраненные конфигурации из localStorage
    if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('savedConfigs');
    if (saved) {
      setSavedConfigs(JSON.parse(saved));
      }
    }
  }, []);
  
  // Функция для расчета стоимости бытовки
  const calculatePrice = () => {
    // Базовая стоимость за 1 кв.м.
    const basePrice = 15000;
    
    // Площадь бытовки
    const area = buildingParams.width * buildingParams.length;
    
    // Стоимость в зависимости от типа отделки
    let finishMultiplier = 1;
    if (buildingParams.finishType === 'premium') {
      finishMultiplier = 1.3;
    } else if (buildingParams.finishType === 'deluxe') {
      finishMultiplier = 1.6;
    }
    
    // Стоимость в зависимости от типа крыши
    let roofMultiplier = 1;
    if (buildingParams.roofType === 'gable') {
      roofMultiplier = 1.15;
    } else if (buildingParams.roofType === 'hip') {
      roofMultiplier = 1.25;
    }
    
    // Стоимость утепления
    let insulationMultiplier = 1;
    if (buildingParams.insulation === 'premium') {
      insulationMultiplier = 1.2;
    } else if (buildingParams.insulation === 'deluxe') {
      insulationMultiplier = 1.4;
    }
    
    // Стоимость окон
    let windowPrice = 10000 * buildingParams.windowsCount;
    if (buildingParams.windowType === 'sliding') {
      windowPrice *= 1.5;
    } else if (buildingParams.windowType === 'panoramic') {
      windowPrice *= 2;
    }
    
    // Стоимость фундамента
    let foundationPrice = 0;
    if (buildingParams.foundation === 'concrete') {
      foundationPrice = 50000;
    } else if (buildingParams.foundation === 'wooden') {
      foundationPrice = 30000;
    }
    
    // Стоимость дополнительных опций
    let optionsPrice = 0;
    if (buildingParams.ventilation) optionsPrice += 15000;
    if (buildingParams.electricity) optionsPrice += 20000;
    if (buildingParams.heating) optionsPrice += 30000;
    if (buildingParams.water) optionsPrice += 25000;
    
    // Стоимость мебели
    let furniturePrice = buildingParams.furniture.length * 15000;
    
    // Итоговая стоимость
    const totalPrice = (
      basePrice * area * finishMultiplier * roofMultiplier * insulationMultiplier + 
      windowPrice + 
      foundationPrice + 
      optionsPrice + 
      furniturePrice
    );
    
    return Math.round(totalPrice).toLocaleString('ru-RU');
  };
  
  // Обработчики изменений
  const handleDimensionChange = (dimension: 'width' | 'length' | 'height', value: number) => {
    setBuildingParams(prev => ({ ...prev, [dimension]: value }));
  };
  
  const handleRoofTypeChange = (type: string) => {
    setBuildingParams(prev => ({ ...prev, roofType: type }));
  };
  
  const handleDoorPositionChange = (position: string) => {
    setBuildingParams(prev => ({ ...prev, doorPosition: position }));
  };
  
  const handleWindowsCountChange = (count: number) => {
    setBuildingParams(prev => ({ ...prev, windowsCount: count }));
  };
  
  const handleFinishTypeChange = (type: string) => {
    setBuildingParams(prev => ({ ...prev, finishType: type }));
  };
  
  const handleOptionToggle = (option: string) => {
    setBuildingParams(prev => ({
      ...prev,
      [option]: !prev[option as keyof typeof prev]
    }));
  };
  
  const handleColorChange = (element: string, color: string) => {
    setBuildingParams(prev => ({ ...prev, [element]: color }));
  };
  
  const handleFurnitureToggle = (item: string) => {
    setBuildingParams(prev => ({
      ...prev,
      furniture: prev.furniture.includes(item)
        ? prev.furniture.filter(f => f !== item)
        : [...prev.furniture, item]
    }));
  };
  
  // Функции для работы с конфигурациями
  const saveConfig = () => {
    if (!currentConfigName.trim()) return;
    
    const newConfig = {
      id: Date.now(),
      name: currentConfigName,
      params: buildingParams,
      price: calculatePrice(),
      date: new Date().toISOString()
    };
    
    const updatedConfigs = [...savedConfigs, newConfig];
    setSavedConfigs(updatedConfigs);
    if (typeof window !== 'undefined') {
    localStorage.setItem('savedConfigs', JSON.stringify(updatedConfigs));
    }
    setCurrentConfigName("");
  };
  
  const loadConfig = (config: any) => {
    setBuildingParams(config.params);
  };
  
  const deleteConfig = (id: number) => {
    const updatedConfigs = savedConfigs.filter(c => c.id !== id);
    setSavedConfigs(updatedConfigs);
    if (typeof window !== 'undefined') {
    localStorage.setItem('savedConfigs', JSON.stringify(updatedConfigs));
    }
  };
  
  const resetConfig = () => {
    setBuildingParams({
      width: 2.4,
      length: 6,
      height: 2.5,
      roofType: "flat",
      doorPosition: "front",
      windowsCount: 2,
      finishType: "standard",
      options: [],
      wallColor: "#f0f0f0",
      roofColor: "#d0d0d0",
      doorColor: "#8b4513",
      windowType: "standard",
      insulation: "standard",
      foundation: "none",
      ventilation: false,
      electricity: false,
      heating: false,
      water: false,
      furniture: [],
      lighting: "natural",
      timeOfDay: "day",
      weather: "clear"
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Загрузка 3D конструктора...</h2>
          <p className="text-gray-500 mt-2">Подготавливаем все инструменты для проектирования</p>
        </div>
      </div>
    );
  }

  const optionsArr: string[] = [];
  if (buildingParams.ventilation) optionsArr.push('вентиляция');
  if (buildingParams.electricity) optionsArr.push('электричество');
  if (buildingParams.heating) optionsArr.push('отопление');
  if (buildingParams.water) optionsArr.push('вода');
  const waMessage = `Здравствуйте! Хочу заказать бытовку.\nРазмеры: ${buildingParams.width}×${buildingParams.length}×${buildingParams.height} м.\nПозвоните мне для уточнения деталей.`;
  const waHref = `https://wa.me/79188888824?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Верхняя панель */}
      {showTopPanel && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">3D Конструктор бытовок</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Home className="w-4 h-4" />
                <span>Проектирование</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Кнопки управления видом */}
              <Button variant="outline" size="sm" onClick={() => setShowLeftPanel(!showLeftPanel)}>
                {showLeftPanel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              
              <Button variant="outline" size="sm" onClick={resetConfig}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              {/* Кнопки действий */}
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Поделиться
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
              
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Левая панель с параметрами */}
        {showLeftPanel && (
          <div className="w-96 bg-white shadow-lg border-r border-gray-200 overflow-auto">
            <div className="p-6">
              {/* Вкладки */}
              <div className="flex border-b border-gray-200 mb-6">
                {[
                  { id: 'dimensions', label: 'Размеры', icon: Settings },
                  { id: 'materials', label: 'Материалы', icon: Palette },
                  { id: 'options', label: 'Опции', icon: Zap },
                  { id: 'furniture', label: 'Мебель', icon: Home },
                  { id: 'lighting', label: 'Освещение', icon: Sun }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Содержимое вкладок */}
              <div className="space-y-6">
                {activeTab === 'dimensions' && (
                  <div className="space-y-6">
                    {/* Размеры */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Размеры бытовки</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { key: 'width', label: 'Ширина', min: 2, max: 4, step: 0.1, unit: 'м' },
                          { key: 'length', label: 'Длина', min: 4, max: 12, step: 0.5, unit: 'м' },
                          { key: 'height', label: 'Высота', min: 2, max: 3, step: 0.1, unit: 'м' }
                        ].map(({ key, label, min, max, step, unit }) => (
                          <div key={key} className="bg-gray-50 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {label}
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                                min={min}
                                max={max}
                                step={step}
                                value={String(buildingParams[key as keyof typeof buildingParams])}
                                onChange={(e) => handleDimensionChange(key as any, parseFloat(e.target.value))}
                              />
                              <span className="text-sm text-gray-500">{unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Тип крыши */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Тип крыши</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'flat', label: 'Плоская', desc: 'Стандартная' },
                          { id: 'gable', label: 'Двускатная', desc: 'Классическая' }
                        ].map(({ id, label, desc }) => (
                          <button
                            key={id}
                            onClick={() => handleRoofTypeChange(id)}
                            className={`p-4 rounded-xl border-2 shadow-sm flex flex-col items-center transition-all duration-300 group hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
                              buildingParams.roofType === id
                                ? 'border-blue-600 bg-blue-50 text-blue-700 scale-105 shadow-lg'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                            }`}
                          >
                            <span className="text-xl font-bold mb-1">{label}</span>
                            <span className="text-xs text-gray-500">{desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Двери и окна */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Двери и окна</h3>
                      
                      {/* Положение двери */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Положение двери
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'front', label: 'Спереди' },
                            { id: 'back', label: 'Сзади' },
                            { id: 'left', label: 'Слева' },
                            { id: 'right', label: 'Справа' }
                          ].map(({ id, label }) => (
                            <button
                              key={id}
                              onClick={() => handleDoorPositionChange(id)}
                              className={`p-3 rounded-md text-sm font-medium transition-colors ${
                                buildingParams.doorPosition === id
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Количество окон */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Количество окон: {buildingParams.windowsCount}
                        </label>
                        <input
                          type="range"
                          className="w-full"
                          min="0"
                          max="6"
                          value={buildingParams.windowsCount}
                          onChange={(e) => handleWindowsCountChange(parseInt(e.target.value))}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0</span>
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                          <span>6</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div className="space-y-6">
                    {/* Тип отделки */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Тип отделки</h3>
                      <div className="space-y-3">
                        {[
                          { id: 'standard', label: 'Стандарт', price: '+0%', desc: 'Базовая отделка' },
                          { id: 'premium', label: 'Премиум', price: '+30%', desc: 'Улучшенные материалы' },
                          { id: 'deluxe', label: 'Делюкс', price: '+60%', desc: 'Элитная отделка' }
                        ].map(({ id, label, price, desc }) => (
                          <button
                            key={id}
                            onClick={() => handleFinishTypeChange(id)}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              buildingParams.finishType === id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-gray-800">{label}</div>
                                <div className="text-sm text-gray-500">{desc}</div>
                              </div>
                              <div className="text-sm font-medium text-blue-600">{price}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Утепление */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Утепление</h3>
                      <div className="space-y-3">
                        {[
                          { id: 'standard', label: 'Стандарт', desc: '50мм утеплитель' },
                          { id: 'premium', label: 'Премиум', desc: '100мм утеплитель' },
                          { id: 'deluxe', label: 'Делюкс', desc: '150мм утеплитель' }
                        ].map(({ id, label, desc }) => (
                          <button
                            key={id}
                            onClick={() => setBuildingParams(prev => ({ ...prev, insulation: id }))}
                            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                              buildingParams.insulation === id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium text-gray-800">{label}</div>
                            <div className="text-sm text-gray-500">{desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Фундамент */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Фундамент</h3>
                      <div className="space-y-3">
                        {[
                          { id: 'none', label: 'Без фундамента', desc: 'Установка на грунт' },
                          { id: 'wooden', label: 'Деревянный', desc: 'Брусовые опоры' },
                          { id: 'concrete', label: 'Бетонный', desc: 'Монолитная плита' }
                        ].map(({ id, label, desc }) => (
                          <button
                            key={id}
                            onClick={() => setBuildingParams(prev => ({ ...prev, foundation: id }))}
                            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                              buildingParams.foundation === id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium text-gray-800">{label}</div>
                            <div className="text-sm text-gray-500">{desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'options' && (
                  <div className="space-y-6">
                    {/* Коммуникации */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Коммуникации</h3>
                      <div className="space-y-3">
                        {[
                          { key: 'ventilation', label: 'Вентиляция', icon: Cloud, price: '15 000 ₽' },
                          { key: 'electricity', label: 'Электричество', icon: Zap, price: '20 000 ₽' },
                          { key: 'heating', label: 'Отопление', icon: Sun, price: '30 000 ₽' },
                          { key: 'water', label: 'Водоснабжение', icon: Droplets, price: '25 000 ₽' }
                        ].map(({ key, label, icon: Icon, price }) => (
                          <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 rounded border-gray-300"
                                checked={buildingParams[key as keyof typeof buildingParams] as boolean}
                                onChange={() => handleOptionToggle(key)}
                              />
                              <Icon className="w-5 h-5 text-gray-600" />
                              <span className="font-medium text-gray-800">{label}</span>
                            </div>
                            <span className="text-sm text-gray-500">{price}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'furniture' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Базовая мебель</h3>
                      <div className="space-y-3">
                        {[
                          { id: 'bed', label: 'Кровать', price: '15 000 ₽' },
                          { id: 'table', label: 'Стол', price: '12 000 ₽' },
                          { id: 'chair', label: 'Стул', price: '8 000 ₽' },
                          { id: 'wardrobe', label: 'Шкаф', price: '20 000 ₽' },
                          { id: 'kitchen', label: 'Кухонный гарнитур', price: '35 000 ₽' }
                        ].map(({ id, label, price }) => (
                          <label key={id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 rounded border-gray-300"
                                checked={buildingParams.furniture.includes(id)}
                                onChange={() => handleFurnitureToggle(id)}
                              />
                              <span className="font-medium text-gray-800">{label}</span>
                            </div>
                            <span className="text-sm text-gray-500">{price}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'lighting' && (
                  <div className="space-y-6">
                    {/* Время суток */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Время суток</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'day', label: 'День', icon: Sun },
                          { id: 'night', label: 'Ночь', icon: Moon },
                          { id: 'sunset', label: 'Закат', icon: Sun }
                        ].map(({ id, label, icon: Icon }) => (
                          <button
                            key={id}
                            onClick={() => setBuildingParams(prev => ({ ...prev, timeOfDay: id }))}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              buildingParams.timeOfDay === id
                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-medium">{label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Погода */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Погодные условия</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'clear', label: 'Ясно', icon: Sun },
                          { id: 'rain', label: 'Дождь', icon: CloudRain },
                          { id: 'snow', label: 'Снег', icon: CloudSnow }
                        ].map(({ id, label, icon: Icon }) => (
                          <button
                            key={id}
                            onClick={() => setBuildingParams(prev => ({ ...prev, weather: id }))}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              buildingParams.weather === id
                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-medium">{label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Итоговая стоимость */}
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Итого:</h3>
                  <div className="text-2xl font-bold">{calculatePrice()} ₽</div>
                </div>
                <p className="text-blue-100 text-sm">С учетом доставки и установки</p>
                
                <div className="mt-4 space-y-2">
                  <Button
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold mb-2"
                    onClick={() => {
                      window.open(waHref, '_blank');
                    }}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Оформить заказ
                  </Button>
                  <Button
                    className="w-full bg-gray-100 text-blue-600 hover:bg-blue-50 font-semibold mb-2"
                    onClick={async () => {
                      const img = await captureScreenshot();
                      setScreenshot(img);
                      alert('Скриншот проекта готов! Теперь вы можете отправить заказ с изображением.');
                    }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Скриншот проекта
                  </Button>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <Button
                      type="button"
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md mt-2"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                      Заказать в WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Главная область с 3D редактором */}
        <div className="flex-1 relative">
          <Editor3D onConfigChange={setConfig} buildingParams={buildingParams} />
        </div>

        {/* Правая панель с сохраненными конфигурациями */}
        {showRightPanel && (
          <div className="w-80 bg-white shadow-lg border-l border-gray-200 overflow-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Сохраненные проекты</h3>
              
              {/* Сохранение новой конфигурации */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  placeholder="Название проекта"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm mb-3"
                  value={currentConfigName}
                  onChange={(e) => setCurrentConfigName(e.target.value)}
                />
                <Button 
                  onClick={saveConfig}
                  disabled={!currentConfigName.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить проект
                </Button>
              </div>

              {/* Список сохраненных конфигураций */}
              <div className="space-y-3">
                {savedConfigs.map((config) => (
                  <div key={config.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{config.name}</h4>
                      <button
                        onClick={() => deleteConfig(config.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Удалить
                      </button>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {formatDate(config.date)}
                    </div>
                    <div className="text-lg font-bold text-blue-600 mb-3">
                      {config.price} ₽
                    </div>
                    <Button
                      onClick={() => loadConfig(config)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Загрузить
                    </Button>
                  </div>
                ))}
                
                {savedConfigs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Нет сохраненных проектов</p>
                    <p className="text-sm">Создайте и сохраните свой первый проект</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

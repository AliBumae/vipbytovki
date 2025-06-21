"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ALL_BUILDING_MODELS, BYTOVKA_MODELS, HOZBLOK_MODELS, getModelById, calculatePrice } from "@/lib/buildingModels";
import ModelDetailsModal from "./ModelDetailsModal";
import { Home, Ruler, ArrowUpDown, DoorOpen, Wind, Layers, Paintbrush, Plus, Minus } from "lucide-react";

interface ControlPanelProps {
  onConfigChange?: (config: any) => void;
  viewMode?: "exterior" | "interior";
}

// Будем использовать модели из lib/buildingModels.ts

// Доступные материалы отделки
const MATERIALS = [
  { id: "standard", name: "Стандарт", priceModifier: 1 },
  { id: "premium", name: "Премиум", priceModifier: 1.5 },
  { id: "deluxe", name: "Делюкс", priceModifier: 2 },
];

// Доступные опции
const OPTIONS = [
  { id: "electricity", name: "Электричество", price: 15000 },
  { id: "heating", name: "Отопление", price: 25000 },
  { id: "furniture", name: "Базовая мебель", price: 35000 },
  { id: "plumbing", name: "Водоснабжение", price: 30000 },
  { id: "extra_windows", name: "Дополнительные окна", price: 18000 },
  { id: "panoramic_windows", name: "Панорамные окна", price: 40000 },
  { id: "bed", name: "Кровать", price: 20000 }
];

// Доступные положения двери
const DOOR_POSITIONS = [
  { id: "front", name: "Спереди" },
  { id: "back", name: "Сзади" },
  { id: "left", name: "Слева" },
  { id: "right", name: "Справа" },
];

// Доступные типы крыши
const ROOF_TYPES = [
  { id: "flat", name: "Плоская" },
  { id: "gable", name: "Двускатная" },
  { id: "hip", name: "Четырехскатная" },
];

// Доступные типы окон
const WINDOW_TYPES = [
  { id: "standard", name: "Стандартные" },
  { id: "sliding", name: "Раздвижные" },
  { id: "panoramic", name: "Панорамные" },
];

// Доступные цвета отделки
const EXTERIOR_COLORS = [
  { id: "#f0f0f0", name: "Белый" },
  { id: "#f5f5dc", name: "Бежевый" },
  { id: "#dcdcdc", name: "Светло-серый" },
  { id: "#a0a0a0", name: "Серый" },
  { id: "#d2b48c", name: "Коричневый" },
  { id: "#8fbc8f", name: "Зеленый" },
];

export default function ControlPanel({ onConfigChange, viewMode = "exterior" }: ControlPanelProps) {
  const [buildingType, setBuildingType] = useState<'bytovka' | 'hozblok'>('bytovka');
  const [selectedModelId, setSelectedModelId] = useState(BYTOVKA_MODELS[0].id);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedDoorPosition, setSelectedDoorPosition] = useState(DOOR_POSITIONS[0]);
  const [selectedRoofType, setSelectedRoofType] = useState(ROOF_TYPES[0]);
  const [selectedWindowType, setSelectedWindowType] = useState(WINDOW_TYPES[0]);
  const [selectedExteriorColor, setSelectedExteriorColor] = useState(EXTERIOR_COLORS[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // Состояния для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalModel, setModalModel] = useState<typeof ALL_BUILDING_MODELS[0] | null>(null);
  
  // Локальное состояние для размеров
  const [dimensions, setDimensions] = useState({
    width: 0,
    length: 0,
    height: 0,
  });
  
  // Добавим локальное состояние для управления дверью и окнами
  const [doorOpen, setDoorOpen] = useState(false);
  const [windowsOpen, setWindowsOpen] = useState(false);
  
  // Получаем выбранную модель по ID
  const selectedModel = getModelById(selectedModelId) || BYTOVKA_MODELS[0];
  
  // Отфильтрованные модели в зависимости от выбранного типа (бытовка или хозблок)
  const filteredModels = ALL_BUILDING_MODELS.filter(model => model.type === buildingType);
  
  // Эффект для установки значений по умолчанию при изменении модели
  useEffect(() => {
    if (selectedModel) {
      // Установка типа крыши по умолчанию
      const defaultRoofType = ROOF_TYPES.find(rt => rt.id === selectedModel.defaultRoofType) || ROOF_TYPES[0];
      setSelectedRoofType(defaultRoofType);
      
      // Установка материала по умолчанию
      const defaultMaterial = MATERIALS.find(m => m.id === selectedModel.category) || MATERIALS[0];
      setSelectedMaterial(defaultMaterial);
      
      // Установка положения двери по умолчанию
      const defaultDoorPosition = DOOR_POSITIONS.find(dp => dp.id === selectedModel.defaultDoorPosition) || DOOR_POSITIONS[0];
      setSelectedDoorPosition(defaultDoorPosition);
    }
  }, [selectedModelId]);
  
  // Эффект для обновления локального состояния размеров при изменении модели
  useEffect(() => {
    setDimensions({
      width: selectedModel.dimensions.width,
      length: selectedModel.dimensions.length,
      height: selectedModel.dimensions.height,
    });
  }, [selectedModelId]);
  
  // Базовая цена модели
  const basePrice = selectedModel.basePrice;
  
  // Модификатор цены в зависимости от материала
  const materialPrice = basePrice * selectedMaterial.priceModifier;
  
  // Дополнительная цена за опции
  const optionsPrice = OPTIONS
    .filter(option => selectedOptions.includes(option.id))
    .reduce((sum, option) => sum + option.price, 0);
  
  // Итоговая цена
  const totalPrice = materialPrice + optionsPrice;

  const handleModelChange = (model: typeof ALL_BUILDING_MODELS[0]) => {
    setSelectedModelId(model.id);
    if (onConfigChange) {
      onConfigChange({ 
        model: model.id, 
        material: selectedMaterial.id, 
        options: selectedOptions,
        dimensions: model.dimensions,
        price: {
          base: basePrice,
          material: materialPrice,
          options: optionsPrice,
          total: totalPrice
        }
      });
    }
  };

  const handleMaterialChange = (material: typeof MATERIALS[0]) => {
    setSelectedMaterial(material);
    if (onConfigChange) {
      onConfigChange({ 
        model: selectedModel.id, 
        material: material.id, 
        options: selectedOptions,
        dimensions: selectedModel.dimensions,
        price: {
          base: basePrice,
          material: materialPrice,
          options: optionsPrice,
          total: totalPrice
        }
      });
    }
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => {
      const newOptions = prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId];
        
      if (onConfigChange) {
        onConfigChange({ 
          model: selectedModel.id, 
          material: selectedMaterial.id, 
          options: newOptions,
          dimensions: selectedModel.dimensions,
          furniture: newOptions.filter(id => ["furniture", "bed"].includes(id)),
          price: {
            base: basePrice,
            material: materialPrice,
            options: optionsPrice,
            total: totalPrice
          }
        });
      }
      
      return newOptions;
    });
  };

  const handleDoorPositionChange = (position: typeof DOOR_POSITIONS[0]) => {
    setSelectedDoorPosition(position);
    if (onConfigChange) {
      onConfigChange({ 
        model: selectedModel.id, 
        material: selectedMaterial.id, 
        options: selectedOptions,
        dimensions: selectedModel.dimensions,
        price: {
          base: basePrice,
          material: materialPrice,
          options: optionsPrice,
          total: totalPrice
        },
        doorPosition: position.id
      });
    }
  };

  const handleRoofTypeChange = (type: typeof ROOF_TYPES[0]) => {
    setSelectedRoofType(type);
    if (onConfigChange) {
      onConfigChange({ 
        model: selectedModel.id, 
        material: selectedMaterial.id, 
        options: selectedOptions,
        dimensions: selectedModel.dimensions,
        price: {
          base: basePrice,
          material: materialPrice,
          options: optionsPrice,
          total: totalPrice
        },
        roofType: type.id
      });
    }
  };

  const handleWindowTypeChange = (type: typeof WINDOW_TYPES[0]) => {
    setSelectedWindowType(type);
    if (onConfigChange) {
      onConfigChange({ 
        model: selectedModel.id, 
        material: selectedMaterial.id, 
        options: selectedOptions,
        dimensions: selectedModel.dimensions,
        windowType: type.id,
        price: {
          base: basePrice,
          material: materialPrice,
          options: optionsPrice,
          total: totalPrice
        }
      });
    }
  };

  const handleExteriorColorChange = (color: typeof EXTERIOR_COLORS[0]) => {
    setSelectedExteriorColor(color);
    if (onConfigChange) {
      onConfigChange({ 
        model: selectedModel.id, 
        material: selectedMaterial.id, 
        options: selectedOptions,
        dimensions: selectedModel.dimensions,
        exteriorColor: color.id,
        price: {
          base: basePrice,
          material: materialPrice,
          options: optionsPrice,
          total: totalPrice
        }
      });
    }
  };

  // Обработчик изменения типа здания
  const handleBuildingTypeChange = (type: 'bytovka' | 'hozblok') => {
    setBuildingType(type);
    // Устанавливаем первую модель из выбранного типа
    const firstModelOfType = ALL_BUILDING_MODELS.find(model => model.type === type);
    if (firstModelOfType) {
      setSelectedModelId(firstModelOfType.id);
    }
  };

  // Эффект для обновления конфигурации при изменении типа здания
  useEffect(() => {
    if (onConfigChange) {
      onConfigChange({
        buildingType,
        model: selectedModel.id, 
        material: selectedMaterial.id, 
        options: selectedOptions,
        dimensions: selectedModel.dimensions,
        price: {
          base: basePrice,
          material: materialPrice,
          options: optionsPrice,
          total: totalPrice
        }
      });
    }
  }, [buildingType]);
  
  // Функция для открытия модального окна с подробной информацией
  const showModelDetails = (model: typeof ALL_BUILDING_MODELS[0]) => {
    console.log("Показываю детали модели:", model.name);
    setModalModel(model);
    setIsModalOpen(true);
  };

  const handleDimensionChange = (key: 'width' | 'length' | 'height', value: number) => {
    setDimensions(prev => ({ ...prev, [key]: value }));
    if (onConfigChange) {
      onConfigChange({
        ...selectedModel,
        dimensions: { ...dimensions, [key]: value },
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-2xl animate-fade-in-up transition-all duration-500">
      {/* Переключатель типа здания */}
      <div className="mb-6 flex gap-4">
        <Button
          variant={buildingType === 'bytovka' ? "default" : "outline"}
          onClick={() => handleBuildingTypeChange('bytovka')}
          className={`flex-1 py-3 text-base font-semibold transition-all duration-300 ${buildingType === 'bytovka' ? 'ring-2 ring-blue-400/30 scale-105 shadow-lg' : 'hover:scale-105'}`}
        >
          Бытовка
        </Button>
        <Button
          variant={buildingType === 'hozblok' ? "default" : "outline"}
          onClick={() => handleBuildingTypeChange('hozblok')}
          className={`flex-1 py-3 text-base font-semibold transition-all duration-300 ${buildingType === 'hozblok' ? 'ring-2 ring-blue-400/30 scale-105 shadow-lg' : 'hover:scale-105'}`}
        >
          Хозблок
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Размеры */}
        <div className="bg-purple-50 rounded-xl p-4 shadow-md animate-fade-in-up transition-all duration-500">
          <h3 className="font-bold mb-3 text-purple-900 flex items-center gap-2"><Ruler className="w-5 h-5 text-purple-500"/>Размеры бытовки</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Ширина', key: 'width', min: 2, max: 4, step: 0.1, icon: <ArrowUpDown className='w-4 h-4 text-purple-400'/> },
              { label: 'Длина', key: 'length', min: 3, max: 12, step: 0.5, icon: <ArrowUpDown className='w-4 h-4 text-purple-400'/> },
              { label: 'Высота', key: 'height', min: 2, max: 3, step: 0.1, icon: <ArrowUpDown className='w-4 h-4 text-purple-400'/> },
            ].map(dim => (
              <div key={dim.key} className="flex items-center gap-2">
                <span className="w-5 flex-shrink-0">{dim.icon}</span>
                <span className="w-16 text-sm text-gray-700">{dim.label}</span>
                <button
                  className="p-1 rounded-full bg-white border shadow hover:bg-purple-100 active:scale-90 transition-all duration-200"
                  onClick={() => handleDimensionChange(dim.key as any, Math.max(dim.min, (dimensions[dim.key as 'width' | 'length' | 'height'] || 0) - dim.step))}
                >
                  <Minus className="w-4 h-4 text-purple-500" />
                </button>
                <span className="w-10 text-center font-bold text-lg animate-fade-in-up transition-all duration-300">{dimensions[dim.key as 'width' | 'length' | 'height']}</span>
                <button
                  className="p-1 rounded-full bg-white border shadow hover:bg-purple-100 active:scale-90 transition-all duration-200"
                  onClick={() => handleDimensionChange(dim.key as any, Math.min(dim.max, (dimensions[dim.key as 'width' | 'length' | 'height'] || 0) + dim.step))}
                >
                  <Plus className="w-4 h-4 text-purple-500" />
                </button>
                <span className="text-xs text-gray-400 ml-1">м</span>
              </div>
            ))}
          </div>
        </div>
        {/* Модели */}
        <div className="bg-blue-50 rounded-xl p-4 shadow-md animate-fade-in-up transition-all duration-500">
          <h3 className="font-bold mb-3 text-blue-900 flex items-center gap-2"><Home className="w-5 h-5 text-blue-500"/>Модель</h3>
          <div className="flex flex-col gap-2">
            {filteredModels.map(model => (
              <div key={model.id} className={`rounded-lg p-2 transition-all duration-300 ${selectedModel.id === model.id ? 'bg-blue-100 ring-2 ring-blue-400/30 scale-105 shadow' : 'hover:bg-blue-100 hover:scale-105'}`}>
                <div className="flex justify-between items-center mb-1">
                  <Button
                    variant={selectedModel.id === model.id ? "default" : "outline"}
                    onClick={() => handleModelChange(model)}
                    className="w-full justify-start text-sm font-medium"
                  >
                    {model.name} ({model.dimensions.width}×{model.dimensions.length}м)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => showModelDetails(model)}
                    className="ml-2 whitespace-nowrap"
                  >
                    Подробнее
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Материалы */}
        <div className="bg-green-50 rounded-xl p-4 shadow-md animate-fade-in-up transition-all duration-500">
          <h3 className="font-bold mb-3 text-green-900 flex items-center gap-2"><Layers className="w-5 h-5 text-green-500"/>Материал отделки</h3>
          <div className="flex flex-col gap-2">
            {MATERIALS.map(material => (
              <Button
                key={material.id}
                variant={selectedMaterial.id === material.id ? "default" : "outline"}
                onClick={() => handleMaterialChange(material)}
                className={`justify-start text-sm font-medium transition-all duration-300 ${selectedMaterial.id === material.id ? 'ring-2 ring-green-400/30 scale-105 shadow' : 'hover:scale-105'}`}
              >
                {material.name}
              </Button>
            ))}
          </div>
        </div>
        {/* Опции */}
        <div className="bg-yellow-50 rounded-xl p-4 shadow-md animate-fade-in-up transition-all duration-500">
          <h3 className="font-bold mb-3 text-yellow-900 flex items-center gap-2"><Paintbrush className="w-5 h-5 text-yellow-500"/>Дополнительные опции</h3>
          <div className="flex flex-col gap-2">
            {OPTIONS.map(option => (
              <Button
                key={option.id}
                variant={selectedOptions.includes(option.id) ? "default" : "outline"}
                onClick={() => handleOptionToggle(option.id)}
                className={`justify-start text-sm font-medium transition-all duration-300 ${selectedOptions.includes(option.id) ? 'ring-2 ring-yellow-400/30 scale-105 shadow' : 'hover:scale-105'}`}
              >
                {option.name} (+{(option.price).toLocaleString()} ₽)
              </Button>
            ))}
          </div>
        </div>
        {/* Положение двери */}
        <div className="bg-indigo-50 rounded-xl p-4 shadow-md animate-fade-in-up transition-all duration-500">
          <h3 className="font-bold mb-3 text-indigo-900 flex items-center gap-2"><DoorOpen className="w-5 h-5 text-indigo-500"/>Положение двери</h3>
          <div className="flex flex-col gap-2">
            {DOOR_POSITIONS.map(position => (
              <Button
                key={position.id}
                variant={selectedDoorPosition.id === position.id ? "default" : "outline"}
                onClick={() => handleDoorPositionChange(position)}
                className={`justify-start text-sm font-medium transition-all duration-300 ${selectedDoorPosition.id === position.id ? 'ring-2 ring-indigo-400/30 scale-105 shadow' : 'hover:scale-105'}`}
              >
                {position.name}
              </Button>
            ))}
          </div>
        </div>
        {/* Тип крыши */}
        <div className="bg-pink-50 rounded-xl p-4 shadow-md animate-fade-in-up transition-all duration-500">
          <h3 className="font-bold mb-3 text-pink-900 flex items-center gap-2"><ArrowUpDown className="w-5 h-5 text-pink-500"/>Тип крыши</h3>
          <div className="flex flex-col gap-2">
            {ROOF_TYPES.map(type => (
              <Button
                key={type.id}
                variant={selectedRoofType.id === type.id ? "default" : "outline"}
                onClick={() => handleRoofTypeChange(type)}
                className={`justify-start text-sm font-medium transition-all duration-300 ${selectedRoofType.id === type.id ? 'ring-2 ring-pink-400/30 scale-105 shadow' : 'hover:scale-105'}`}
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>
        {/* Тип окон */}
        <div className="bg-cyan-50 rounded-xl p-4 shadow-md animate-fade-in-up transition-all duration-500">
          <h3 className="font-bold mb-3 text-cyan-900 flex items-center gap-2"><Wind className="w-5 h-5 text-cyan-500"/>Тип окон</h3>
          <div className="flex flex-col gap-2">
            {WINDOW_TYPES.map(type => (
              <Button
                key={type.id}
                variant={selectedWindowType.id === type.id ? "default" : "outline"}
                onClick={() => handleWindowTypeChange(type)}
                className={`justify-start text-sm font-medium transition-all duration-300 ${selectedWindowType.id === type.id ? 'ring-2 ring-cyan-400/30 scale-105 shadow' : 'hover:scale-105'}`}
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>
        {/* Цвет отделки */}
        <div className="bg-gray-50 rounded-xl p-4 shadow-md animate-fade-in-up transition-all duration-500">
          <h3 className="font-bold mb-3 text-gray-900">Цвет отделки</h3>
          <div className="flex flex-col gap-2">
            {EXTERIOR_COLORS.map(color => (
              <Button
                key={color.id}
                variant={selectedExteriorColor.id === color.id ? "default" : "outline"}
                onClick={() => handleExteriorColorChange(color)}
                className={`justify-start text-sm font-medium transition-all duration-300 ${selectedExteriorColor.id === color.id ? 'ring-2 ring-gray-400/30 scale-105 shadow' : 'hover:scale-105'}`}
                style={{ backgroundColor: selectedExteriorColor.id === color.id ? undefined : color.id }}
              >
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.id }}></div>
                {color.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Управление дверью и окнами */}
      <div className="bg-yellow-50 rounded-xl p-4 shadow-md animate-fade-in-up transition-all duration-500 mb-4 flex gap-4 items-center justify-center">
        <Button
          variant="outline"
          onClick={() => {
            setDoorOpen((prev) => {
              const next = !prev;
              onConfigChange && onConfigChange({ doorOpen: next });
              return next;
            });
          }}
          className="flex items-center gap-2 px-4 py-2 text-base font-semibold"
        >
          <DoorOpen className="w-5 h-5 text-yellow-600" />
          {doorOpen ? 'Закрыть дверь' : 'Открыть дверь'}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setWindowsOpen((prev) => {
              const next = !prev;
              onConfigChange && onConfigChange({ windowsOpen: next });
              return next;
            });
          }}
          className="flex items-center gap-2 px-4 py-2 text-base font-semibold"
        >
          <Wind className="w-5 h-5 text-blue-600" />
          {windowsOpen ? 'Закрыть окна' : 'Открыть окна'}
        </Button>
      </div>
      {/* Итоговая цена */}
      <div className="mt-6 pt-6 border-t animate-fade-in-up transition-all duration-500">
        <div className="flex justify-between text-base font-semibold mb-2">
          <span>Базовая стоимость:</span>
          <span>{Math.round(basePrice).toLocaleString()} ₽</span>
        </div>
        <div className="flex justify-between text-base font-semibold mb-2">
          <span>Материалы:</span>
          <span>x{selectedMaterial.priceModifier}</span>
        </div>
        <div className="flex justify-between text-base font-semibold mb-2">
          <span>Опции:</span>
          <span>+{Math.round(optionsPrice).toLocaleString()} ₽</span>
        </div>
        <div className="flex justify-between font-bold text-2xl mt-4 text-blue-700 animate-fade-in-up transition-all duration-500">
          <span>Итого:</span>
          <span>{Math.round(totalPrice).toLocaleString()} ₽</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button className="w-full py-3 text-base font-bold shadow-md hover:scale-105 transition-all duration-300" size="lg">
            Заказать {buildingType === 'bytovka' ? 'бытовку' : 'хозблок'}
          </Button>
          <Button 
            variant="outline"
            className="w-full py-3 text-base font-bold hover:scale-105 transition-all duration-300" 
            size="lg"
            onClick={() => {
              // Генерация PDF с спецификацией
              alert("Спецификация сохранена в PDF!");
            }}
          >
            Скачать спецификацию
          </Button>
        </div>
      </div>
      {/* Модальное окно с деталями модели */}
      {modalModel && (
        <ModelDetailsModal
          model={modalModel}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleModelChange}
        />
      )}
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { BuildingModel } from "@/lib/buildingModels";

interface ModelDetailsModalProps {
  model: BuildingModel;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (model: BuildingModel) => void;
}

export default function ModelDetailsModal({ model, isOpen, onClose, onSelect }: ModelDetailsModalProps) {
  if (!isOpen) return null;

  // Маппинг опций на русские названия
  const optionLabels: Record<string, string> = {
    'electricity': 'Электричество',
    'heating': 'Отопление',
    'furniture': 'Базовая мебель',
    'plumbing': 'Водоснабжение',
    'extra_windows': 'Дополнительные окна',
    'panoramic_windows': 'Панорамные окна',
    'bed': 'Кровать'
  };

  // Получаем русское название позиции двери
  const getDoorPositionName = (pos: string): string => {
    switch (pos) {
      case 'front': return 'Спереди';
      case 'back': return 'Сзади';
      case 'left': return 'Слева';
      case 'right': return 'Справа';
      default: return pos;
    }
  };

  // Получаем русское название категории
  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'standard': return 'Стандарт';
      case 'premium': return 'Премиум';
      case 'deluxe': return 'Делюкс';
      default: return category;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0}}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        style={{position: 'relative', zIndex: 10000}}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{model.name}</h2>
            <Button 
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full h-8 w-8 p-0 flex items-center justify-center"
            >
              ✕
            </Button>
          </div>
          
          {model.previewImage && (
            <div className="mb-4">
              <img src={model.previewImage} alt={model.name} className="w-full h-auto rounded-lg" />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Описание</h3>
              <p className="text-gray-700 mb-4">{model.description}</p>
              
              <h3 className="font-bold mb-2">Характеристики</h3>
              <ul className="space-y-2 text-gray-700">
                <li><span className="font-medium">Тип:</span> {model.type === 'bytovka' ? 'Бытовка' : 'Хозблок'}</li>
                <li><span className="font-medium">Категория:</span> {getCategoryName(model.category)}</li>
                <li><span className="font-medium">Размеры:</span> {model.dimensions.width} × {model.dimensions.length} × {model.dimensions.height} м</li>
                <li><span className="font-medium">Площадь:</span> {(model.dimensions.width * model.dimensions.length).toFixed(1)} м²</li>
                <li><span className="font-medium">Количество окон:</span> {model.defaultWindows}</li>
                <li><span className="font-medium">Положение двери:</span> {getDoorPositionName(model.defaultDoorPosition)}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Доступные опции</h3>
              <ul className="space-y-2 text-gray-700">
                {model.availableOptions.map(option => (
                  <li key={option}>{optionLabels[option] || option}</li>
                ))}
              </ul>
              
              <div className="mt-6">
                <h3 className="font-bold mb-2">Цена</h3>
                <p className="text-2xl font-bold text-green-600">{model.basePrice.toLocaleString()} ₽</p>
                <p className="text-sm text-gray-500">Базовая стоимость без учета дополнительных опций</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button 
              variant="outline"
              onClick={onClose}
            >
              Закрыть
            </Button>
            <Button 
              onClick={() => {
                onSelect(model);
                onClose();
              }}
            >
              Выбрать эту модель
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

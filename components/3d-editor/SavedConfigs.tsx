"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useSavedConfigs, BuildingConfig } from '@/lib/savedConfigs';

interface SavedConfigsProps {
  onLoadConfig: (config: any) => void;
  currentConfig: any;
}

export default function SavedConfigs({ onLoadConfig, currentConfig }: SavedConfigsProps) {
  const { configs, saveConfig, deleteConfig } = useSavedConfigs();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [configName, setConfigName] = useState('');
  
  // Обработчик сохранения текущей конфигурации
  const handleSaveConfig = () => {
    if (!showSaveDialog) {
      setShowSaveDialog(true);
      return;
    }
    
    if (configName.trim() || confirm('Сохранить без имени?')) {
      saveConfig(currentConfig, configName);
      setShowSaveDialog(false);
      setConfigName('');
    }
  };
  
  // Обработчик загрузки конфигурации
  const handleLoadConfig = (config: BuildingConfig) => {
    if (confirm(`Загрузить конфигурацию "${config.name}"?`)) {
      onLoadConfig(config.config);
    }
  };
  
  // Обработчик удаления конфигурации
  const handleDeleteConfig = (id: string, name: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (confirm(`Удалить конфигурацию "${name}"?`)) {
      deleteConfig(id);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="font-bold mb-4">Сохраненные конфигурации</h3>
      
      {/* Форма сохранения */}
      <div className="mb-4 flex items-center gap-2">
        {showSaveDialog ? (
          <>
            <input
              type="text"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              placeholder="Название конфигурации"
              className="flex-1 p-2 border rounded"
            />
            <Button 
              onClick={handleSaveConfig}
              className="whitespace-nowrap"
            >
              Сохранить
            </Button>
            <Button 
              onClick={() => setShowSaveDialog(false)}
              variant="outline"
            >
              Отмена
            </Button>
          </>
        ) : (
          <Button 
            onClick={handleSaveConfig}
            className="w-full"
          >
            Сохранить текущую конфигурацию
          </Button>
        )}
      </div>
      
      {/* Список сохраненных конфигураций */}
      {configs.length > 0 ? (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {configs.map((config) => (
            <div
              key={config.id}
              onClick={() => handleLoadConfig(config)}
              className="p-3 border rounded cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{config.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(config.date).toLocaleString()}
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => handleDeleteConfig(config.id, config.name, e)}
              >
                Удалить
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-4">
          У вас пока нет сохраненных конфигураций
        </div>
      )}
    </div>
  );
}

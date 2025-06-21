"use client";

import { useState, useEffect } from 'react';

// Типы для конфигурации бытовки
export interface BuildingConfig {
  id: string;
  name: string;
  date: string;
  config: any;
}

// Функция для сохранения конфигурации
export function saveConfig(config: any, name: string): BuildingConfig {
  // Получаем текущие сохраненные конфигурации
  const savedConfigs = getSavedConfigs();
  
  // Создаем новую конфигурацию
  const newConfig: BuildingConfig = {
    id: Math.random().toString(36).substring(2, 9),
    name: name || `Конфигурация от ${(typeof window !== 'undefined') ? new Date().toLocaleDateString() : ''}`,
    date: (typeof window !== 'undefined') ? new Date().toISOString() : '',
    config
  };
  
  // Добавляем новую конфигурацию к существующим
  savedConfigs.push(newConfig);
  
  // Сохраняем обновленный список конфигураций
  if (typeof window !== 'undefined') {
  localStorage.setItem('buildingConfigs', JSON.stringify(savedConfigs));
  }
  
  return newConfig;
}

// Функция для получения всех сохраненных конфигураций
export function getSavedConfigs(): BuildingConfig[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const savedConfigsJson = localStorage.getItem('buildingConfigs');
  if (!savedConfigsJson) {
    return [];
  }
  
  try {
    return JSON.parse(savedConfigsJson);
  } catch (error) {
    console.error('Ошибка при чтении сохраненных конфигураций:', error);
    return [];
  }
}

// Функция для загрузки конфигурации по ID
export function loadConfig(id: string): BuildingConfig | null {
  const savedConfigs = getSavedConfigs();
  return savedConfigs.find(config => config.id === id) || null;
}

// Функция для удаления конфигурации по ID
export function deleteConfig(id: string): boolean {
  const savedConfigs = getSavedConfigs();
  const updatedConfigs = savedConfigs.filter(config => config.id !== id);
  
  if (updatedConfigs.length !== savedConfigs.length) {
    localStorage.setItem('buildingConfigs', JSON.stringify(updatedConfigs));
    return true;
  }
  
  return false;
}

// Хук для работы с сохраненными конфигурациями
export function useSavedConfigs() {
  const [configs, setConfigs] = useState<BuildingConfig[]>([]);
  
  // Загружаем конфигурации при монтировании компонента
  useEffect(() => {
    setConfigs(getSavedConfigs());
  }, []);
  
  // Функция для обновления списка конфигураций
  const refreshConfigs = () => {
    setConfigs(getSavedConfigs());
  };
  
  return {
    configs,
    refreshConfigs,
    saveConfig: (config: any, name: string) => {
      saveConfig(config, name);
      refreshConfigs();
    },
    deleteConfig: (id: string) => {
      const result = deleteConfig(id);
      refreshConfigs();
      return result;
    }
  };
}

"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт для компонентов карты, чтобы избежать ошибок SSR
const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 flex items-center justify-center">Загрузка карты...</div>
});

interface SiteMapProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
}

export default function SiteMap({ onLocationSelect, initialLocation }: SiteMapProps) {
  const defaultLocation = { lat: 55.7558, lng: 37.6173 }; // Москва по умолчанию
  const [currentLocation, setCurrentLocation] = useState(initialLocation || defaultLocation);

  // Определяем текущее местоположение пользователя
  useEffect(() => {
    if (navigator.geolocation && !initialLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(userLocation);
        },
        (error) => {
          console.error("Ошибка получения местоположения:", error);
        }
      );
    }
  }, [initialLocation]);

  return (
    <div className="rounded-lg overflow-hidden">
      <MapWithNoSSR 
        onLocationSelect={onLocationSelect} 
        initialLocation={initialLocation} 
        defaultLocation={currentLocation}
      />
      <div className="bg-white p-2 text-sm">
        Нажмите на карту, чтобы разместить бытовку, или перетащите маркер для изменения положения.
      </div>
    </div>
  );
}

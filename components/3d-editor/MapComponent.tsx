"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationMarkerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

interface MapComponentProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
  defaultLocation: { lat: number; lng: number };
}

function LocationMarker({ onLocationSelect }: LocationMarkerProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    }
  });

  return position === null ? null : (
    <Marker 
      position={position}
      draggable={true}
    />
  );
}

export default function MapComponent({ onLocationSelect, initialLocation, defaultLocation }: MapComponentProps) {
  // Исправляем проблему с иконками Leaflet в Next.js
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="h-[300px]">
      <MapContainer
        center={[defaultLocation.lat, defaultLocation.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
        {initialLocation && <Marker position={[initialLocation.lat, initialLocation.lng]} />}
      </MapContainer>
    </div>
  );
}

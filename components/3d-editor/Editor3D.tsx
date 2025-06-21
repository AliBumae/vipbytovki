"use client";

import { Canvas } from "@react-three/fiber";
import { 
  Environment, 
  OrbitControls, 
  PerspectiveCamera, 
  OrthographicCamera,
  Stats,
  Grid,
  Sky,
  Stars
} from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";
import BuildingModel from "./BuildingModel";
import ControlPanel from "./ControlPanel";
import SavedConfigs from "./SavedConfigs";
import SiteMap from "./SiteMap";
import InteriorFurniture from "./InteriorFurniture";
import { 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Maximize2, 
  Camera, 
  Sun, 
  Moon, 
  Cloud as CloudIcon,
  CloudRain as CloudRainIcon,
  CloudSnow as CloudSnowIcon,
  Settings,
  Info,
  HelpCircle
} from "lucide-react";

interface Editor3DProps {
  onConfigChange?: (config: any) => void;
  buildingParams?: {
    width: number;
    length: number;
    height: number;
    roofType: string;
    doorPosition: string;
    windowsCount: number;
    finishType: string;
    options: string[];
    wallColor: string;
    roofColor: string;
    doorColor: string;
    windowType: string;
    insulation: string;
    foundation: string;
    ventilation: boolean;
    electricity: boolean;
    heating: boolean;
    water: boolean;
    furniture: string[];
    lighting: string;
    timeOfDay: string;
    weather: string;
  };
}

export default function Editor3D({ onConfigChange, buildingParams }: Editor3DProps) {
  // Основная конфигурация бытовки
  const [buildingConfig, setBuildingConfig] = useState({
    dimensions: { width: 2.4, length: 6, height: 2.5 },
    doorPosition: "front" as "front" | "back" | "left" | "right",
    windowsCount: 2,
    roofType: "flat" as "flat" | "gable" | "hip",
    exteriorColor: "#f0f0f0",
    roofColor: "#d0d0d0",
    doorColor: "#8b4513",
    // Новые параметры
    doorOpen: false,
    windowsOpen: false,
    interiorFurniture: [] as string[],
    wallTexture: "standard",
    floorTexture: "standard",
    roofTexture: "standard",
    windowType: "standard" as "standard" | "sliding" | "panoramic",
    lightsOn: false,
    windowPositions: {
      front: [],
      back: [],
      left: [],
      right: []
    },
    mapLocation: { lat: 55.7558, lng: 37.6173 }
  });
  
  // Настройки отображения
  const [viewSettings, setViewSettings] = useState({
    viewMode: "exterior" as "exterior" | "interior",
    cameraPosition: "free" as "free" | "front" | "back" | "left" | "right" | "top",
    cameraType: "perspective" as "perspective" | "orthographic",
    autoRotate: false,
    timeOfDay: "day" as "day" | "night" | "sunset",
    weather: "clear" as "clear" | "rain" | "snow",
    showLeftPanel: true,
    showRightPanel: true,
    showGrid: true,
    showStats: false,
    showInfo: false,
    showHelp: false
  });
  
  // Состояние для анимаций
  const [animations, setAnimations] = useState({
    doorAnimation: false,
    windowAnimation: false,
    lightAnimation: false,
    weatherAnimation: false
  });
  
  // Рефы для камеры и контролов
  const cameraRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  
  // Объект с текстурами
  const textures = {
    standard: {
      wall: '/textures/wall.jpg',
      roof: '/textures/roof.jpg',
      floor: '/textures/floor.jpg'
    },
    premium: {
      wall: '/textures/premium/wall_premium.jpg',
      roof: '/textures/premium/roof_premium.jpg',
      floor: '/textures/premium/floor_premium.jpg'
    },
    deluxe: {
      wall: '/textures/deluxe/wall_deluxe.jpg',
      roof: '/textures/deluxe/roof_deluxe.jpg',
      floor: '/textures/deluxe/floor_deluxe.jpg'
    }
  };
  
  // Обновляем конфигурацию при изменении параметров
  useEffect(() => {
    if (buildingParams) {
      setBuildingConfig(prev => ({
        ...prev,
        dimensions: {
          width: buildingParams.width,
          length: buildingParams.length,
          height: buildingParams.height,
        },
        doorPosition: buildingParams.doorPosition as any,
        windowsCount: buildingParams.windowsCount,
        roofType: buildingParams.roofType as any,
        exteriorColor: buildingParams.wallColor,
        roofColor: buildingParams.roofColor,
        doorColor: buildingParams.doorColor,
        windowType: buildingParams.windowType as any,
        interiorFurniture: buildingParams.furniture,
        lightsOn: buildingParams.electricity
      }));
      
      setViewSettings(prev => ({
        ...prev,
        timeOfDay: buildingParams.timeOfDay as any,
        weather: buildingParams.weather as any
      }));
    }
  }, [buildingParams]);
  
  // Обработчик изменения конфигурации
  const handleConfigChange = (config: any) => {
    const newConfig = {
      ...buildingConfig,
      ...config
    };
    
    setBuildingConfig(newConfig);
    
    if (onConfigChange) {
      onConfigChange({
        ...config,
        buildingConfig: newConfig
      });
    }
  };

  // Обработчик изменения настроек вида
  const handleViewSettingsChange = (settings: Partial<typeof viewSettings>) => {
    setViewSettings(prev => ({
      ...prev,
      ...settings
    }));
  };

  // Обработчики анимаций
  const toggleDoor = () => {
    setAnimations(prev => ({ ...prev, doorAnimation: !prev.doorAnimation }));
    setBuildingConfig(prev => ({
      ...prev,
      doorOpen: !prev.doorOpen
    }));
  };

  const toggleWindows = () => {
    setAnimations(prev => ({ ...prev, windowAnimation: !prev.windowAnimation }));
    setBuildingConfig(prev => ({
      ...prev,
      windowsOpen: !prev.windowsOpen
    }));
  };

  const toggleLights = () => {
    setAnimations(prev => ({ ...prev, lightAnimation: !prev.lightAnimation }));
    setBuildingConfig(prev => ({
      ...prev,
      lightsOn: !prev.lightsOn
    }));
  };

  // Получение позиции камеры
  const getCameraPosition = () => {
    const { width, length, height } = buildingConfig.dimensions;
    const maxDimension = Math.max(width, length, height);
    const distance = maxDimension * 3;
    
    switch (viewSettings.cameraPosition) {
      case "front":
        return [0, height * 0.7, distance] as [number, number, number];
      case "back":
        return [0, height * 0.7, -distance] as [number, number, number];
      case "left":
        return [-distance, height * 0.7, 0] as [number, number, number];
      case "right":
        return [distance, height * 0.7, 0] as [number, number, number];
      case "top":
        return [0, distance, 0] as [number, number, number];
      default:
        return [distance * 0.7, height * 0.7, distance * 0.7] as [number, number, number];
    }
  };

  // Получение настроек освещения
  const getLightingSettings = () => {
    switch (viewSettings.timeOfDay) {
      case "day":
        return {
          ambientIntensity: 0.6,
          directionalIntensity: 1.0,
          color: "#ffffff",
          skyColor: "#87CEEB"
        };
      case "night":
        return {
          ambientIntensity: 0.2,
          directionalIntensity: 0.1,
          color: "#1a1a2e",
          skyColor: "#0f0f23"
        };
      case "sunset":
        return {
          ambientIntensity: 0.4,
          directionalIntensity: 0.8,
          color: "#ff7f50",
          skyColor: "#ff6b6b"
        };
      default:
        return {
          ambientIntensity: 0.6,
          directionalIntensity: 1.0,
          color: "#ffffff",
          skyColor: "#87CEEB"
        };
    }
  };

  // Получение настроек погоды
  const getWeatherSettings = () => {
    switch (viewSettings.weather) {
      case "rain":
        return {
          particles: true,
          particleCount: 1000,
          particleColor: "#4a90e2",
          fog: true,
          fogDensity: 0.02
        };
      case "snow":
        return {
          particles: true,
          particleCount: 500,
          particleColor: "#ffffff",
          fog: true,
          fogDensity: 0.01
        };
      default:
        return {
          particles: false,
          particleCount: 0,
          particleColor: "#ffffff",
          fog: false,
          fogDensity: 0
        };
    }
  };

  const lightingSettings = getLightingSettings();
  const weatherSettings = getWeatherSettings();

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Верхняя панель управления */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Кнопки вида */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleViewSettingsChange({ cameraPosition: "front" })}
                  className={`p-2 rounded-lg transition-colors ${
                    viewSettings.cameraPosition === "front"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  title="Вид спереди"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleViewSettingsChange({ cameraPosition: "top" })}
                  className={`p-2 rounded-lg transition-colors ${
                    viewSettings.cameraPosition === "top"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  title="Вид сверху"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleViewSettingsChange({ autoRotate: !viewSettings.autoRotate })}
                  className={`p-2 rounded-lg transition-colors ${
                    viewSettings.autoRotate
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  title="Автоповорот"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="h-6 w-px bg-gray-300"></div>

              {/* Настройки времени суток */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'day', icon: Sun, label: 'День' },
                  { id: 'night', icon: Moon, label: 'Ночь' },
                  { id: 'sunset', icon: Sun, label: 'Закат' }
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => handleViewSettingsChange({ timeOfDay: id as any })}
                    className={`p-2 rounded-lg transition-colors ${
                      viewSettings.timeOfDay === id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title={label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              <div className="h-6 w-px bg-gray-300"></div>

              {/* Настройки погоды */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'clear', icon: Sun, label: 'Ясно' },
                  { id: 'rain', icon: CloudRainIcon, label: 'Дождь' },
                  { id: 'snow', icon: CloudSnowIcon, label: 'Снег' }
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => handleViewSettingsChange({ weather: id as any })}
                    className={`p-2 rounded-lg transition-colors ${
                      viewSettings.weather === id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title={label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Дополнительные настройки */}
              <button
                onClick={() => handleViewSettingsChange({ showGrid: !viewSettings.showGrid })}
                className={`p-2 rounded-lg transition-colors ${
                  viewSettings.showGrid
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="Сетка"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleViewSettingsChange({ showStats: !viewSettings.showStats })}
                className={`p-2 rounded-lg transition-colors ${
                  viewSettings.showStats
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="Статистика"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleViewSettingsChange({ showHelp: !viewSettings.showHelp })}
                className={`p-2 rounded-lg transition-colors ${
                  viewSettings.showHelp
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="Помощь"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: getCameraPosition(),
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="w-full h-full"
      >
        {/* Статистика производительности */}
        {viewSettings.showStats && <Stats />}

        {/* Освещение */}
        <ambientLight intensity={lightingSettings.ambientIntensity} color={lightingSettings.color} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={lightingSettings.directionalIntensity}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Небо */}
        {viewSettings.timeOfDay === "night" ? (
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        ) : (
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
            rayleigh={0.5}
            turbidity={10}
            mieCoefficient={0.005}
            mieDirectionalG={0.8}
          />
        )}

        {/* Погодные эффекты */}
        {weatherSettings.particles && (
          <group>
            {Array.from({ length: weatherSettings.particleCount }).map((_, i) => (
              <mesh
                key={i}
                position={[
                  (Math.random() - 0.5) * 20,
                  Math.random() * 10 + 5,
                  (Math.random() - 0.5) * 20
                ]}
              >
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color={weatherSettings.particleColor} transparent opacity={0.6} />
              </mesh>
            ))}
          </group>
        )}

        {/* Сетка */}
        {viewSettings.showGrid && (
          <Grid
            args={[20, 20]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6f6f6f"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#9d4b4b"
            fadeDistance={25}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={true}
          />
        )}

        {/* Модель здания */}
        <Suspense fallback={null}>
          <BuildingModel
            config={buildingConfig}
            texturesPaths={textures}
          />
        </Suspense>

        {/* Управление камерой */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={viewSettings.autoRotate}
          autoRotateSpeed={1}
          maxDistance={50}
          minDistance={2}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />

        {/* Окружение */}
        <Environment preset="sunset" />
      </Canvas>

      {/* Информационная панель */}
      {viewSettings.showInfo && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 max-w-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Информация о проекте</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div>Размеры: {buildingConfig.dimensions.width}×{buildingConfig.dimensions.length}×{buildingConfig.dimensions.height} м</div>
            <div>Площадь: {(buildingConfig.dimensions.width * buildingConfig.dimensions.length).toFixed(1)} м²</div>
            <div>Крыша: {buildingConfig.roofType}</div>
            <div>Окна: {buildingConfig.windowsCount} шт.</div>
            <div>Дверь: {buildingConfig.doorPosition}</div>
          </div>
        </div>
      )}

      {/* Панель помощи */}
      {viewSettings.showHelp && (
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 max-w-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Управление</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div>• ЛКМ + перетаскивание - поворот камеры</div>
            <div>• Колесо мыши - масштабирование</div>
            <div>• ПКМ + перетаскивание - панорамирование</div>
            <div>• Двойной клик - сброс камеры</div>
          </div>
        </div>
      )}
    </div>
  );
}

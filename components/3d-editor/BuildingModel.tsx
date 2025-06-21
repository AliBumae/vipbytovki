"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, useTexture } from "@react-three/drei";
import * as THREE from "three";
import InteriorFurniture from "./InteriorFurniture";

// Типы для текстур
interface TexturePaths {
  standard: {
    wall: string;
    roof: string;
    floor: string;
  };
  premium: {
    wall: string;
    roof: string;
    floor: string;
  };
  deluxe: {
    wall: string;
    roof: string;
    floor: string;
  };
}

// Типы для конфигурации
interface BuildingConfig {
  dimensions?: { width: number; length: number; height: number };
  doorPosition?: "front" | "back" | "left" | "right";
  windowsCount?: number;
  roofType?: "flat" | "gable" | "hip";
  exteriorColor?: string;
  roofColor?: string;
  doorOpen?: boolean;
  windowsOpen?: boolean;
  interiorFurniture?: string[];
  wallTexture?: string;
  floorTexture?: string;
  roofTexture?: string;
  windowType?: "standard" | "sliding" | "panoramic";
  lightsOn?: boolean;
  windowPositions?: {
    front: number[];
    back: number[];
    left: number[];
    right: number[];
  };
  viewMode?: "exterior" | "interior";
  timeOfDay?: "day" | "night";
  weather?: "clear" | "rain" | "snow";
  mapLocation?: { lat: number; lng: number };
}

// Расширенная модель бытовки
export default function BuildingModel({
  config = {
    dimensions: { width: 2.4, length: 6, height: 2.5 },
    doorPosition: "front", // front, back, left, right
    windowsCount: 2,
    roofType: "flat", // flat, gable, hip
    exteriorColor: "#f0f0f0",
    roofColor: "#d0d0d0",
    // Новые параметры
    doorOpen: false,
    windowsOpen: false,
    interiorFurniture: [],
    wallTexture: "standard",
    floorTexture: "standard",
    roofTexture: "standard",
    windowType: "standard",
    lightsOn: false,
    windowPositions: { front: [], back: [], left: [], right: [] },
    viewMode: "exterior",
    timeOfDay: "day",
    weather: "clear",
    mapLocation: { lat: 55.7558, lng: 37.6173 }
  },
  texturesPaths = {
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
  }
}: {
  config?: BuildingConfig;
  texturesPaths?: TexturePaths;
}) {
  const buildingRef = useRef<THREE.Group>(null);
  const roofRef = useRef<THREE.Group>(null);
  const dimensions = config.dimensions || {
    width: 2.4, // 2.4 метра - стандартная ширина
    length: 6, // 6 метров - стандартная длина
    height: 2.5, // 2.5 метра - стандартная высота
  };

  // Загрузка текстур с обработкой ошибок
  const [textures, setTextures] = useState<Record<string, THREE.Texture | null>>({
    walls: null,
    roof: null,
    floor: null,
    wallPremium: null,
    roofPremium: null,
    floorPremium: null,
    wallDeluxe: null,
    roofDeluxe: null,
    floorDeluxe: null,
  });

  // Анимация для двери и окон
  const doorRef = useRef<THREE.Group>(null);
  const windowRefs = useRef<(THREE.Group | null)[]>([]);
  // Состояния анимации
  const [doorAnim, setDoorAnim] = useState(0); // 0 - закрыта, 1 - открыта
  const [windowAnim, setWindowAnim] = useState(0); // 0 - закрыты, 1 - открыты

  useEffect(() => {
    // При изменении config.doorOpen/windowsOpen запускаем анимацию
    let doorTarget = config.doorOpen ? 1 : 0;
    let windowTarget = config.windowsOpen ? 1 : 0;
    let raf: number;
    function animate() {
      setDoorAnim((prev) => {
        if (Math.abs(prev - doorTarget) < 0.01) return doorTarget;
        return prev + (doorTarget - prev) * 0.15;
      });
      setWindowAnim((prev) => {
        if (Math.abs(prev - windowTarget) < 0.01) return windowTarget;
        return prev + (windowTarget - prev) * 0.15;
      });
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [config.doorOpen, config.windowsOpen]);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    // Загружаем текстуру стен
    const wallTexturePath = config.wallTexture && texturesPaths[config.wallTexture as keyof typeof texturesPaths]?.wall || '/textures/wall.jpg';
    textureLoader.load(
      wallTexturePath,
      (texture: THREE.Texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        setTextures((prev) => ({ ...prev, walls: texture }));
      },
      undefined,
      (err) => console.error('Ошибка загрузки текстуры стен:', err)
    );

    // Загружаем текстуру крыши
    const roofTexturePath = config.roofTexture && texturesPaths[config.roofTexture as keyof typeof texturesPaths]?.roof || '/textures/roof.jpg';
    textureLoader.load(
      roofTexturePath,
      (texture: THREE.Texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        setTextures((prev) => ({ ...prev, roof: texture }));
      },
      undefined,
      (err) => console.error('Ошибка загрузки текстуры крыши:', err)
    );

    // Загружаем текстуру пола
    const floorTexturePath = config.floorTexture && texturesPaths[config.floorTexture as keyof typeof texturesPaths]?.floor || '/textures/floor.jpg';
    textureLoader.load(
      floorTexturePath,
      (texture: THREE.Texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        setTextures((prev) => ({ ...prev, floor: texture }));
      },
      undefined,
      (err) => console.error('Ошибка загрузки текстуры пола:', err)
    );
  }, [config.wallTexture, config.roofTexture, config.floorTexture, texturesPaths]);

  useFrame(() => {
    // Анимация двери (вращение)
    if (doorRef.current) {
      doorRef.current.rotation.y = -Math.PI / 2 * doorAnim;
    }
    // Анимация окон (сдвиг)
    windowRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.position.x = (i % 2 === 0 ? 1 : -1) * (dimensions.width / 2 + 0.01 + 0.4 * windowAnim);
      }
    });
  });

  return (
    <group>
      {/* Основное здание бытовки */}
      <group ref={buildingRef} position={[0, dimensions.height / 2, 0]}>
        {/* Стены */}
        <Box args={[dimensions.width, dimensions.height, dimensions.length]} castShadow receiveShadow>
          <meshStandardMaterial 
            map={textures.walls || undefined}
            color={config.exteriorColor || "#f0f0f0"}
            roughness={0.7}
            metalness={0.1}
          />
        </Box>

        {/* Пол */}
        <Box 
          args={[dimensions.width - 0.1, 0.1, dimensions.length - 0.1]} 
          position={[0, -dimensions.height / 2 + 0.05, 0]}
          receiveShadow
        >
          <meshStandardMaterial 
            map={textures.floor || undefined}
            color="#8B4513" 
            roughness={0.8}
          />
        </Box>

        {/* Дверь */}
        <group
          ref={doorRef}
          position={[
            config.doorPosition === "left" ? -dimensions.width / 2 - 0.01 : 
            config.doorPosition === "right" ? dimensions.width / 2 + 0.01 : 0,
            -dimensions.height / 2 + 1,
            config.doorPosition === "front" ? dimensions.length / 2 + 0.01 :
            config.doorPosition === "back" ? -dimensions.length / 2 - 0.01 : 0
          ]}
          rotation={[0, 
            config.doorPosition === "front" ? 0 : 
            config.doorPosition === "back" ? Math.PI : 
            config.doorPosition === "left" ? -Math.PI / 2 : Math.PI / 2, 0]}
        >
          <Box 
            args={[0.9, 2, 0.05]} 
            position={[0, 0, 0]} 
            castShadow
          >
            <meshStandardMaterial color="#8B4513" />
          </Box>
        </group>

        {/* Окна - размещаем в зависимости от количества */}
        {Array.from({ length: config.windowsCount || 0 }).map((_, i) => (
          <group
            key={`window-${i}`}
            ref={el => windowRefs.current[i] = el}
            position={[
              i % 2 === 0 ? dimensions.width / 2 + 0.01 : -dimensions.width / 2 - 0.01,
              0,
              (i < 2 ? 1 : -1) * dimensions.length / 4
            ]}
            rotation={[0, i % 2 === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
          >
            <Box args={[0.8, 0.8, 0.05]} castShadow>
              <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
            </Box>
          </group>
        ))}
      </group>

      {/* Крыша в зависимости от типа */}
      {config.roofType === "flat" && (
        <Box
          ref={roofRef as unknown as React.RefObject<THREE.Mesh>}
          args={[dimensions.width + 0.2, 0.2, dimensions.length + 0.2]}
          position={[0, dimensions.height + 0.1, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={textures.roof || undefined}
            color={config.roofColor || "#d0d0d0"}
            roughness={0.6}
          />
        </Box>
      )}

      {config.roofType === "gable" && (
        <group position={[0, dimensions.height, 0]}>
          {/* Левый скат */}
          <mesh ref={roofRef as unknown as React.RefObject<THREE.Mesh>}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    -dimensions.width/2 - 0.2, 0, -dimensions.length/2 - 0.2,  // левый нижний передний
                    -dimensions.width/2 - 0.2, 0, dimensions.length/2 + 0.2,   // левый нижний задний
                    0, 0.8, dimensions.length/2 + 0.2,                         // верхний задний
                    -dimensions.width/2 - 0.2, 0, -dimensions.length/2 - 0.2,  // левый нижний передний
                    0, 0.8, -dimensions.length/2 - 0.2,                        // верхний передний
                    0, 0.8, dimensions.length/2 + 0.2                         // верхний задний
                  ]), 3
                ]}
              />
            </bufferGeometry>
            <meshStandardMaterial
              map={textures.roof || undefined}
              color={config.roofColor || "#d0d0d0"}
              side={THREE.DoubleSide}
              roughness={0.6}
            />
          </mesh>
          
          {/* Правый скат */}
          <mesh>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    dimensions.width/2 + 0.2, 0, -dimensions.length/2 - 0.2,   // правый нижний передний
                    dimensions.width/2 + 0.2, 0, dimensions.length/2 + 0.2,    // правый нижний задний
                    0, 0.8, dimensions.length/2 + 0.2,                         // верхний задний
                    dimensions.width/2 + 0.2, 0, -dimensions.length/2 - 0.2,   // правый нижний передний
                    0, 0.8, -dimensions.length/2 - 0.2,                        // верхний передний
                    0, 0.8, dimensions.length/2 + 0.2                         // верхний задний
                  ]), 3
                ]}
              />
            </bufferGeometry>
            <meshStandardMaterial
              map={textures.roof || undefined}
              color={config.roofColor || "#d0d0d0"}
              side={THREE.DoubleSide}
              roughness={0.6}
            />
          </mesh>
        </group>
      )}

      {config.roofType === "hip" && (
        <mesh
          position={[0, dimensions.height + 0.5, 0]}
          ref={roofRef as unknown as React.RefObject<THREE.Mesh>}
        >
          <coneGeometry args={[Math.max(dimensions.width, dimensions.length)/1.5, 1, 4]} />
          <meshStandardMaterial
            map={textures.roof || undefined}
            color={config.roofColor || "#d0d0d0"}
            roughness={0.6}
          />
        </mesh>
      )}

      {/* Внутреннее обустройство, видимое в режиме interior */}
      {config.viewMode === "interior" && config.interiorFurniture && config.interiorFurniture.length > 0 && (
        <InteriorFurniture 
          furnitureItems={config.interiorFurniture} 
          dimensions={dimensions}
        />
      )}

      {/* Земля под бытовкой */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4b6043" roughness={1} />
      </mesh>
    </group>
  );
}

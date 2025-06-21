"use client";

import { useRef, useState, useEffect } from "react";
import { Box, Cylinder } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface FurnitureProps {
  position: [number, number, number];
  dimensions?: { width: number, length: number, height: number };
}

export function Table({ position }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Столешница */}
      <Box args={[1.2, 0.05, 0.8]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Ножки стола */}
      <Box args={[0.05, 0.6, 0.05]} position={[0.5, 0.3, 0.3]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[0.05, 0.6, 0.05]} position={[0.5, 0.3, -0.3]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[0.05, 0.6, 0.05]} position={[-0.5, 0.3, 0.3]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[0.05, 0.6, 0.05]} position={[-0.5, 0.3, -0.3]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
    </group>
  );
}

export function Chair({ position }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Сиденье */}
      <Box args={[0.5, 0.05, 0.5]} position={[0, 0.45, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      
      {/* Спинка */}
      <Box args={[0.5, 0.5, 0.05]} position={[0, 0.7, -0.225]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      
      {/* Ножки */}
      <Box args={[0.05, 0.45, 0.05]} position={[-0.2, 0.225, 0.2]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      <Box args={[0.05, 0.45, 0.05]} position={[0.2, 0.225, 0.2]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      <Box args={[0.05, 0.45, 0.05]} position={[-0.2, 0.225, -0.2]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      <Box args={[0.05, 0.45, 0.05]} position={[0.2, 0.225, -0.2]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
    </group>
  );
}

export function Bed({ position, dimensions }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Матрас */}
      <Box args={[1.8, 0.3, 0.9]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#FFE4C4" />
      </Box>
      
      {/* Рама кровати */}
      <Box args={[2, 0.1, 1]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Подушка */}
      <Box args={[0.5, 0.1, 0.7]} position={[0.6, 0.35, 0]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Box>
      
      {/* Изголовье */}
      <Box args={[2, 0.8, 0.1]} position={[0, 0.4, -0.55]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
    </group>
  );
}

export function Wardrobe({ position }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Корпус шкафа */}
      <Box args={[1.2, 2.2, 0.6]} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      
      {/* Двери шкафа */}
      <Box args={[0.59, 2.1, 0.05]} position={[-0.3, 1.1, 0.325]}>
        <meshStandardMaterial color="#D2B48C" />
      </Box>
      <Box args={[0.59, 2.1, 0.05]} position={[0.3, 1.1, 0.325]}>
        <meshStandardMaterial color="#D2B48C" />
      </Box>
      
      {/* Ручки */}
      <Box args={[0.05, 0.05, 0.05]} position={[-0.1, 1.1, 0.35]}>
        <meshStandardMaterial color="#FFFFFF" metalness={0.8} />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0.1, 1.1, 0.35]}>
        <meshStandardMaterial color="#FFFFFF" metalness={0.8} />
      </Box>
    </group>
  );
}

export function Sofa({ position }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Основа дивана */}
      <Box args={[2, 0.5, 0.8]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Сиденье */}
      <Box args={[1.9, 0.15, 0.7]} position={[0, 0.55, 0]}>
        <meshStandardMaterial color="#D2B48C" />
      </Box>
      
      {/* Спинка */}
      <Box args={[2, 0.5, 0.15]} position={[0, 0.8, -0.4]}>
        <meshStandardMaterial color="#D2B48C" />
      </Box>
      
      {/* Подлокотники */}
      <Box args={[0.15, 0.3, 0.8]} position={[-1, 0.4, 0]}>
        <meshStandardMaterial color="#D2B48C" />
      </Box>
      <Box args={[0.15, 0.3, 0.8]} position={[1, 0.4, 0]}>
        <meshStandardMaterial color="#D2B48C" />
      </Box>
      
      {/* Подушки */}
      <Box args={[0.4, 0.1, 0.4]} position={[-0.7, 0.65, 0]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Box>
      <Box args={[0.4, 0.1, 0.4]} position={[0.7, 0.65, 0]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Box>
    </group>
  );
}

export function DiningTable({ position }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Столешница */}
      <Cylinder args={[0.8, 0.8, 0.05, 32]} position={[0, 0.7, 0]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial color="#D2B48C" />
      </Cylinder>
      
      {/* Ножка */}
      <Cylinder args={[0.1, 0.15, 0.7, 32]} position={[0, 0.35, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Cylinder>
      
      {/* Основание */}
      <Cylinder args={[0.3, 0.3, 0.05, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Cylinder>
    </group>
  );
}

export function Bookshelf({ position }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Задняя стенка */}
      <Box args={[1.2, 2, 0.05]} position={[0, 1, -0.25]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      
      {/* Боковые стенки */}
      <Box args={[0.05, 2, 0.5]} position={[-0.6, 1, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      <Box args={[0.05, 2, 0.5]} position={[0.6, 1, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      
      {/* Полки */}
      <Box args={[1.2, 0.05, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      <Box args={[1.2, 0.05, 0.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      <Box args={[1.2, 0.05, 0.5]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      <Box args={[1.2, 0.05, 0.5]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      <Box args={[1.2, 0.05, 0.5]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      
      {/* Книги (для примера) */}
      <Box args={[0.2, 0.3, 0.15]} position={[-0.4, 0.2, 0]}>
        <meshStandardMaterial color="red" />
      </Box>
      <Box args={[0.3, 0.3, 0.15]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>
      <Box args={[0.25, 0.3, 0.15]} position={[0.4, 0.2, 0]}>
        <meshStandardMaterial color="green" />
      </Box>
    </group>
  );
}

export function KitchenUnit({ position }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Нижние шкафы */}
      <Box args={[2, 0.9, 0.6]} position={[0, 0.45, 0]}>
        <meshStandardMaterial color="#D3D3D3" />
      </Box>
      
      {/* Столешница */}
      <Box args={[2.1, 0.05, 0.65]} position={[0, 0.95, 0]}>
        <meshStandardMaterial color="#2F4F4F" />
      </Box>
      
      {/* Раковина */}
      <Box args={[0.6, 0.05, 0.4]} position={[-0.6, 0.96, 0]}>
        <meshStandardMaterial color="#C0C0C0" metalness={0.5} />
      </Box>
      
      {/* Верхние шкафы */}
      <Box args={[2, 0.7, 0.4]} position={[0, 1.85, -0.1]}>
        <meshStandardMaterial color="#D3D3D3" />
      </Box>
      
      {/* Ручки */}
      <Box args={[0.05, 0.05, 0.05]} position={[-0.8, 0.5, 0.3]}>
        <meshStandardMaterial color="#808080" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[-0.3, 0.5, 0.3]}>
        <meshStandardMaterial color="#808080" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0.3, 0.5, 0.3]}>
        <meshStandardMaterial color="#808080" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0.8, 0.5, 0.3]}>
        <meshStandardMaterial color="#808080" />
      </Box>
    </group>
  );
}

export function TV({ position }: FurnitureProps) {
  return (
    <group position={position}>
      {/* Экран телевизора */}
      <Box args={[1.2, 0.7, 0.05]} position={[0, 1.4, 0]}>
        <meshStandardMaterial color="#000000" />
      </Box>
      
      {/* Подставка */}
      <Box args={[0.1, 0.5, 0.1]} position={[0, 0.9, 0]}>
        <meshStandardMaterial color="#696969" />
      </Box>
      <Box args={[0.6, 0.05, 0.4]} position={[0, 0.65, 0]}>
        <meshStandardMaterial color="#696969" />
      </Box>
    </group>
  );
}

interface InteriorFurnitureProps {
  furnitureItems: string[];
  dimensions: { width: number, length: number, height: number };
}

function DraggableFurniture({ children, position, onPositionChange, bounds, onDelete }: { children: React.ReactNode, position: [number, number, number], onPositionChange: (pos: [number, number, number]) => void, bounds: { xMin: number, xMax: number, zMin: number, zMax: number }, onDelete: () => void }) {
  const ref = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const offset = useRef<[number, number, number]>([0, 0, 0]);
  const [scale, setScale] = useState(0);
  const [highlight, setHighlight] = useState(false);

  // Анимация появления и выделения
  useFrame(() => {
    setScale((prev) => {
      let target = highlight ? 1.15 : 1;
      if (prev < target) return Math.min(target, prev + 0.08);
      if (prev > target) return Math.max(target, prev - 0.08);
      return prev;
    });
    if (ref.current) ref.current.scale.set(scale, scale, scale);
    if (ref.current) {
      ref.current.traverse((obj: any) => {
        if (obj.isMesh) {
          obj.material.emissive = obj.material.emissive || { set: () => {} };
          obj.material.emissive.set(highlight ? '#ffe066' : '#000');
        }
      });
    }
  });

  // Drag events
  const onPointerDown = (e: any) => {
    e.stopPropagation();
    dragging.current = true;
    setHighlight(true);
    offset.current = [
      e.point.x - position[0],
      e.point.y - position[1],
      e.point.z - position[2],
    ];
    document.body.style.cursor = "grabbing";
  };
  const onPointerUp = (e: any) => {
    dragging.current = false;
    setHighlight(false);
    document.body.style.cursor = "auto";
  };
  const onPointerMove = (e: any) => {
    if (!dragging.current) return;
    let newX = e.point.x - offset.current[0];
    let newZ = e.point.z - offset.current[2];
    // Ограничения по стенам
    newX = Math.max(bounds.xMin, Math.min(bounds.xMax, newX));
    newZ = Math.max(bounds.zMin, Math.min(bounds.zMax, newZ));
    const newPos: [number, number, number] = [newX, position[1], newZ];
    onPositionChange(newPos);
  };
  // Удаление по двойному клику
  const onDoubleClick = (e: any) => {
    e.stopPropagation();
    onDelete();
  };
  return (
    <group
      ref={ref}
      position={position}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerOver={() => setHighlight(true)}
      onPointerOut={() => setHighlight(false)}
      onDoubleClick={onDoubleClick}
      castShadow
    >
      {children}
    </group>
  );
}

export default function InteriorFurniture({ furnitureItems, dimensions }: InteriorFurnitureProps) {
  // Начальные позиции для каждого предмета
  const initialPositions: Record<string, [number, number, number]> = {
    table: [0, 0, 0],
    chair1: [-0.7, 0, 0],
    chair2: [0.7, 0, 0],
    bed: [0, 0, -dimensions.length/2 + 1],
    wardrobe: [dimensions.width/2 - 0.7, 0, -dimensions.length/2 + 0.4],
    sofa: [-dimensions.width/2 + 1.1, 0, 0],
    dining_table: [0, 0, dimensions.length/2 - 1.5],
    bookshelf: [dimensions.width/2 - 0.7, 0, dimensions.length/2 - 0.4],
    kitchen: [-dimensions.width/2 + 1.1, 0, dimensions.length/2 - 0.4],
    tv: [0, 0, -dimensions.width/2 + 0.1],
  };
  const [positions, setPositions] = useState(initialPositions);
  const [activeItems, setActiveItems] = useState(furnitureItems);

  // Границы бытовки
  const bounds = {
    xMin: -dimensions.width/2 + 0.6,
    xMax: dimensions.width/2 - 0.6,
    zMin: -dimensions.length/2 + 0.6,
    zMax: dimensions.length/2 - 0.6,
  };

  // Удаление предмета
  const deleteItem = (key: string) => {
    setActiveItems((prev) => prev.filter(item => item !== key && item !== 'chairs' || (key === 'chair1' && item !== 'chair2') || (key === 'chair2' && item !== 'chair1')));
  };

  const furniture = [];
  if (activeItems.includes('table')) {
    furniture.push(
      <DraggableFurniture key="table" position={positions.table} onPositionChange={pos => setPositions(prev => ({ ...prev, table: pos }))} bounds={bounds} onDelete={() => deleteItem('table')}>
        <Table position={[0, 0, 0]} />
      </DraggableFurniture>
    );
  }
  if (activeItems.includes('chairs')) {
    furniture.push(
      <DraggableFurniture key="chair1" position={positions.chair1} onPositionChange={pos => setPositions(prev => ({ ...prev, chair1: pos }))} bounds={bounds} onDelete={() => deleteItem('chairs')}>
        <Chair position={[0, 0, 0]} />
      </DraggableFurniture>,
      <DraggableFurniture key="chair2" position={positions.chair2} onPositionChange={pos => setPositions(prev => ({ ...prev, chair2: pos }))} bounds={bounds} onDelete={() => deleteItem('chairs')}>
        <Chair position={[0, 0, 0]} />
      </DraggableFurniture>
    );
  }
  if (activeItems.includes('bed')) {
    furniture.push(
      <DraggableFurniture key="bed" position={positions.bed} onPositionChange={pos => setPositions(prev => ({ ...prev, bed: pos }))} bounds={bounds} onDelete={() => deleteItem('bed')}>
        <Bed position={[0, 0, 0]} dimensions={dimensions} />
      </DraggableFurniture>
    );
  }
  if (activeItems.includes('wardrobe')) {
    furniture.push(
      <DraggableFurniture key="wardrobe" position={positions.wardrobe} onPositionChange={pos => setPositions(prev => ({ ...prev, wardrobe: pos }))} bounds={bounds} onDelete={() => deleteItem('wardrobe')}>
        <Wardrobe position={[0, 0, 0]} />
      </DraggableFurniture>
    );
  }
  if (activeItems.includes('sofa')) {
    furniture.push(
      <DraggableFurniture key="sofa" position={positions.sofa} onPositionChange={pos => setPositions(prev => ({ ...prev, sofa: pos }))} bounds={bounds} onDelete={() => deleteItem('sofa')}>
        <Sofa position={[0, 0, 0]} />
      </DraggableFurniture>
    );
  }
  if (activeItems.includes('dining_table')) {
    furniture.push(
      <DraggableFurniture key="dining_table" position={positions.dining_table} onPositionChange={pos => setPositions(prev => ({ ...prev, dining_table: pos }))} bounds={bounds} onDelete={() => deleteItem('dining_table')}>
        <DiningTable position={[0, 0, 0]} />
      </DraggableFurniture>
    );
  }
  if (activeItems.includes('bookshelf')) {
    furniture.push(
      <DraggableFurniture key="bookshelf" position={positions.bookshelf} onPositionChange={pos => setPositions(prev => ({ ...prev, bookshelf: pos }))} bounds={bounds} onDelete={() => deleteItem('bookshelf')}>
        <Bookshelf position={[0, 0, 0]} />
      </DraggableFurniture>
    );
  }
  if (activeItems.includes('kitchen')) {
    furniture.push(
      <DraggableFurniture key="kitchen" position={positions.kitchen} onPositionChange={pos => setPositions(prev => ({ ...prev, kitchen: pos }))} bounds={bounds} onDelete={() => deleteItem('kitchen')}>
        <KitchenUnit position={[0, 0, 0]} />
      </DraggableFurniture>
    );
  }
  if (activeItems.includes('tv')) {
    furniture.push(
      <DraggableFurniture key="tv" position={positions.tv} onPositionChange={pos => setPositions(prev => ({ ...prev, tv: pos }))} bounds={bounds} onDelete={() => deleteItem('tv')}>
        <TV position={[0, 0, 0]} />
      </DraggableFurniture>
    );
  }
  return <>{furniture}</>;
}

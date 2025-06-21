"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function Delivery3D() {
  return (
    <div className="w-full h-48 md:h-64">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
        {/* Простая 3D модель грузовика */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[2.5, 1, 1]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        {/* Кабина */}
        <mesh position={[-1, 1.1, 0]} castShadow>
          <boxGeometry args={[0.8, 0.7, 1]} />
          <meshStandardMaterial color="#6366f1" />
        </mesh>
        {/* Колёса */}
        <mesh position={[-1.2, 0.3, 0.5]}>
          <cylinderGeometry args={[0.25, 0.25, 0.4, 32]} />
          <meshStandardMaterial color="#111" />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        <mesh position={[1.2, 0.3, 0.5]}>
          <cylinderGeometry args={[0.25, 0.25, 0.4, 32]} />
          <meshStandardMaterial color="#111" />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        <mesh position={[-1.2, 0.3, -0.5]}>
          <cylinderGeometry args={[0.25, 0.25, 0.4, 32]} />
          <meshStandardMaterial color="#111" />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        <mesh position={[1.2, 0.3, -0.5]}>
          <cylinderGeometry args={[0.25, 0.25, 0.4, 32]} />
          <meshStandardMaterial color="#111" />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
} 
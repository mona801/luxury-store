"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { products } from "@/lib/data";

interface FurnitureProps {
  onSelect: (id: string | null) => void;
}

function FurnitureItem({
  product,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  onSelect,
}: {
  product: (typeof products)[0];
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onSelect: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ camera }) => {
    if (!meshRef.current) return;
    const dist = camera.position.distanceTo(meshRef.current.position);
    setHovered(dist < 3);
  });

  const baseColor = product.colors[0]?.value || "#8B7355";

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(product.id)}
      >
        <boxGeometry args={[1.5, 0.8, 0.8]} />
        <meshStandardMaterial
          color={hovered ? "#d4af37" : baseColor}
          roughness={0.6}
          metalness={0.05}
          emissive={hovered ? "#d4af37" : "#000000"}
          emissiveIntensity={hovered ? 0.15 : 0}
        />
      </mesh>
      {hovered && (
        <Html position={[0, 1.2, 0]} center distanceFactor={5}>
          <div className="bg-navy-800/90 backdrop-blur-sm text-cream-50 px-3 py-1.5 rounded text-xs whitespace-nowrap pointer-events-none"
            style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
            {product.name}
          </div>
        </Html>
      )}
      {hovered && (
        <pointLight position={[0, 1, 0]} intensity={0.5} color="#d4af37" distance={4} decay={2} />
      )}
    </group>
  );
}

export function Furniture({ onSelect }: FurnitureProps) {
  const furniturePositions = [
    { product: products[0], position: [0 as number, 0.4, -2] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], scale: 1.2 },
    { product: products[1], position: [0, 0.3, 0.5] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], scale: 1 },
    { product: products[5], position: [-3, 0.4, -1] as [number, number, number], rotation: [0, Math.PI / 4, 0] as [number, number, number], scale: 0.8 },
    { product: products[2], position: [-6, 0.5, -5] as [number, number, number], rotation: [0, Math.PI / 6, 0] as [number, number, number], scale: 1 },
    { product: products[3], position: [5, 0.4, -3] as [number, number, number], rotation: [0, -Math.PI / 6, 0] as [number, number, number], scale: 1 },
    { product: products[4], position: [-3, 0.4, -6] as [number, number, number], rotation: [0, Math.PI / 3, 0] as [number, number, number], scale: 1 },
    { product: products[6], position: [6, 0.4, -7] as [number, number, number], rotation: [0, -Math.PI / 4, 0] as [number, number, number], scale: 1 },
    { product: products[7], position: [3, 0.05, -5] as [number, number, number], rotation: [0, Math.PI / 6, 0] as [number, number, number], scale: 1.5 },
  ];

  return (
    <group>
      {furniturePositions.map(({ product, position, rotation, scale }) => (
        <FurnitureItem key={product.id} product={product} position={position} rotation={rotation} scale={scale} onSelect={onSelect} />
      ))}
    </group>
  );
}

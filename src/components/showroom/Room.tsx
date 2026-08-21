"use client";

import { useMemo } from "react";
import * as THREE from "three";

function Floor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.3} metalness={0.05} />
      </mesh>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-10 + i, 0.001, 0]} receiveShadow>
          <planeGeometry args={[0.01, 20]} />
          <meshStandardMaterial color="#2a1d14" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Walls() {
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f5f0e8", roughness: 0.9, metalness: 0 }), []);
  const trimMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#d4bfa0", roughness: 0.6, metalness: 0.1 }), []);

  return (
    <group>
      <mesh position={[0, 2.5, -10]} receiveShadow>
        <boxGeometry args={[20, 5, 0.15]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
      <mesh position={[-10, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 5, 0.15]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
      <mesh position={[10, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 5, 0.15]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
      <mesh position={[0, 0.1, -9.9]}>
        <boxGeometry args={[20, 0.2, 0.05]} />
        <primitive object={trimMat} attach="material" />
      </mesh>
      <mesh position={[-9.9, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 0.2, 0.05]} />
        <primitive object={trimMat} attach="material" />
      </mesh>
      <mesh position={[9.9, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 0.2, 0.05]} />
        <primitive object={trimMat} attach="material" />
      </mesh>
      <mesh position={[0, 4.9, -9.9]}>
        <boxGeometry args={[20, 0.15, 0.1]} />
        <primitive object={trimMat} attach="material" />
      </mesh>
    </group>
  );
}

function Ceiling() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#f0ebe3" roughness={0.95} />
    </mesh>
  );
}

export function Room({ entered }: { entered: boolean }) {
  return (
    <group>
      <Floor />
      <Walls />
      <Ceiling />
    </group>
  );
}

"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Lighting() {
  const spotRef = useRef<THREE.SpotLight>(null);

  useFrame(({ camera }) => {
    if (spotRef.current) {
      spotRef.current.target.position.copy(camera.position);
      spotRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#ffeedd" />
      <spotLight
        ref={spotRef}
        position={[0, 6, 0]}
        angle={0.6}
        penumbra={0.8}
        intensity={1.8}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <spotLight position={[-4, 5, -3]} angle={0.5} penumbra={0.9} intensity={0.8} color="#ffe8cc" castShadow />
      <pointLight position={[3, 2.5, 2]} intensity={0.4} color="#ffcc88" distance={8} decay={2} />
      <pointLight position={[-3, 2.5, -2]} intensity={0.3} color="#ffeedd" distance={8} decay={2} />
      <pointLight position={[0, 2, -4]} intensity={0.3} color="#ffffff" distance={6} decay={2} />
      <directionalLight position={[5, 8, 5]} intensity={0.2} color="#e6d5c3" />
    </>
  );
}

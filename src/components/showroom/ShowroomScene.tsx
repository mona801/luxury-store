"use client";

import { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { LoadingScreen } from "./LoadingScreen";
import { Room } from "./Room";
import { Furniture } from "./Furniture";
import { Lighting } from "./Lighting";
import { Controls } from "./Controls";
import { ProductPanel } from "./ProductPanel";
import { HUD } from "./HUD";

export default function ShowroomScene() {
  const [loaded, setLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [entered, setEntered] = useState(false);

  const handleProductSelect = useCallback((id: string | null) => {
    setSelectedProduct(id);
  }, []);

  const handleEnter = useCallback(() => {
    setEntered(true);
  }, []);

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <Canvas
        shadows
        camera={{ fov: 65, near: 0.1, far: 200, position: [0, 1.6, 8] }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#1a1510", 15, 50]} />
          <Lighting />
          <Room entered={entered} />
          <Furniture onSelect={handleProductSelect} />
          <Controls entered={entered} soundOn={soundOn} />
        </Suspense>
      </Canvas>

      <HUD
        entered={entered}
        onEnter={handleEnter}
        soundOn={soundOn}
        onToggleSound={() => setSoundOn(!soundOn)}
        onBack={() => {
          setSelectedProduct(null);
          window.location.href = "/";
        }}
      />

      <ProductPanel
        productId={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

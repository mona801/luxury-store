"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface SceneState {
  progress: number;
  isActive: boolean;
  index: number;
}

export function useCinematicScroll(sceneCount: number) {
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeScene, setActiveScene] = useState(0);
  const [sceneProgresses, setSceneProgresses] = useState<number[]>(
    new Array(sceneCount).fill(0)
  );

  const setSceneRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sceneRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const scenes = sceneRefs.current.filter(Boolean) as HTMLElement[];
    if (scenes.length === 0) return;

    const observers: IntersectionObserver[] = [];

    scenes.forEach((scene, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveScene(index);
            }
          });
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
      );
      observer.observe(scene);
      observers.push(observer);
    });

    const handleScroll = () => {
      const vh = window.innerHeight;
      const progresses = scenes.map((scene) => {
        const rect = scene.getBoundingClientRect();
        const sceneTop = rect.top;
        const sceneHeight = rect.height;
        const rawProgress = 1 - sceneTop / vh;
        return Math.max(0, Math.min(1, rawProgress / (sceneHeight / vh)));
      });
      setSceneProgresses(progresses);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sceneCount]);

  return { activeScene, sceneProgresses, setSceneRef };
}

export function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const normalized = (center - vh / 2) / vh;
      setOffset(normalized * 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, offset };
}

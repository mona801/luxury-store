"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Controls({ entered, soundOn }: { entered: boolean; soundOn: boolean }) {
  const { camera, gl } = useThree();
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    yaw: 0,
    pitch: 0,
    bobPhase: 0,
    bobIntensity: 0,
  });
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!entered) return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": case "ArrowUp": moveState.current.forward = true; break;
        case "KeyS": case "ArrowDown": moveState.current.backward = true; break;
        case "KeyA": case "ArrowLeft": moveState.current.left = true; break;
        case "KeyD": case "ArrowRight": moveState.current.right = true; break;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": case "ArrowUp": moveState.current.forward = false; break;
        case "KeyS": case "ArrowDown": moveState.current.backward = false; break;
        case "KeyA": case "ArrowLeft": moveState.current.left = false; break;
        case "KeyD": case "ArrowRight": moveState.current.right = false; break;
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement === gl.domElement) {
        moveState.current.yaw -= e.movementX * 0.002;
        moveState.current.pitch -= e.movementY * 0.002;
        moveState.current.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, moveState.current.pitch));
      }
    };
    const onClick = () => {
      if (!document.pointerLockElement) {
        gl.domElement.requestPointerLock();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousemove", onMouseMove);
    gl.domElement.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousemove", onMouseMove);
      gl.domElement.removeEventListener("click", onClick);
    };
  }, [entered, gl]);

  useFrame((_, delta) => {
    if (!entered) return;

    const state = moveState.current;
    const speed = 2.5;
    const damping = 8;

    camera.rotation.order = "YXZ";
    camera.rotation.y = state.yaw;
    camera.rotation.x = state.pitch;

    direction.current.set(0, 0, 0);
    if (state.forward) direction.current.z -= 1;
    if (state.backward) direction.current.z += 1;
    if (state.left) direction.current.x -= 1;
    if (state.right) direction.current.x += 1;
    direction.current.normalize();

    const euler = new THREE.Euler(0, state.yaw, 0, "YXZ");
    direction.current.applyEuler(euler);

    velocity.current.lerp(direction.current.multiplyScalar(speed), 1 - Math.exp(-damping * delta));

    const newPos = camera.position.clone().add(velocity.current.clone().multiplyScalar(delta));
    newPos.x = Math.max(-9.5, Math.min(9.5, newPos.x));
    newPos.z = Math.max(-9.5, Math.min(9.5, newPos.z));
    newPos.y = 1.6;
    camera.position.copy(newPos);

    const isMoving = velocity.current.length() > 0.1;
    if (isMoving) {
      state.bobPhase += delta * 8;
      state.bobIntensity = THREE.MathUtils.lerp(state.bobIntensity, 0.02, delta * 4);
    } else {
      state.bobIntensity = THREE.MathUtils.lerp(state.bobIntensity, 0, delta * 4);
    }
    camera.position.y += Math.sin(state.bobPhase) * state.bobIntensity;
  });

  return null;
}

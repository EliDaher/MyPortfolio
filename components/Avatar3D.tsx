"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  useAnimations,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function AvatarModel() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/MyAvatarMove.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions) return;

    const firstAction = Object.values(actions)[0];
    if (!firstAction) return;

    firstAction.reset();
    firstAction.setLoop(THREE.LoopOnce, 1); // تشغيل مرة واحدة فقط
    firstAction.clampWhenFinished = true; // التوقف عند آخر فريم
    firstAction.play();

    return () => {
      firstAction.stop();
    };
  }, [actions]);

  return <primitive ref={group} object={scene} scale={1.6} />;
}

export default function Avatar3D() {
  return (
    <div className="w-full h-[450px] md:h-[600px]">
      <Canvas camera={{ position: [-0.5, 3, 3.5], fov: 80 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 3, 3]} intensity={1} />

        <AvatarModel />

        <OrbitControls
          enableZoom={false}
          enableDamping={false}
          enableRotate={false}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

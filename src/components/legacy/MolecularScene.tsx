"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Structure() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.04;
      outerRef.current.rotation.y = t * 0.07;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.025;
      innerRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer geodesic structure */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[3.2, 1]} />
        <meshBasicMaterial
          wireframe
          color="#00C2A8"
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Inner structure — counter-rotating for moiré depth */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial
          wireframe
          color="#00C2A8"
          transparent
          opacity={0.04}
        />
      </mesh>
    </group>
  );
}

export default function MolecularScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Structure />
      </Canvas>
    </div>
  );
}

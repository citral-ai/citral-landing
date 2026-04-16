"use client";

import { MeshGradient } from "@mesh-gradient/react";

export default function MeshBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        options={{
          colors: ["#010d0c", "#053530", "#008c7a", "#020a08"],
          animationSpeed: 1.8,
          seed: 7,
        }}
      />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

const MolecularScene = dynamic(() => import("./MolecularScene"), {
  ssr: false,
});

export default function Scene3DWrapper() {
  return <MolecularScene />;
}

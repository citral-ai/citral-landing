import HeroContent from "@/components/HeroContent";
import Navbar from "@/components/Navbar";
import MeshBackground from "@/components/MeshBackground";
import Spotlight from "@/components/Spotlight";
import FloatingFragments from "@/components/FloatingFragments";

export default function Home() {
  return (
    <main className="grain relative min-h-screen overflow-hidden bg-[#020a08]">
      {/* Mesh gradient */}
      <MeshBackground />

      {/* Floating regulatory fragments */}
      <FloatingFragments />

      {/* Grid overlay — subtle structure */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,194,168,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,168,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial vignette — darkens edges */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(2,10,8,0.6) 100%)",
        }}
      />

      {/* Mouse spotlight */}
      <Spotlight />

      {/* Nav */}
      <Navbar />

      {/* Hero */}
      <HeroContent />
    </main>
  );
}

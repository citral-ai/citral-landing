import HeroContent from "@/components/HeroContent";
import Navbar from "@/components/Navbar";
import MeshBackground from "@/components/MeshBackground";
import Spotlight from "@/components/Spotlight";
import FloatingFragments from "@/components/FloatingFragments";
import LoadingScreen from "@/components/LoadingScreen";
import Marquee from "@/components/Marquee";
import HowItWorks from "@/components/HowItWorks";
import BentoGrid from "@/components/BentoGrid";
import CompareSection from "@/components/CompareSection";
import CTABand from "@/components/CTABand";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="grain relative min-h-screen overflow-x-hidden bg-[#020a08]">
      {/* Loading screen */}
      <LoadingScreen />

      {/* Backgrounds */}
      <MeshBackground />
      <FloatingFragments />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,194,168,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,168,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(2,10,8,0.6) 100%)",
        }}
      />

      {/* Spotlight */}
      <Spotlight />

      {/* Nav */}
      <Navbar />

      {/* Hero */}
      <HeroContent />

      {/* Marquee */}
      <Marquee />

      {/* How it works */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Platform / Bento */}
      <div id="platform">
        <BentoGrid />
      </div>

      {/* Compare */}
      <div id="why-citral">
        <CompareSection />
      </div>

      {/* CTA Band */}
      <CTABand />

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}

import ScrollMorphBg from "@/components/ScrollMorphBg";
import FloatingMolecules from "@/components/FloatingMolecules";
import SmoothNav from "@/components/SmoothNav";
import CrazyHero from "@/components/CrazyHero";
import AuditProcessViz from "@/components/AuditProcessViz";
import FrameworksOrbit from "@/components/FrameworksOrbit";
import BeforeAfter from "@/components/BeforeAfter";
import FinalCTA from "@/components/FinalCTA";
import CrazyFooter from "@/components/CrazyFooter";

const ACCENT = "#84cc16";

export default function Home() {
  return (
    <main className="grain relative min-h-screen overflow-x-hidden" style={{ background: "#000" }}>
      <ScrollMorphBg />
      <FloatingMolecules accent={ACCENT} />

      <SmoothNav accent={ACCENT} />

      <div className="relative z-[5]">
        <CrazyHero accent={ACCENT} />
        <AuditProcessViz accent={ACCENT} />
        <FrameworksOrbit accent={ACCENT} />
        <BeforeAfter accent={ACCENT} />
        <FinalCTA accent={ACCENT} />
        <CrazyFooter accent={ACCENT} />
      </div>
    </main>
  );
}

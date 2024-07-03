import HeroSection from "@/components/sections/HeroSection";
import CallToActionSection from "@/components/sections/CallToActionSection";
import PropositionSection from "@/components/sections/PropositionSection";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <HeroSection />

      <PropositionSection />

      <CallToActionSection />
    </div>
  );
}

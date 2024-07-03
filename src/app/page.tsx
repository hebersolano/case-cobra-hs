import HeroSection from "@/components/containers/HeroSection";
import CallToActionSection from "@/components/containers/CallToActionSection";
import PropositionSection from "@/components/containers/PropositionSection";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <HeroSection />

      <PropositionSection />

      <CallToActionSection />
    </div>
  );
}

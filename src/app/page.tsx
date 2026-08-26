import HeroSection from "@/components/containers/HeroSection";
import CallToActionSection from "@/components/containers/CallToActionSection";
import PropositionSection from "@/components/containers/PropositionSection";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function Home() {
  return (
    <div>
      <HeroSection />

      <PropositionSection />

      <CallToActionSection />
    </div>
  );
}

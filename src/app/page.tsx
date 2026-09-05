import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { MetricsBar } from "@/components/sections/metrics-bar";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { ExperienceApproach } from "@/components/sections/experience-approach";
import { NowBuilding } from "@/components/sections/now-building";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <MetricsBar />
      <ProjectsShowcase />
      <ExperienceApproach />
      <NowBuilding />
      <ContactCTA />
    </>
  );
}


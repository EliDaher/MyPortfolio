import Contact from "@/components/Contact";
import DownloadCV from "@/components/DownloadCV";
import { FloatingNav } from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import { ModeToggle } from "@/components/ModeToggle";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";
import { HomeIcon } from "lucide-react";


export default function Home() {
  return (
    <main className="relative">
      <FloatingNav
        navItems={[{ name: "Home", link: "/", icon: <HomeIcon /> }]}
      />
      <Hero />

      <SectionDivider text="My Projects" />

      <Projects />

      <SectionDivider text="Get in Touch" />

      <Contact />

      <ModeToggle />
      <DownloadCV />
    </main>
  );
}

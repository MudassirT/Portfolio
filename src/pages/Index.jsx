
import { Navbar } from "@/components/Navbar.tsx";
import Hero from "@/components/sections/Hero.tsx";
import About from "@/components/sections/About.tsx";
import Education from "@/components/sections/Education.tsx";
import Skills from "@/components/sections/Skills.tsx";
import Projects from "@/components/sections/Projects.tsx";
import Contact from "@/components/sections/Contact.tsx";
import Footer from "@/components/sections/Footer.tsx";
import { ChatbotWidget } from "@/components/ChatbotWidget.tsx";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Index;

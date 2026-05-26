import { IntroLoader } from "@/components/IntroLoader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact, Footer } from "@/components/Contact";
import { ChatbotWidget } from "@/components/ChatbotWidget";

const Index = () => {
  return (
    <IntroLoader>
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
    </IntroLoader>
  );
};

export default Index;

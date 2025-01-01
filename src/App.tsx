import { Navbar } from '@/components/Navbar/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { AboutSection } from '@/components/AboutSection';
import { DemoSection } from '@/components/DemoSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { ModulesSection } from '@/components/ModulesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { PricingSection } from '@/components/PricingSection';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { FeaturesOrbit } from './components/FeaturesOrbit';

function App() {
  return (
    <div className="min-h-screen bg-background overflow-x: hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <DemoSection />
      <BenefitsSection />
      <ModulesSection />
      <TestimonialsSection />
      <PricingSection />
      <FeaturesOrbit />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
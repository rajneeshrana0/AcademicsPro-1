// import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { BenefitsSection } from "./BenefitsSection";
import { CTASection } from "./CTASection";
import { DemoSection } from "./DemoSection";
import { FAQSection } from "./FAQSection";
import { FeaturesOrbit } from "./FeaturesOrbit";
import { FeaturesSection } from "./FeaturesSection";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import { ModulesSection } from "./ModulesSection";
import { Navbar } from "./Navbar/Navbar";
import { PricingSection } from "./PricingSection";
import { TestimonialsSection } from "./TestimonialsSection";

export default function landingpage(){

  return (

    <>
    <Navbar />
    <HeroSection />
    <FeaturesSection/>
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
    </>
  )
}
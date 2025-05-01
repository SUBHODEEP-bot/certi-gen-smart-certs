
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import TestimonialSection from '@/components/TestimonialSection';
import MarPointsSection from '@/components/MarPointsSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <MarPointsSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

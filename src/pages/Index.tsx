
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
        <div className="bg-certigen-blue text-white text-center py-3 shadow-md">
          <p className="text-sm md:text-base font-medium">
            Make your certificate without logging in or registering — quick and easy!
          </p>
        </div>
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

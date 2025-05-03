import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
export default function PricingSection() {
  const features = ["Professional certificate design", "Instant PDF generation", "Unique certificate ID", "Verification system", "High-quality printable format", "Digital sharing ready"];
  return <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-certigen-navy mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No hidden fees, no subscriptions, just pay per certificate. 
            Perfect for any budget and volume.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-8 bg-certigen-blue text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Pay-As-You-Go</h3>
              <div className="flex items-center justify-center">
                <span className="text-5xl font-bold">₹2</span>
                <span className="ml-2 text-blue-100">per certificate</span>
              </div>
            </div>
            
            <div className="p-8">
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-certigen-blue mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>)}
              </ul>
              
              <Button asChild className="w-full bg-certigen-blue hover:bg-certigen-navy text-lg py-6">
                <Link to="/generator">
                  Generate Certificate Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
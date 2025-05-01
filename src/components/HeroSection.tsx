
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold text-certigen-navy mb-4 leading-tight">
              Generate Professional Certificates Instantly
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Create and download professionally designed certificates for just ₹5 each.
              Perfect for workshops, courses, events and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-certigen-blue hover:bg-certigen-navy text-lg">
                <Link to="/generator">
                  Generate Certificate
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link to="/verify">
                  Verify Certificate
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-4 border-certigen-gold rounded-lg"></div>
              <div className="certificate-container bg-white border-4 border-certigen-blue rounded-lg p-8 shadow-xl relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <h1 className="text-2xl font-bold mb-1 text-certigen-navy">CERTIFICATE</h1>
                    <h2 className="text-xl font-semibold mb-1 text-certigen-navy">OF ACHIEVEMENT</h2>
                    <div className="w-20 h-1 bg-certigen-gold mx-auto"></div>
                  </div>
                  
                  <p className="text-sm mb-2">This is to certify that</p>
                  
                  <h2 className="text-2xl font-certificate font-bold mb-2 text-certigen-blue">
                    John Doe
                  </h2>
                  
                  <p className="text-sm mb-2">has successfully participated in</p>
                  
                  <h3 className="text-xl font-semibold mb-2 text-certigen-navy">
                    Workshop on Web Development
                  </h3>
                  
                  <p className="text-sm mb-4">on May 15, 2023</p>
                  
                  <div className="w-full flex justify-around mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-24 border-b border-gray-400 pb-1 mb-1">
                        <p className="font-certificate italic text-sm">Signature</p>
                      </div>
                      <p className="text-xs text-gray-600">Director</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-24 border-b border-gray-400 pb-1 mb-1">
                        <p className="font-certificate italic text-sm">Signature</p>
                      </div>
                      <p className="text-xs text-gray-600">Coordinator</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 italic mt-2 opacity-60">
                    Powered by CertiGen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

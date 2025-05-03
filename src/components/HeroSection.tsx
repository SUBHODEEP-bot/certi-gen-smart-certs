import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, GraduationCap, Award, Code } from 'lucide-react';
export default function HeroSection() {
  return <div className="bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-20 right-10 w-48 h-48 bg-certigen-blue opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-72 h-72 bg-certigen-gold opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 gear-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 z-10">
            <div className="mb-4 flex items-center space-x-2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-certigen-blue rounded-full text-sm font-medium">
                Engineering Excellence
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-certigen-navy mb-6 leading-tight">
              Professional <span className="text-certigen-blue">Certificates</span> for Engineering Students
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-700 mb-8">Generate industry-recognized certificates for hackathons, workshops, and projects. Earn MAR points and boost your academic profile for just ₹2 per certificate.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-2">
                <CheckCircle className="text-certigen-blue w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-gray-700">AI-powered certificate text</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="text-certigen-blue w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Earn MAR Points</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="text-certigen-blue w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Instant PDF download</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="text-certigen-blue w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Verified with QR code</span>
              </div>
            </div>
            
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
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-16 w-14 h-14 bg-certigen-gold rounded-lg opacity-20 floating"></div>
              <div className="absolute top-10 -right-8 w-20 h-20 border-4 border-certigen-blue rounded-full opacity-20 spin-slow"></div>
              <div className="absolute bottom-10 -left-10 w-16 h-16 bg-certigen-lightblue rounded-lg opacity-20 floating" style={{
              animationDelay: '1s'
            }}></div>
              
              {/* Education icons */}
              <div className="absolute -top-10 right-20 bg-white p-3 rounded-full shadow-lg floating" style={{
              animationDelay: '1.2s'
            }}>
                <GraduationCap className="h-8 w-8 text-certigen-blue" />
              </div>
              <div style={{
              animationDelay: '0.5s'
            }} className="absolute -bottom-5 -right-5 p-3 rounded-full shadow-lg floating bg-purple-950">
                <Award className="h-8 w-8 text-certigen-gold" />
              </div>
              <div className="absolute bottom-20 -left-8 bg-white p-3 rounded-full shadow-lg floating" style={{
              animationDelay: '0.8s'
            }}>
                <Code className="h-8 w-8 text-certigen-navy" />
              </div>
              
              {/* Certificate preview */}
              <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100 bounce-in card-hover">
                {/* Certificate header */}
                <div className="bg-gradient-to-r from-certigen-navy to-certigen-blue text-white rounded-t-lg p-4 text-center">
                  <h3 className="text-xl font-bold">MAKAUT Engineering Certificate</h3>
                </div>
                
                <div className="certificate-container bg-white p-8 relative border-t-0 rounded-b-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <h1 className="text-2xl font-bold mb-1 text-certigen-navy">CERTIFICATE</h1>
                      <h2 className="text-xl font-semibold mb-1 text-certigen-navy">OF ACHIEVEMENT</h2>
                      <div className="w-20 h-1 bg-certigen-gold mx-auto"></div>
                    </div>
                    
                    <p className="text-sm mb-2">This is to certify that</p>
                    
                    <h2 className="text-2xl font-certificate font-bold mb-2 text-certigen-blue">
                      Engineering Student
                    </h2>
                    
                    <p className="text-sm mb-2">has successfully participated in</p>
                    
                    <h3 className="text-xl font-semibold mb-2 text-certigen-navy">
                      Hackathon on AI Development
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
                    
                    {/* MAR Points indicator */}
                    
                    
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
    </div>;
}
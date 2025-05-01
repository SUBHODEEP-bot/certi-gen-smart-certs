
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BadgeCheck, CircleX } from 'lucide-react';

const Verify = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'valid' | 'invalid'>('idle');
  const { toast } = useToast();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificateId.trim()) {
      toast({
        title: "Certificate ID Required",
        description: "Please enter a certificate ID to verify.",
        variant: "destructive"
      });
      return;
    }
    
    setVerificationStatus('verifying');
    
    // Simulate verification process with timeout
    setTimeout(() => {
      // In a real app, this would check against a database
      // For demo purposes, we'll consider certificates starting with "CERT-" as valid
      if (certificateId.startsWith('CERT-') && certificateId.length === 13) {
        setVerificationStatus('valid');
      } else {
        setVerificationStatus('invalid');
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-certigen-navy mb-2">Verify Certificate</h1>
          <p className="text-lg text-gray-600 mb-8">
            Enter the certificate ID to verify its authenticity.
            Valid certificate IDs start with "CERT-" followed by 8 characters.
          </p>
          
          <Card className="border border-certigen-lightblue shadow-md">
            <CardContent className="pt-6">
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <label htmlFor="certificate-id" className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate ID
                  </label>
                  <Input
                    id="certificate-id"
                    placeholder="e.g., CERT-A1B2C3D4"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
                    className="border-certigen-lightblue focus-visible:ring-certigen-blue"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-certigen-blue hover:bg-certigen-navy"
                  disabled={verificationStatus === 'verifying'}
                >
                  {verificationStatus === 'verifying' ? "Verifying..." : "Verify Certificate"}
                </Button>
              </form>
              
              {verificationStatus === 'valid' && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <BadgeCheck className="h-8 w-8 text-green-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800">Certificate is Valid</h3>
                    <p className="text-green-700">This certificate is authentic and has been verified in our system.</p>
                  </div>
                </div>
              )}
              
              {verificationStatus === 'invalid' && (
                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <CircleX className="h-8 w-8 text-red-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800">Certificate is Invalid</h3>
                    <p className="text-red-700">This certificate ID was not found in our system or is invalid.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Verify;

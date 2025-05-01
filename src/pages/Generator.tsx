
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CertificateForm from '@/components/CertificateForm';
import CertificatePreview from '@/components/CertificatePreview';
import { Button } from '@/components/ui/button';
import { generateCertificateId, generatePdf, CertificateData } from '@/utils/certificate';
import { useToast } from '@/hooks/use-toast';
import { Download, Mail } from 'lucide-react';

const Generator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCertificate, setGeneratedCertificate] = useState<CertificateData | null>(null);
  const [certificateId, setCertificateId] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = async (values: CertificateData) => {
    setIsGenerating(true);
    
    // In a real app, this is where you'd make the payment API call
    try {
      // Simulate payment process with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Payment successful
      const newCertificateId = generateCertificateId();
      setCertificateId(newCertificateId);
      setGeneratedCertificate(values);
      
      toast({
        title: "Certificate Generated",
        description: "Your certificate has been generated successfully."
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownload = () => {
    if (!generatedCertificate) return;
    
    const doc = generatePdf(generatedCertificate, certificateId);
    doc.save(`${generatedCertificate.fullName.replace(/\s+/g, '_')}_Certificate.pdf`);
    
    toast({
      title: "Download Started",
      description: "Your certificate is being downloaded."
    });
  };
  
  const handleEmailCertificate = () => {
    // In a real app, this would send the PDF to the user's email
    toast({
      title: "Email Feature",
      description: "In a complete version, this would email your certificate to you."
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-certigen-navy mb-2">Generate Your Certificate</h1>
          <p className="text-lg text-gray-600 mb-8">
            Fill out the form below to create your professional certificate instantly.
            Only ₹5 per certificate.
          </p>
          
          {!generatedCertificate ? (
            <CertificateForm onSubmit={handleSubmit} isGenerating={isGenerating} />
          ) : (
            <div className="space-y-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                <h3 className="font-semibold text-lg">Certificate Generated Successfully!</h3>
                <p>Your certificate has been created and is ready to download.</p>
              </div>
              
              <CertificatePreview 
                certificateData={generatedCertificate}
                certificateId={certificateId}
                className="max-w-3xl mx-auto"
              />
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleDownload} 
                  className="bg-certigen-blue hover:bg-certigen-navy"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Certificate
                </Button>
                <Button 
                  onClick={handleEmailCertificate} 
                  variant="outline"
                  size="lg"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Certificate
                </Button>
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  variant="link" 
                  onClick={() => {
                    setGeneratedCertificate(null);
                    setCertificateId('');
                  }}
                >
                  Generate Another Certificate
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Generator;

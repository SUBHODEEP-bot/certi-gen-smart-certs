
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CertificateForm from '@/components/CertificateForm';
import CertificatePreview from '@/components/CertificatePreview';
import { Button } from '@/components/ui/button';
import { generateCertificateId, generatePdf, CertificateData, saveGeneratedCertificateData } from '@/utils/certificate';
import { useToast } from '@/hooks/use-toast';
import { Download, Mail, Share, Printer, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Generator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCertificate, setGeneratedCertificate] = useState<CertificateData | null>(null);
  const [certificateId, setCertificateId] = useState<string>('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values: CertificateData) => {
    setIsGenerating(true);
    
    try {
      // Payment has already been processed in the form component
      const newCertificateId = generateCertificateId();
      setCertificateId(newCertificateId);
      setGeneratedCertificate(values);
      
      // Show success animation
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 3000);
      
      // Save certificate data for admin analytics
      saveGeneratedCertificateData(values);
      
      toast({
        title: "Certificate Generated",
        description: "Your certificate has been generated successfully."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an issue generating your certificate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownload = async () => {
    if (!generatedCertificate) return;
    
    try {
      const doc = await generatePdf(generatedCertificate, certificateId);
      doc.save(`${generatedCertificate.fullName.replace(/\s+/g, '_')}_Certificate.pdf`);
      
      toast({
        title: "Download Started",
        description: "Your certificate is being downloaded."
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an issue downloading your certificate.",
        variant: "destructive"
      });
    }
  };
  
  const handleEmailCertificate = () => {
    // In a real app, this would send the PDF to the user's email
    toast({
      title: "Email Sent",
      description: "Your certificate has been sent to your email address."
    });
  };
  
  const handlePrintCertificate = () => {
    window.print();
    
    toast({
      title: "Print Dialog Opened",
      description: "Your certificate is ready for printing."
    });
  };
  
  const handleShareCertificate = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Certificate',
        text: 'Check out my certificate from CertiGen!',
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Shared Successfully",
          description: "Your certificate has been shared."
        });
      })
      .catch((error) => {
        toast({
          title: "Sharing Failed",
          description: "There was an issue sharing your certificate."
        });
      });
    } else {
      toast({
        title: "Sharing Not Supported",
        description: "Your browser does not support sharing."
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-certigen-navy mb-2">Generate Your Certificate</h1>
          <p className="text-lg text-gray-600 mb-8">
            Fill out the form below to create your professional certificate instantly.
            Only ₹2 per certificate.
          </p>
          
          {!generatedCertificate ? (
            <CertificateForm onSubmit={handleSubmit} isGenerating={isGenerating} />
          ) : (
            <div className="space-y-8">
              {/* Success animation overlay */}
              {showSuccessAnimation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white rounded-full p-8 shadow-xl animate-scale-in">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                        <Check className="h-10 w-10 text-green-600" />
                      </div>
                      <h2 className="text-xl font-bold">Certificate Generated!</h2>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                <div className="flex items-start md:items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Certificate Generated Successfully!</h3>
                    <p>Your certificate has been created and is ready to download.</p>
                  </div>
                </div>
              </div>
              
              <CertificatePreview 
                certificateData={generatedCertificate}
                certificateId={certificateId}
                className="max-w-3xl mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300"
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
                
                <Button 
                  onClick={handlePrintCertificate} 
                  variant="outline"
                  size="lg"
                  className="border-certigen-lightblue text-certigen-blue"
                >
                  <Printer className="mr-2 h-5 w-5" />
                  Print Certificate
                </Button>
                
                <Button 
                  onClick={handleShareCertificate} 
                  variant="outline"
                  size="lg"
                  className="border-certigen-lightblue text-certigen-blue"
                >
                  <Share className="mr-2 h-5 w-5" />
                  Share Certificate
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
}

export default Generator;


import React from 'react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { QrCode, Stamp } from 'lucide-react';
import { getCertificateTitle } from '@/utils/certificate';

interface CertificateData {
  fullName?: string;
  activity?: string;
  activityDate?: Date;
  certificateText?: string;
  collegeName?: string;
  language?: 'english' | 'bengali' | 'hindi';
  template?: 'classic' | 'modern' | 'elegant' | 'professional';
}

interface CertificatePreviewProps {
  certificateData: CertificateData | null;
  certificateId?: string;
  className?: string;
}

export default function CertificatePreview({ 
  certificateData, 
  certificateId = "PREVIEW",
  className 
}: CertificatePreviewProps) {
  const currentDate = new Date();
  
  const name = certificateData?.fullName || "Your Name";
  const activity = certificateData?.activity || "Selected Activity";
  const college = certificateData?.collegeName || "Your College";
  const date = certificateData?.activityDate 
    ? format(certificateData.activityDate, "d MMMM yyyy") 
    : "Date of Activity";
  const language = certificateData?.language || 'english';
  const template = certificateData?.template || 'classic';
    
  // Clean certificate text from unwanted phrases
  const certificateText = certificateData?.certificateText 
    ? certificateData.certificateText
        .replace(/\b\d+\s*MAR\s*Points\b/gi, '')
        .replace(/This achievement is worth.*?points\./gi, '')
        .replace(/meeting all the necessary requirements as per academic standards recognized by MAKAUT\./gi, '')
        .trim()
    : "Certificate description will appear here after generation.";

  // Get translated title
  const titles = getCertificateTitle(language);

  // Choose stamp and signature based on activity type
  const getStampAndSignature = (activityType?: string) => {
    // Using consistent CertiGen stamp for all certificates
    const certiGenStamp = "/lovable-uploads/7154962c-3d8c-4d09-920e-e84a1600b65a.png";
    
    if (!activityType) return { 
      stamp: certiGenStamp, 
      signature: "/placeholder.svg",
      signer: "ASHOK KUMAR GHOSH",
      title: "Program Director" 
    };
    
    switch (activityType.toLowerCase()) {
      case 'internship':
        return { 
          stamp: certiGenStamp, 
          signature: "/ananya_signature.png",
          signer: "D.R. KUHELI MONDAL",
          title: "Internship Director" 
        };
      case 'webinar':
      case 'online course':
      case 'workshop':
        return { 
          stamp: certiGenStamp, 
          signature: "/priya_signature.png",
          signer: "D.R. DIPAK KUMAR MONDAL",
          title: "Course Director" 
        };
      case 'hackathon':
        return { 
          stamp: certiGenStamp, 
          signature: "/ramesh_signature.png",
          signer: "DILIP KUMAR GHOSH",
          title: "Hackathon Director" 
        };
      case 'volunteering':
      case 'volunteer work':
        return { 
          stamp: certiGenStamp, 
          signature: "/volunteer_signature.png",
          signer: "SOURAV YADAV",
          title: "Volunteer Program Director" 
        };
      case 'project':
      case 'innovation':
        return { 
          stamp: certiGenStamp, 
          signature: "/project_signature.png",
          signer: "ANINDITA BHATTACHARYA",
          title: "Innovation Lead" 
        };
      default:
        return { 
          stamp: certiGenStamp, 
          signature: "/priya_signature.png",
          signer: "ASHOK KUMAR GHOSH",
          title: "Program Director" 
        };
    }
  };

  const { stamp, signature, signer, title } = getStampAndSignature(activity);
  
  // Get template-specific styles
  const getTemplateStyles = () => {
    switch(template) {
      case 'modern':
        return "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50";
      case 'elegant':
        return "border-amber-500 border-[3px] bg-amber-50";
      case 'professional':
        return "border-blue-800 border-[3px] bg-white";
      case 'classic':
      default:
        return "border-certigen-gold bg-certigen-cream";
    }
  };

  return (
    <div className={cn(
      "certificate-container relative border-8 rounded-lg p-8 shadow-lg",
      getTemplateStyles(),
      "print:border-4 certificate-print-area",
      className
    )}>
      <div className="flex flex-col items-center text-center">
        <div className="w-full flex justify-between mb-6">
          <div className="text-certigen-blue">
            <p className="text-sm">Certificate ID:</p>
            <p className="font-bold">{certificateId}</p>
          </div>
          <div className="text-certigen-blue">
            <p className="text-sm">Issue Date:</p>
            <p className="font-bold">{format(currentDate, "d MMMM yyyy")}</p>
          </div>
        </div>
        
        {/* Certificate Header with enhanced styling */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1 text-certigen-navy">{titles.certificate}</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-1 text-certigen-navy">{titles.ofAchievement}</h2>
          <div className="w-24 h-1 bg-certigen-gold mb-4"></div>
        </div>
        
        <p className="text-sm mb-2 text-certigen-gray">This is to certify that</p>
        
        <h2 className="text-3xl md:text-4xl font-certificate font-bold mb-3 text-certigen-blue">
          {name}
        </h2>
        
        {/* College Name */}
        <p className="text-lg font-medium mb-3 text-gray-600">
          {college}
        </p>
        
        <div className="mb-4 px-8 text-sm md:text-base text-certigen-gray max-w-2xl">
          {certificateText}
        </div>
        
        {activity && (
          <div className="my-3 border border-certigen-lightblue bg-blue-50 px-4 py-2 rounded-full flex items-center justify-center">
            <span className="font-medium text-certigen-blue">{activity}</span>
          </div>
        )}
        
        {/* Timestamp of activity */}
        <p className="text-sm text-certigen-gray mb-6">Completed on {date}</p>
        
        {/* Signature Area with enhanced styling */}
        <div className="flex w-full justify-between mb-6 mt-6">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {/* Director Signature */}
              <div className="w-16 h-16 mx-auto opacity-70">
                <img src={signature} alt="Director Signature" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="w-36 border-b border-gray-400 pb-1 mb-1">
              <p className="font-certificate italic">{signer}</p>
            </div>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {/* Executive Director Signature */}
              <div className="w-16 h-16 mx-auto opacity-70">
                <img src="/ananya_signature.png" alt="Executive Director Signature" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="w-36 border-b border-gray-400 pb-1 mb-1">
              <p className="font-certificate italic">M.R Sumit Kumar Biswas</p>
            </div>
            <p className="text-sm text-gray-600">Executive Director</p>
          </div>
        </div>

        {/* Official CertiGen Stamp - positioned at bottom right */}
        <div className="absolute bottom-12 right-12 flex flex-col items-center">
          <div className="w-24 h-24">
            {stamp ? (
              <img src={stamp} alt="Official Stamp" className="w-full h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center justify-center bg-white bg-opacity-50 rounded-full w-full h-full">
                <Stamp className="h-12 w-12 text-certigen-navy opacity-80" />
                <p className="text-xs text-certigen-navy font-bold mt-1">CERTIGEN</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Section with QR Code and Certificate Details - improved positioning */}
        <div className="absolute bottom-6 left-6 flex items-start">
          {/* QR Code */}
          <div className="bg-white p-2 rounded-md shadow-sm mr-4">
            <QrCode className="h-10 w-10 text-certigen-navy opacity-80" />
          </div>
          
          {/* Certificate Details */}
          <div className="text-left">
            <div className="flex items-center text-certigen-blue text-xs mb-1">
              <span>Scan to verify certificate</span>
            </div>
            <p className="text-xs text-gray-500">Certificate ID: {certificateId}</p>
            <p className="text-xs text-gray-500">Issue Date: {format(currentDate, "d MMMM yyyy")}</p>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 italic absolute bottom-3 w-full text-center">
          Powered by CertiGen - Professional Certificate Generator
        </div>
      </div>
    </div>
  );
}

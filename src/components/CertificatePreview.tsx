
import React from 'react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { QrCode } from 'lucide-react';
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
  const date = certificateData?.activityDate ? format(certificateData.activityDate, "d MMMM yyyy") : "Date of Activity";
  const language = certificateData?.language || 'english';
  const template = certificateData?.template || 'classic';

  // Clean certificate text from unwanted phrases
  const certificateText = certificateData?.certificateText ? certificateData.certificateText.replace(/\b\d+\s*MAR\s*Points\b/gi, '').replace(/This achievement is worth.*?points\./gi, '').replace(/meeting all the necessary requirements as per academic standards recognized by MAKAUT\./gi, '').trim() : "Certificate description will appear here after generation.";

  // Get translated title
  const titles = getCertificateTitle(language);

  // Choose stamp and signature based on activity type
  const getStampAndSignature = (activityType?: string) => {
    if (!activityType) return {
      signature: "/placeholder.svg",
      signer: "ASHOK KUMAR GHOSH",
      title: "Program Director"
    };
    switch (activityType.toLowerCase()) {
      case 'internship':
        return {
          signature: "/ananya_signature.png",
          signer: "D.R. KUHELI MONDAL",
          title: "Internship Director"
        };
      case 'webinar':
      case 'online course':
      case 'workshop':
        return {
          signature: "/priya_signature.png",
          signer: "D.R. DIPAK KUMAR MONDAL",
          title: "Course Director"
        };
      case 'hackathon':
        return {
          signature: "/ramesh_signature.png",
          signer: "DILIP KUMAR GHOSH",
          title: "Hackathon Director"
        };
      case 'volunteering':
      case 'volunteer work':
        return {
          signature: "/volunteer_signature.png",
          signer: "SOURAV YADAV",
          title: "Volunteer Program Director"
        };
      case 'project':
      case 'innovation':
        return {
          signature: "/project_signature.png",
          signer: "ANINDITA BHATTACHARYA",
          title: "Innovation Lead"
        };
      default:
        return {
          signature: "/priya_signature.png",
          signer: "ASHOK KUMAR GHOSH",
          title: "Program Director"
        };
    }
  };
  const {
    signature,
    signer,
    title
  } = getStampAndSignature(activity);

  // Get template-specific styles
  const getTemplateStyles = () => {
    switch (template) {
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
  
  // Generate a QR code URL for preview
  const verifyQrUrl = `https://certigen.vercel.app/verify?cert_id=${certificateId}`;
  
  return <div className={cn("certificate-container relative border-8 rounded-lg p-8 shadow-lg", getTemplateStyles(), "print:border-4 certificate-print-area", className)}>
      <div className="flex flex-col items-center text-center">
        {/* Certificate ID and Issue Date - Top-right corner */}
        <div className="absolute top-6 right-8 text-right">
          <div className="text-certigen-blue">
            <p className="text-sm">Certificate ID:</p>
            <p className="font-bold">{certificateId}</p>
          </div>
          <div className="text-certigen-blue mt-2">
            <p className="text-sm">Issue Date:</p>
            <p className="font-bold">{format(currentDate, "d MMMM yyyy")}</p>
          </div>
        </div>
        
        {/* Institution Logo */}
        <div className="mb-4 mt-2">
          <img src="/lovable-uploads/5428d286-91c0-4ac3-b06d-eb661c1ca0be.png" alt="CertiGen Logo" className="h-20 w-auto" />
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
        
        {activity && <div className="my-3 border border-certigen-lightblue bg-blue-50 px-4 py-2 rounded-full flex items-center justify-center">
            <span className="font-medium text-certigen-blue">{activity}</span>
          </div>}
        
        {/* Timestamp of activity */}
        <p className="text-sm text-certigen-gray mb-6">Completed on {date}</p>
        
        {/* Signature Area with enhanced styling */}
        <div className="flex w-full justify-between mb-6 mt-6 mx-0 my-[55px]">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {/* Director Signature */}
              
            </div>
            <div className="w-36 border-b border-gray-400 pb-1 mb-1">
              <p className="font-certificate italic py-0 mx-0 my-0">{signer}</p>
            </div>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {/* Executive Director Signature */}
              
            </div>
            <div className="w-36 border-b border-gray-400 pb-1 mb-1">
              <p className="font-certificate italic">M.R SUJIT KUMAR DEY</p>
            </div>
            <p className="text-sm text-gray-600">Executive Director</p>
          </div>
        </div>
        
        {/* Institution info at bottom-left */}
        <div className="absolute bottom-10 left-6">
          <div className="text-xs text-gray-600">
            <p className="font-semibold">CERTIGEN</p>
            <p>Learn and Grow</p>
            <p>Kolkata, West Bengal, India</p>
            <p>certigen.official@gmail.com</p>
            <p>https://certigen.vercel.app</p>
          </div>
        </div>
        
        {/* QR Code for verification - IMPROVED text formatting */}
        <div className="absolute bottom-10 right-6 flex flex-col items-center w-24">
          <QrCode className="h-16 w-16 mb-1" />
          <div className="text-center w-full">
            <p className="text-[10px] leading-tight text-certigen-blue font-medium">
              Online Verified Certificate
            </p>
            <p className="text-[10px] leading-tight text-certigen-blue font-medium">
              Scan to Verify
            </p>
          </div>
        </div>
        
        {/* Updated footer text - centered at bottom */}
        <div className="text-xs text-gray-500 italic absolute bottom-3 w-full text-center">
          Powered by CertiGen
        </div>
      </div>
    </div>;
}

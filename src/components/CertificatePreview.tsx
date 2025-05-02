
import React from 'react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { getMarPointsForActivity } from '@/utils/certificate';
import { BadgeCheck, Award } from 'lucide-react';

interface CertificateData {
  fullName?: string;
  activity?: string;
  activityDate?: Date;
  certificateText?: string;
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
  const randomDirectorSignature = "John Doe";
  const randomCoordinatorSignature = "Jane Smith";
  const currentDate = new Date();
  
  const name = certificateData?.fullName || "Your Name";
  const activity = certificateData?.activity || "Selected Activity";
  const date = certificateData?.activityDate 
    ? format(certificateData.activityDate, "d MMMM yyyy") 
    : "Date of Activity";
  const marPoints = certificateData?.activity ? getMarPointsForActivity(certificateData.activity) : 0;
  const certificateText = certificateData?.certificateText || "Certificate description will appear here after generation.";

  // Choose stamp and signature based on activity type
  const getStampAndSignature = (activityType?: string) => {
    // In a real app, these would be actual image paths
    const defaultStamp = "/placeholder.svg";
    const defaultSignature = "/placeholder.svg";
    
    if (!activityType) return { stamp: defaultStamp, signature: defaultSignature };
    
    switch (activityType.toLowerCase()) {
      case 'internship':
        return { stamp: "/placeholder.svg", signature: "/placeholder.svg" };
      case 'webinar':
        return { stamp: "/placeholder.svg", signature: "/placeholder.svg" };
      case 'hackathon':
        return { stamp: "/placeholder.svg", signature: "/placeholder.svg" };
      case 'volunteering':
      case 'volunteer work':
        return { stamp: "/placeholder.svg", signature: "/placeholder.svg" };
      case 'project':
      case 'innovation':
        return { stamp: "/placeholder.svg", signature: "/placeholder.svg" };
      default:
        return { stamp: defaultStamp, signature: defaultSignature };
    }
  };

  const { stamp, signature } = getStampAndSignature(activity);

  return (
    <div className={cn(
      "certificate-container relative border-8 border-certigen-gold rounded-lg p-8 shadow-lg bg-certigen-cream",
      "print:border-4 certificate-print-area",
      className
    )}>
      {/* QR Code - Will be placeholder for now */}
      <div className="absolute top-4 right-4 bg-white p-1 rounded-md shadow-sm">
        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
          QR Code
        </div>
      </div>

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
          <h1 className="text-2xl md:text-3xl font-bold mb-1 text-certigen-navy">CERTIFICATE</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-1 text-certigen-navy">OF ACHIEVEMENT</h2>
          <div className="w-24 h-1 bg-certigen-gold mb-4"></div>
          {/* Added seal icon */}
          <div className="text-certigen-gold mb-2">
            <Award className="h-10 w-10" />
          </div>
        </div>
        
        <p className="text-sm mb-2 text-certigen-gray">This is to certify that</p>
        
        <h2 className="text-3xl md:text-4xl font-certificate font-bold mb-3 text-certigen-blue">
          {name}
        </h2>
        
        <div className="mb-4 px-8 text-sm md:text-base text-certigen-gray max-w-2xl">
          {certificateText}
        </div>
        
        {activity && (
          <div className="my-3 border border-certigen-lightblue bg-blue-50 px-4 py-2 rounded-full flex items-center justify-center">
            <span className="font-medium text-certigen-blue">{activity}</span>
            <div className="mx-2 h-4 w-px bg-certigen-lightblue"></div>
            <span className="text-certigen-gold font-bold">{marPoints} MAR Points</span>
            <BadgeCheck className="ml-1 h-5 w-5 text-certigen-gold" />
          </div>
        )}
        
        {/* Timestamp of activity */}
        <p className="text-sm text-certigen-gray mb-6">Completed on {date}</p>
        
        {/* Signature Area with enhanced styling */}
        <div className="flex w-full justify-around mb-6 mt-6">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {/* Placeholder for Director Stamp */}
              <div className="w-16 h-16 mx-auto opacity-30">
                <img src={stamp} alt="Official Stamp" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="w-36 border-b border-gray-400 pb-1 mb-1">
              <p className="font-certificate italic">{randomDirectorSignature}</p>
            </div>
            <p className="text-sm text-gray-600">Director</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {/* Placeholder for Signature Image */}
              <div className="w-16 h-16 mx-auto opacity-30">
                <img src={signature} alt="Signature" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="w-36 border-b border-gray-400 pb-1 mb-1">
              <p className="font-certificate italic">{randomCoordinatorSignature}</p>
            </div>
            <p className="text-sm text-gray-600">Program Coordinator</p>
          </div>
        </div>
        
        {/* Verification Badge */}
        <div className="flex items-center justify-center text-certigen-blue text-xs mb-3">
          <BadgeCheck className="mr-1 h-4 w-4" />
          <span>Digitally verified certificate</span>
        </div>
        
        <div className="text-xs text-gray-500 italic mt-2 opacity-60">
          Powered by CertiGen - Instant Certificate Generator
        </div>
      </div>
    </div>
  );
}

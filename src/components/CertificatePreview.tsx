
import React from 'react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { BadgeCheck } from 'lucide-react';

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
  const currentDate = new Date();
  
  const name = certificateData?.fullName || "Your Name";
  const activity = certificateData?.activity || "Selected Activity";
  const date = certificateData?.activityDate 
    ? format(certificateData.activityDate, "d MMMM yyyy") 
    : "Date of Activity";
  const certificateText = certificateData?.certificateText || "Certificate description will appear here after generation.";

  // Choose stamp and signature based on activity type
  const getStampAndSignature = (activityType?: string) => {
    // Default values
    const defaultStamp = "/placeholder.svg";
    const defaultSignature = "/placeholder.svg";
    const defaultSigner = "Director";
    
    if (!activityType) return { 
      stamp: defaultStamp, 
      signature: defaultSignature,
      signer: defaultSigner 
    };
    
    switch (activityType.toLowerCase()) {
      case 'internship':
        return { 
          stamp: "/internship_stamp.png", 
          signature: "/ananya_signature.png",
          signer: "Internship Coordinator" 
        };
      case 'webinar':
        return { 
          stamp: "/webinar_stamp.png", 
          signature: "/priya_signature.png",
          signer: "Webinar Host" 
        };
      case 'hackathon':
        return { 
          stamp: "/hackathon_stamp.png", 
          signature: "/ramesh_signature.png",
          signer: "Event Organizer" 
        };
      case 'volunteering':
      case 'volunteer work':
        return { 
          stamp: "/volunteer_stamp.png", 
          signature: "/volunteer_signature.png",
          signer: "Volunteer Coordinator" 
        };
      case 'project':
      case 'innovation':
        return { 
          stamp: "/project_stamp.png", 
          signature: "/project_signature.png",
          signer: "Project Mentor" 
        };
      default:
        return { 
          stamp: defaultStamp, 
          signature: defaultSignature,
          signer: defaultSigner 
        };
    }
  };

  const { stamp, signature, signer } = getStampAndSignature(activity);
  const randomDirectorName = "Prof. John Smith";
  const randomCoordinatorName = "Dr. Sarah Johnson";

  return (
    <div className={cn(
      "certificate-container relative border-8 border-certigen-gold rounded-lg p-8 shadow-lg bg-certigen-cream",
      "print:border-4 certificate-print-area",
      className
    )}>
      {/* QR Code placeholder */}
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
          </div>
        )}
        
        {/* Timestamp of activity */}
        <p className="text-sm text-certigen-gray mb-6">Completed on {date}</p>
        
        {/* Signature Area with enhanced styling */}
        <div className="flex w-full justify-around mb-6 mt-6">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {/* Director Stamp */}
              <div className="w-16 h-16 mx-auto opacity-70">
                <img src={stamp} alt="Official Stamp" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="w-36 border-b border-gray-400 pb-1 mb-1">
              <p className="font-certificate italic">{randomDirectorName}</p>
            </div>
            <p className="text-sm text-gray-600">Director</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {/* Program Coordinator Signature */}
              <div className="w-16 h-16 mx-auto opacity-70">
                <img src={signature} alt="Signature" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="w-36 border-b border-gray-400 pb-1 mb-1">
              <p className="font-certificate italic">{randomCoordinatorName}</p>
            </div>
            <p className="text-sm text-gray-600">{signer}</p>
          </div>
        </div>
        
        {/* Verification Badge */}
        <div className="flex items-center justify-center text-certigen-blue text-xs mb-3">
          <BadgeCheck className="mr-1 h-4 w-4" />
          <span>Digitally verified certificate</span>
        </div>
        
        <div className="text-xs text-gray-500 italic mt-2 opacity-60">
          Powered by CertiGen - Professional Certificate Generator
        </div>
      </div>
    </div>
  );
}

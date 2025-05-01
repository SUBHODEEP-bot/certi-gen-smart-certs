
import React from 'react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { getMarPointsForActivity } from '@/utils/certificate';

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
  const randomSignature = "John Doe";
  const currentDate = new Date();
  
  const name = certificateData?.fullName || "Your Name";
  const activity = certificateData?.activity || "Selected Activity";
  const date = certificateData?.activityDate 
    ? format(certificateData.activityDate, "d MMMM yyyy") 
    : "Date of Activity";
  const marPoints = certificateData?.activity ? getMarPointsForActivity(certificateData.activity) : 0;
  const certificateText = certificateData?.certificateText || "Certificate description will appear here after generation.";

  return (
    <div className={cn(
      "certificate-container border-8 border-certigen-gold rounded-lg p-8 shadow-lg bg-certigen-cream",
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
        
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1 text-certigen-navy">CERTIFICATE</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-1 text-certigen-navy">OF ACHIEVEMENT</h2>
          <div className="w-24 h-1 bg-certigen-gold mb-4"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-certificate font-bold mb-3 text-certigen-blue">
          {name}
        </h2>
        
        <div className="mb-4 px-4 text-sm md:text-base text-certigen-gray">
          {certificateText}
        </div>
        
        {activity && (
          <div className="my-3 border border-certigen-lightblue bg-blue-50 px-4 py-2 rounded-full flex items-center justify-center">
            <span className="font-medium text-certigen-blue">{activity}</span>
            <div className="mx-2 h-4 w-px bg-certigen-lightblue"></div>
            <span className="text-certigen-gold font-bold">{marPoints} MAR Points</span>
          </div>
        )}
        
        <div className="flex w-full justify-around mb-6 mt-6">
          <div className="flex flex-col items-center">
            <div className="w-36 border-b border-gray-400 pb-1 mb-1">
              <p className="font-certificate italic">{randomSignature}</p>
            </div>
            <p className="text-sm text-gray-600">Director</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-36 border-b border-gray-400 pb-1 mb-1">
              <p className="font-certificate italic">Jane Smith</p>
            </div>
            <p className="text-sm text-gray-600">Program Coordinator</p>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 italic mt-4 opacity-60">
          Powered by CertiGen - Instant Certificate Generator
        </div>
      </div>
    </div>
  );
}

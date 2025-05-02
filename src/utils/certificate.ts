
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';

// Generate a random certificate ID
export const generateCertificateId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return `CERT-${result}`;
};

// Get stamp and signature based on activity
export const getAssetsByActivityType = (activity: string) => {
  // Default values
  const defaultStamp = "/placeholder.svg";
  const defaultSignature = "/placeholder.svg";
  
  switch (activity.toLowerCase()) {
    case 'internship':
      return { 
        stamp: "/internship_stamp.png", 
        signature: "/ananya_signature.png",
        signer: "M.R Sumit Kumar Biswas",
        title: "Internship Director"
      };
    case 'webinar':
    case 'online course':
    case 'workshop':
      return { 
        stamp: "/webinar_stamp.png", 
        signature: "/priya_signature.png",
        signer: "Subham Mallick",
        title: "Course Director"
      };
    case 'hackathon':
      return { 
        stamp: "/hackathon_stamp.png", 
        signature: "/ramesh_signature.png",
        signer: "S.PAL",
        title: "Hackathon Director"
      };
    case 'volunteering':
    case 'volunteer work':
      return { 
        stamp: "/volunteer_stamp.png", 
        signature: "/volunteer_signature.png",
        signer: "Ananya Singh",
        title: "Volunteer Program Director"
      };
    case 'project':
    case 'innovation':
      return { 
        stamp: "/project_stamp.png", 
        signature: "/project_signature.png",
        signer: "Rajesh Kumar",
        title: "Innovation Lead"
      };
    default:
      return { 
        stamp: defaultStamp, 
        signature: defaultSignature,
        signer: "Priya Sharma",
        title: "Program Director"
      };
  }
};

// This function will return the MAR points for the activity
// We're keeping this function for compatibility even though we're removing MAR points references
export const getMarPointsForActivity = (activity: string): number => {
  switch (activity.toLowerCase()) {
    case 'internship':
      return 10;
    case 'webinar':
    case 'online course':
    case 'workshop':
      return 5;
    case 'hackathon':
      return 8;
    case 'volunteering':
    case 'volunteer work':
      return 6;
    case 'project':
    case 'innovation':
      return 10;
    default:
      return 5;
  }
};

export interface CertificateData {
  fullName: string;
  activity: string;
  activityDate: Date;
  certificateText?: string;
}

export const generatePdf = (certificateData: CertificateData, certificateId: string) => {
  const { fullName, activity, activityDate, certificateText } = certificateData;
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  // Document settings
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  
  // Add border
  doc.setDrawColor(245, 158, 11); // Gold color
  doc.setLineWidth(3);
  doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
  
  // Add background pattern (subtle dots)
  // This is just a placeholder - in a real app you'd add a pattern
  
  // Certificate heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(26, 86, 219); // Blue color
  doc.text("CERTIFICATE", pageWidth / 2, 40, { align: "center" });
  
  doc.setFontSize(24);
  doc.text("OF ACHIEVEMENT", pageWidth / 2, 50, { align: "center" });
  
  // Gold line separator
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2 - 30, 55, pageWidth / 2 + 30, 55);
  
  // Recipient name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(26, 86, 219);
  doc.text(fullName, pageWidth / 2, 70, { align: "center" });
  
  // Certificate text (AI-generated text)
  const maxWidth = pageWidth - (margin * 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  
  if (certificateText) {
    const splitText = doc.splitTextToSize(certificateText, maxWidth);
    doc.text(splitText, pageWidth / 2, 85, { align: "center" });
  } else {
    // Fallback certificate text if no AI-generated text
    doc.text("This is to certify that the above named individual has successfully", pageWidth / 2, 85, { align: "center" });
    doc.text(`participated in the ${activity} on ${format(activityDate, 'd MMMM yyyy')}.`, pageWidth / 2, 92, { align: "center" });
  }
  
  // Activity badge
  doc.setFillColor(240, 249, 255);
  doc.setDrawColor(147, 197, 253);
  doc.roundedRect(pageWidth / 2 - 30, 110, 60, 15, 5, 5, 'FD');
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 86, 219);
  doc.setFontSize(11);
  doc.text(activity, pageWidth / 2, 119, { align: "center" });
  
  // Get custom assets based on activity type
  const { signer, title } = getAssetsByActivityType(activity);
  
  // Signatures
  doc.setLineWidth(0.5);
  doc.setDrawColor(100, 100, 100);
  
  // Signature 1
  doc.line(60, 160, 120, 160);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.text("M.R Sumit Kumar Biswas", 90, 158, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Director", 90, 165, { align: "center" });
  
  // Signature 2
  doc.line(pageWidth - 120, 160, pageWidth - 60, 160);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.text(signer, pageWidth - 90, 158, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(title, pageWidth - 90, 165, { align: "center" });
  
  // Certificate ID and date - moved to bottom left
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Certificate ID: ${certificateId}`, margin + 5, pageHeight - 15);
  doc.text(`Issue Date: ${format(new Date(), 'd MMMM yyyy')}`, margin + 5, pageHeight - 10);
  
  // QR Code - moved to bottom right corner
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(pageWidth - margin - 25, pageHeight - margin - 25, 20, 20, 2, 2, 'F');
  doc.setFontSize(6);
  doc.setTextColor(150, 150, 150);
  doc.text("QR Code", pageWidth - margin - 15, pageHeight - margin - 15, { align: "center" });
  
  // Add appropriate stamp based on certificate type
  const { stamp } = getAssetsByActivityType(activity);
  // In a real implementation, you would load the stamp image
  // For now, we'll add a placeholder for the stamp
  doc.setFillColor(230, 230, 230, 0.5);
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(pageWidth - margin - 40, pageHeight - margin - 40, 35, 35, 3, 3, 'FD');
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Official Stamp", pageWidth - margin - 22.5, pageHeight - margin - 22.5, { align: "center" });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Powered by CertiGen - Professional Certificate Generator", pageWidth / 2, pageHeight - 5, { align: "center" });
  
  return doc;
};

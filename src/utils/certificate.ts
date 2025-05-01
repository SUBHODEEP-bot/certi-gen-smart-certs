
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

export interface CertificateData {
  fullName: string;
  activity: string;
  activityDate: Date;
}

export const generatePdf = (certificateData: CertificateData, certificateId: string) => {
  const { fullName, activity, activityDate } = certificateData;
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
  
  // Certificate text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text("This is to certify that", pageWidth / 2, 70, { align: "center" });
  
  // Recipient name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(26, 86, 219);
  doc.text(fullName, pageWidth / 2, 85, { align: "center" });
  
  // Certificate text continued
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text("has successfully participated in", pageWidth / 2, 100, { align: "center" });
  
  // Activity
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 44, 89); // Navy color
  doc.text(activity, pageWidth / 2, 115, { align: "center" });
  
  // Date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text(`on ${format(activityDate, 'd MMMM yyyy')}`, pageWidth / 2, 130, { align: "center" });
  
  // Signatures
  doc.setLineWidth(0.5);
  doc.setDrawColor(100, 100, 100);
  
  // Signature 1
  doc.line(60, 160, 120, 160);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.text("John Doe", 90, 158, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Director", 90, 165, { align: "center" });
  
  // Signature 2
  doc.line(pageWidth - 120, 160, pageWidth - 60, 160);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.text("Jane Smith", pageWidth - 90, 158, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Program Coordinator", pageWidth - 90, 165, { align: "center" });
  
  // Certificate ID and date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Certificate ID: ${certificateId}`, margin + 5, 25);
  doc.text(`Issue Date: ${format(new Date(), 'd MMMM yyyy')}`, pageWidth - margin - 5, 25, { align: "right" });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Powered by CertiGen - Instant Certificate Generator", pageWidth / 2, pageHeight - 15, { align: "center" });
  
  return doc;
};

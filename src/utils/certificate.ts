
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import QRCode from 'qrcode';
import { Settings } from '@/types/settings';

// Supported languages
export type SupportedLanguage = 'english' | 'bengali' | 'hindi';

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
  switch (activity.toLowerCase()) {
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

// This function will return the MAR points for the activity
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

// Certificate template types
export type CertificateTemplate = 'classic' | 'modern' | 'elegant' | 'professional';

export interface CertificateData {
  fullName: string;
  activity: string;
  activityDate: Date;
  certificateText?: string;
  collegeName?: string;
  language?: SupportedLanguage;
  template?: CertificateTemplate;
}

// Get certificate title translations
export const getCertificateTitle = (language: SupportedLanguage = 'english') => {
  switch (language) {
    case 'bengali':
      return {
        certificate: "সার্টিফিকেট",
        ofAchievement: "অর্জনের"
      };
    case 'hindi':
      return {
        certificate: "प्रमाणपत्र",
        ofAchievement: "उपलब्धि का"
      };
    default: // English
      return {
        certificate: "CERTIFICATE",
        ofAchievement: "OF ACHIEVEMENT"
      };
  }
};

// Generate QR Code for certificate verification
export const generateQRCode = async (certificateId: string): Promise<string> => {
  try {
    const verifyUrl = `https://scertigen.netlify.app/verify?cert_id=${certificateId}`;
    return await QRCode.toDataURL(verifyUrl);
  } catch (error) {
    console.error("Error generating QR code:", error);
    return ""; // Return empty string if QR generation fails
  }
};

export const generatePdf = async (certificateData: CertificateData, certificateId: string) => {
  const { 
    fullName, 
    activity, 
    activityDate, 
    certificateText, 
    collegeName = "Not Specified",
    language = 'english',
    template = 'classic' 
  } = certificateData;
  
  // Generate QR code for verification
  const qrCodeDataUrl = await generateQRCode(certificateId);
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  // Document settings
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  // Apply template styles
  applyTemplateStyle(doc, template, pageWidth, pageHeight, margin);
  
  // Get translated titles
  const titles = getCertificateTitle(language);
  
  // Add institution logo
  try {
    doc.addImage('/lovable-uploads/5428d286-91c0-4ac3-b06d-eb661c1ca0be.png', 'PNG', pageWidth / 2 - 20, 20, 40, 25);
  } catch (error) {
    console.error("Error adding logo to PDF:", error);
  }
  
  // Certificate heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(26, 86, 219); // Blue color
  doc.text(titles.certificate, pageWidth / 2, 55, { align: "center" });
  
  doc.setFontSize(24);
  doc.text(titles.ofAchievement, pageWidth / 2, 65, { align: "center" });
  
  // Gold line separator
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2 - 30, 70, pageWidth / 2 + 30, 70);
  
  // Certificate ID and Issue Date - Fixed position moved 30px left from right edge
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Certificate ID: ${certificateId}`, pageWidth - margin - 75, margin + 10);
  doc.text(`Issue Date: ${format(new Date(), 'd MMMM yyyy')}`, pageWidth - margin - 75, margin + 15);
  
  // Recipient name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(26, 86, 219);
  doc.text(fullName, pageWidth / 2, 85, { align: "center" });
  
  // College name
  doc.setFont("helvetica", "italic");
  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text(collegeName, pageWidth / 2, 95, { align: "center" });
  
  // Certificate text (AI-generated text)
  const maxWidth = pageWidth - (margin * 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  
  if (certificateText) {
    // Ensure we don't include unwanted text phrases
    let cleanedText = certificateText
      .replace(/\b\d+\s*MAR\s*Points\b/gi, '')
      .replace(/This achievement is worth.*?points\./gi, '')
      .replace(/meeting all the necessary requirements as per academic standards recognized by MAKAUT\./gi, '')
      .trim();
    
    const splitText = doc.splitTextToSize(cleanedText, maxWidth);
    doc.text(splitText, pageWidth / 2, 105, { align: "center" });
  } else {
    // Fallback certificate text if no AI-generated text
    doc.text("This is to certify that the above named individual has successfully", pageWidth / 2, 105, { align: "center" });
    doc.text(`participated in the ${activity} on ${format(activityDate, 'd MMMM yyyy')}.`, pageWidth / 2, 112, { align: "center" });
  }
  
  // Activity badge
  doc.setFillColor(240, 249, 255);
  doc.setDrawColor(147, 197, 253);
  doc.roundedRect(pageWidth / 2 - 30, 125, 60, 15, 5, 5, 'FD');
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 86, 219);
  doc.setFontSize(11);
  doc.text(activity, pageWidth / 2, 134, { align: "center" });
  
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
  
  // Add institution information at the bottom left
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIGEN", margin + 5, pageHeight - margin - 25);
  doc.setFont("helvetica", "normal");
  doc.text("Learn and Grow", margin + 5, pageHeight - margin - 20);
  doc.text("Kolkata, West Bengal, India", margin + 5, pageHeight - margin - 15);
  doc.text("certigen.official@gmail.com", margin + 5, pageHeight - margin - 10);
  doc.text("https://scertigen.netlify.app", margin + 5, pageHeight - margin - 5);
  
  // QR Code - positioned at bottom right with improved text alignment
  if (qrCodeDataUrl) {
    doc.addImage(qrCodeDataUrl, 'PNG', pageWidth - margin - 30, pageHeight - margin - 35, 25, 25);
    doc.setFontSize(7);
    doc.setTextColor(26, 86, 219);
    doc.setFont("helvetica", "bold");
    
    // Center-aligned text under the QR code
    const qrCenterX = pageWidth - margin - 17.5;
    
    doc.text("Online Verified Certificate", qrCenterX, pageHeight - margin - 8, { 
      align: "center" 
    });
    doc.text("Scan to Verify", qrCenterX, pageHeight - margin - 4, { 
      align: "center" 
    });
  }
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Powered by CertiGen", pageWidth / 2, pageHeight - 5, { align: "center" });
  
  return doc;
};

// Apply template styles to the certificate
const applyTemplateStyle = (doc: jsPDF, template: CertificateTemplate, pageWidth: number, pageHeight: number, margin: number) => {
  switch (template) {
    case 'modern':
      // Modern template with blue gradient border
      // Fix: Remove gradient creation - jsPDF doesn't support createLinearGradient
      doc.setDrawColor(67, 97, 238); // Blue color
      doc.setLineWidth(3);
      doc.roundedRect(margin, margin, pageWidth - (2 * margin), pageHeight - (2 * margin), 5, 5, 'S');
      break;
      
    case 'elegant':
      // Elegant template with decorative corners
      doc.setDrawColor(180, 140, 60); // Gold color
      doc.setLineWidth(2);
      doc.rect(margin, margin, pageWidth - (2 * margin), pageHeight - (2 * margin));
      
      // Corner decorations
      const cornerSize = 15;
      // Top left
      doc.line(margin, margin + cornerSize, margin + cornerSize, margin);
      // Top right
      doc.line(pageWidth - margin - cornerSize, margin, pageWidth - margin, margin + cornerSize);
      // Bottom left
      doc.line(margin, pageHeight - margin - cornerSize, margin + cornerSize, pageHeight - margin);
      // Bottom right
      doc.line(pageWidth - margin - cornerSize, pageHeight - margin, pageWidth - margin, pageHeight - margin - cornerSize);
      break;
      
    case 'professional':
      // Professional template with double border
      doc.setDrawColor(30, 50, 100); // Navy color
      doc.setLineWidth(3);
      doc.rect(margin, margin, pageWidth - (2 * margin), pageHeight - (2 * margin));
      
      doc.setDrawColor(60, 100, 200); // Light blue
      doc.setLineWidth(1);
      doc.rect(margin + 3, margin + 3, pageWidth - (2 * margin) - 6, pageHeight - (2 * margin) - 6);
      break;
      
    case 'classic':
    default:
      // Classic template with gold border (default)
      doc.setDrawColor(245, 158, 11); // Gold color
      doc.setLineWidth(3);
      doc.rect(margin, margin, pageWidth - (2 * margin), pageHeight - (2 * margin));
      break;
  }
};

// Admin dashboard analytics
export interface AnalyticsData {
  totalCertificates: number;
  revenue: number;
  topActivities: Record<string, number>;
  dailyStats: Record<string, number>;
}

// Mock function to save generated certificate data to local storage (for admin analytics)
export const saveGeneratedCertificateData = (certificateData: CertificateData) => {
  try {
    // Get existing data
    const existingDataStr = localStorage.getItem('certigenAdminData');
    const existingData = existingDataStr ? JSON.parse(existingDataStr) : {
      certificates: [],
      totalCertificates: 0,
      revenue: 0,
      topActivities: {},
      dailyStats: {}
    };
    
    // Update data
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Update certificates array
    existingData.certificates.push({
      ...certificateData,
      generatedAt: new Date().toISOString(),
      price: 2
    });
    
    // Update counts
    existingData.totalCertificates += 1;
    existingData.revenue += 2; // ₹2 per certificate
    
    // Update activity counts
    const activity = certificateData.activity.toLowerCase();
    existingData.topActivities[activity] = (existingData.topActivities[activity] || 0) + 1;
    
    // Update daily stats
    existingData.dailyStats[today] = (existingData.dailyStats[today] || 0) + 1;
    
    // Save back to storage
    localStorage.setItem('certigenAdminData', JSON.stringify(existingData));
    
    return true;
  } catch (error) {
    console.error("Error saving certificate data:", error);
    return false;
  }
};

// Get admin analytics data
export const getAnalyticsData = (): AnalyticsData => {
  try {
    const dataStr = localStorage.getItem('certigenAdminData');
    if (!dataStr) {
      return {
        totalCertificates: 0,
        revenue: 0,
        topActivities: {},
        dailyStats: {}
      };
    }
    
    const data = JSON.parse(dataStr);
    return {
      totalCertificates: data.totalCertificates || 0,
      revenue: data.revenue || 0,
      topActivities: data.topActivities || {},
      dailyStats: data.dailyStats || {}
    };
  } catch (error) {
    console.error("Error retrieving analytics data:", error);
    return {
      totalCertificates: 0,
      revenue: 0,
      topActivities: {},
      dailyStats: {}
    };
  }
};

export const getAllGeneratedCertificates = () => {
  try {
    const dataStr = localStorage.getItem('certigenAdminData');
    if (!dataStr) return [];
    
    const data = JSON.parse(dataStr);
    return data.certificates || [];
  } catch (error) {
    console.error("Error retrieving certificates:", error);
    return [];
  }
};

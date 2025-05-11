
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import CertificatePreview from './CertificatePreview';
import { getAllGeneratedCertificates, generatePdf } from '@/utils/certificate';
import { Eye, Download, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Certificate {
  fullName: string;
  activity: string;
  activityDate: string;
  certificateText?: string;
  collegeName: string;
  generatedAt: string;
  price: number;
  id?: string;
}

const AdminCertificateList = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load certificates from global storage
    const loadedCertificates = getAllGeneratedCertificates();
    
    // Sort by date (newest first)
    loadedCertificates.sort((a: Certificate, b: Certificate) => {
      return new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime();
    });
    
    setCertificates(loadedCertificates);
  }, []);
  
  const handlePreview = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsPreviewOpen(true);
  };
  
  const handleDownload = async (certificate: Certificate) => {
    try {
      // Format date correctly for the PDF generation
      const parsedDate = new Date(certificate.activityDate);
      const certificateData = {
        ...certificate,
        activityDate: parsedDate
      };
      
      // Generate certificate ID if not present
      const certId = certificate.id || `CERT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      
      const doc = await generatePdf(certificateData, certId);
      doc.save(`${certificate.fullName.replace(/\s+/g, '_')}_Certificate.pdf`);
      
      toast({
        title: "Download Started",
        description: "Certificate is being downloaded."
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download certificate.",
        variant: "destructive"
      });
    }
  };
  
  const handleDelete = (index: number) => {
    try {
      // Get current global data
      const data = JSON.parse(localStorage.getItem('certigenGlobalCertificates') || '{}');
      
      // Remove certificate at specified index
      if (data.certificates && data.certificates.length > index) {
        data.certificates.splice(index, 1);
        data.totalCertificates = data.certificates.length;
        
        // Recalculate revenue
        data.revenue = data.certificates.reduce((sum: number, cert: any) => sum + (cert.price || 0), 0);
        
        // Update global storage
        localStorage.setItem('certigenGlobalCertificates', JSON.stringify(data));
        
        // Also update admin data to stay in sync
        localStorage.setItem('certigenAdminData', JSON.stringify(data));
        
        // Update state
        setCertificates(data.certificates);
        
        toast({
          title: "Certificate Deleted",
          description: "Certificate has been deleted successfully."
        });
      }
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete certificate.",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generated Certificates</h2>
      
      {certificates.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-200">
          <p className="text-gray-500">No certificates have been generated yet.</p>
        </div>
      ) : (
        <Table>
          <TableCaption>A list of all generated certificates.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Generated On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((certificate, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{certificate.fullName}</TableCell>
                <TableCell>{certificate.collegeName}</TableCell>
                <TableCell>{certificate.activity}</TableCell>
                <TableCell>
                  {format(new Date(certificate.activityDate), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  {format(new Date(certificate.generatedAt), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handlePreview(certificate)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(certificate)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-white hover:bg-red-600"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      {/* Certificate Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
            <DialogDescription>
              Preview of {selectedCertificate?.fullName}'s certificate.
            </DialogDescription>
          </DialogHeader>
          
          {selectedCertificate && (
            <div className="mt-4">
              <CertificatePreview
                certificateData={{
                  ...selectedCertificate,
                  activityDate: new Date(selectedCertificate.activityDate)
                }}
                certificateId={selectedCertificate.id || "PREVIEW"}
              />
              
              <div className="flex justify-end mt-4">
                <Button onClick={() => handleDownload(selectedCertificate)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCertificateList;

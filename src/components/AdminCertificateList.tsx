
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
import { Eye, Download, Trash2, RefreshCw } from 'lucide-react';
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pollingIntervalId, setPollingIntervalId] = useState<number | null>(null);
  const { toast } = useToast();
  
  const loadCertificates = () => {
    // Load certificates from all storage locations
    const loadedCertificates = getAllGeneratedCertificates();
    
    // Check if we have new certificates
    if (certificates.length !== loadedCertificates.length) {
      setCertificates(loadedCertificates);
      
      if (certificates.length > 0 && loadedCertificates.length > certificates.length) {
        toast({
          title: "New Certificates Available",
          description: `${loadedCertificates.length - certificates.length} new certificate(s) found.`
        });
      }
    } else {
      // Check if any certificates have changed
      const hasChanges = loadedCertificates.some((cert, index) => 
        index < certificates.length && cert.id !== certificates[index].id
      );
      
      if (hasChanges) {
        setCertificates(loadedCertificates);
      }
    }
  };
  
  // Function to start regular polling for updates
  const startPolling = () => {
    if (pollingIntervalId) {
      clearInterval(pollingIntervalId);
    }
    
    // Check for updates every 15 seconds
    const intervalId = window.setInterval(() => {
      loadCertificates();
    }, 15000);
    
    setPollingIntervalId(intervalId);
  };
  
  useEffect(() => {
    // Initial load
    loadCertificates();
    
    // Start polling for updates
    startPolling();
    
    // Add a one-time storage event listener for cross-tab communication
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === 'certigenGlobalCertificates' || 
        event.key === 'certigenNetlifyStorage' || 
        event.key === 'certigenDeployedData'
      ) {
        loadCertificates();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up on component unmount
    return () => {
      if (pollingIntervalId) {
        clearInterval(pollingIntervalId);
      }
      window.removeEventListener('storage', handleStorageChange);
    };
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
      // Get current certificates
      const updatedCertificates = [...certificates];
      
      // Store the ID of the certificate we're deleting
      const deletedCertId = updatedCertificates[index].id;
      
      // Remove certificate at specified index
      updatedCertificates.splice(index, 1);
      
      // Update state
      setCertificates(updatedCertificates);
      
      // Function to update storage
      const updateStorageData = (key: string, storageType: 'local' | 'session') => {
        const storage = storageType === 'local' ? localStorage : sessionStorage;
        const dataStr = storage.getItem(key);
        if (dataStr) {
          try {
            const data = JSON.parse(dataStr);
            if (data.certificates) {
              data.certificates = data.certificates.filter((cert: any) => cert.id !== deletedCertId);
              data.totalCertificates = data.certificates.length;
              data.revenue = data.certificates.length * 2;
              
              // If it's a sync storage, update the lastUpdated field
              if (key === 'certigenNetlifyStorage' || key === 'certigenDeployedData') {
                data.lastUpdated = new Date().toISOString();
                data.syncId = Math.random().toString(36).substring(2, 15);
              }
              
              storage.setItem(key, JSON.stringify(data));
            }
          } catch (e) {
            console.error(`Error updating ${key}:`, e);
          }
        }
      };
      
      // Update all storage locations
      updateStorageData('certigenGlobalCertificates', 'local');
      updateStorageData('certigenNetlifyStorage', 'local');
      updateStorageData('certigenDeployedData', 'session');
      updateStorageData('certigenAdminData', 'local');
      
      toast({
        title: "Certificate Deleted",
        description: "Certificate has been deleted successfully."
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete certificate.",
        variant: "destructive"
      });
    }
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    loadCertificates();
    startPolling(); // Restart the polling on manual refresh
    
    toast({
      title: "Refreshed",
      description: "Certificate list has been refreshed."
    });
    
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Generated Certificates</h2>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
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
              <TableRow key={certificate.id || index}>
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

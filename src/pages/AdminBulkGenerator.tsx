
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, FileText, Trash2, Check, X } from 'lucide-react';
import { BatchCertificateData } from '@/types/settings';
import { SupportedLanguage, CertificateTemplate, CertificateData, generateCertificateId, generatePdf, saveGeneratedCertificateData } from '@/utils/certificate';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminBulkGenerator = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<BatchCertificateData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>('english');
  const [template, setTemplate] = useState<CertificateTemplate>('classic');
  const [generatedCertificates, setGeneratedCertificates] = useState<{ id: string, data: CertificateData }[]>([]);
  const [step, setStep] = useState(1);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setCsvFile(file);
    
    // Parse CSV
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',');
      
      const data: BatchCertificateData[] = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = lines[i].split(',');
        const entry: BatchCertificateData = {
          fullName: values[0] || '',
          collegeName: values[1] || '',
          activity: values[2] || '',
          activityDate: values[3] || format(new Date(), 'yyyy-MM-dd'),
          certificateText: values[4] || '',
        };
        data.push(entry);
      }
      
      setParsedData(data);
      setStep(2);
      
      toast({
        title: "CSV Uploaded",
        description: `${data.length} entries found in the CSV file.`
      });
    };
    
    reader.readAsText(file);
  };
  
  const handleGenerateBulk = async () => {
    setIsProcessing(true);
    
    try {
      const generated: { id: string, data: CertificateData }[] = [];
      
      // Process each entry
      for (const entry of parsedData) {
        const certId = generateCertificateId();
        
        const certificateData: CertificateData = {
          fullName: entry.fullName,
          collegeName: entry.collegeName,
          activity: entry.activity,
          activityDate: new Date(entry.activityDate),
          certificateText: entry.certificateText || 
            `This is to certify that ${entry.fullName} from ${entry.collegeName} has successfully participated in ${entry.activity} conducted on ${format(new Date(entry.activityDate), 'd MMMM yyyy')}.`,
          language,
          template
        };
        
        // Save to analytics
        saveGeneratedCertificateData(certificateData);
        
        generated.push({
          id: certId,
          data: certificateData
        });
      }
      
      setGeneratedCertificates(generated);
      setStep(3);
      
      toast({
        title: "Certificates Generated",
        description: `Successfully generated ${generated.length} certificates.`
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "An error occurred during bulk certificate generation.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const downloadTemplate = () => {
    const templateData = "Full Name,College Name,Activity,Activity Date (YYYY-MM-DD),Certificate Text (Optional)\nJohn Doe,Delhi University,Workshop,2023-05-15,This is a custom certificate text";
    const blob = new Blob([templateData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'certificate_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleDownloadCertificate = async (index: number) => {
    try {
      const cert = generatedCertificates[index];
      const doc = await generatePdf(cert.data, cert.id);
      doc.save(`${cert.data.fullName.replace(/\s+/g, '_')}_Certificate.pdf`);
      
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
  
  const handleDownloadAll = async () => {
    try {
      toast({
        title: "Preparing Downloads",
        description: "Preparing all certificates for download. Please wait..."
      });
      
      // In a real app, you might use JSZip to create a ZIP archive
      // For simplicity, we'll download them one by one
      for (let i = 0; i < generatedCertificates.length; i++) {
        const cert = generatedCertificates[i];
        const doc = await generatePdf(cert.data, cert.id);
        doc.save(`${cert.data.fullName.replace(/\s+/g, '_')}_Certificate.pdf`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Short delay between downloads
      }
      
      toast({
        title: "Downloads Complete",
        description: `${generatedCertificates.length} certificates have been downloaded.`
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download certificates.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bulk Certificate Generator</h2>
      
      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload CSV</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload CSV File</CardTitle>
                <CardDescription>
                  Upload a CSV file with certificate data to generate certificates in bulk.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={downloadTemplate}>
                    <FileText className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                  
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CSV File
                  </Button>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <h3 className="font-medium text-amber-800 mb-2">CSV Format Requirements</h3>
                  <p className="text-amber-700 text-sm">
                    Your CSV file should include the following columns:
                  </p>
                  <ul className="list-disc list-inside text-sm text-amber-700 mt-1 space-y-1">
                    <li>Full Name</li>
                    <li>College Name</li>
                    <li>Activity</li>
                    <li>Activity Date (YYYY-MM-DD)</li>
                    <li>Certificate Text (Optional)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
          
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Data</CardTitle>
                <CardDescription>
                  Review the data from the CSV file before generating certificates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1/2">
                    <Label htmlFor="language">Certificate Language</Label>
                    <Select value={language} onValueChange={(value) => setLanguage(value as SupportedLanguage)}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="bengali">Bengali</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-1/2">
                    <Label htmlFor="template">Certificate Template</Label>
                    <Select value={template} onValueChange={(value) => setTemplate(value as CertificateTemplate)}>
                      <SelectTrigger id="template">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="elegant">Elegant</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <ScrollArea className="h-80">
                    <table className="w-full">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {parsedData.map((entry, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{entry.fullName}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{entry.collegeName}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{entry.activity}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{entry.activityDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setCsvFile(null);
                      setParsedData([]);
                      setStep(1);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  
                  <Button 
                    onClick={handleGenerateBulk}
                    disabled={isProcessing || parsedData.length === 0}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Generate {parsedData.length} Certificates
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Certificates</CardTitle>
                <CardDescription>
                  {generatedCertificates.length} certificates have been generated successfully.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-md overflow-hidden">
                  <ScrollArea className="h-80">
                    <table className="w-full">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {generatedCertificates.map((cert, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{cert.data.fullName}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{cert.data.collegeName}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{cert.id}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDownloadCertificate(index)}
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setCsvFile(null);
                      setParsedData([]);
                      setGeneratedCertificates([]);
                      setStep(1);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear & Start New
                  </Button>
                  
                  <Button onClick={handleDownloadAll}>
                    <Download className="h-4 w-4 mr-2" />
                    Download All Certificates
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Manual Certificate Entry</CardTitle>
              <CardDescription>
                This feature allows you to manually enter multiple certificate details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-gray-500">
                <p>Manual entry feature will be available in the next update.</p>
                <Button className="mt-4" onClick={() => document.querySelector('[data-value="upload"]')?.click()}>
                  Switch to CSV Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminBulkGenerator;

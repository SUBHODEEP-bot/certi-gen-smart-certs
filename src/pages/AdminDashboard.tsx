
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AdminBulkGenerator from './AdminBulkGenerator';
import AdminAnalytics from './AdminAnalytics';
import AdminCertificateList from '@/components/AdminCertificateList';
import { useToast } from '@/hooks/use-toast';
import { Layout, Upload, BarChart4, List } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check admin authentication from both sessionStorage and localStorage
  useEffect(() => {
    const isAdminSession = sessionStorage.getItem('certigenAdmin') === 'true';
    const isAdminLocal = localStorage.getItem('certigenAdminAuth') === 'true';
    
    if (!isAdminSession && !isAdminLocal) {
      navigate('/admin');
      toast({
        title: "Access Denied",
        description: "Please login to access the admin dashboard.",
        variant: "destructive"
      });
    }
    
    // Force an immediate reload of certificate data for the admin
    // This helps ensure all certificates are loaded from all storage locations
    try {
      // Sync Netlify storage data with global storage data
      const syncNetlifyData = () => {
        try {
          const netlifyDataStr = localStorage.getItem('certigenNetlifyDeployedData') || 
                              sessionStorage.getItem('certigenNetlifyDeployedData') || 
                              localStorage.getItem('certigenNetlifyStorage') || 
                              sessionStorage.getItem('certigenDeployedData');
                              
          if (netlifyDataStr) {
            // Update global storage with Netlify data
            localStorage.setItem('certigenGlobalCertificates', netlifyDataStr);
            
            // Also update all other storage locations for consistency
            localStorage.setItem('certigenNetlifyDeployedData', netlifyDataStr);
            sessionStorage.setItem('certigenNetlifyDeployedData', netlifyDataStr);
            localStorage.setItem('certigenNetlifyStorage', netlifyDataStr);
            sessionStorage.setItem('certigenDeployedData', netlifyDataStr);
          }
          
          // Also check for global data and sync it back to Netlify storage
          const globalDataStr = localStorage.getItem('certigenGlobalCertificates');
          if (globalDataStr) {
            localStorage.setItem('certigenNetlifyDeployedData', globalDataStr);
            sessionStorage.setItem('certigenNetlifyDeployedData', globalDataStr);
          }
        } catch (err) {
          console.error("Error syncing Netlify data:", err);
        }
      };
      
      // Sync data immediately when admin dashboard loads
      syncNetlifyData();
      
      // Trigger storage event to refresh data across tabs
      const refreshEvent = new Event('adminRefresh');
      window.dispatchEvent(refreshEvent);
    } catch (err) {
      console.error("Error syncing admin data:", err);
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    // Clear admin authentication from both storage methods
    sessionStorage.removeItem('certigenAdmin');
    localStorage.removeItem('certigenAdminAuth');
    navigate('/admin');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-certigen-blue text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">CertiGen Admin Dashboard</h1>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-certigen-blue" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <Tabs defaultValue="certificates" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="certificates" className="flex items-center">
              <List className="h-4 w-4 mr-2" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Generator
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart4 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="certificates">
            <AdminCertificateList />
          </TabsContent>
          
          <TabsContent value="bulk">
            <AdminBulkGenerator />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

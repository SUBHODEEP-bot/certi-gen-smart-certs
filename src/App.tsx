
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Generator from "./pages/Generator";
import Verify from "./pages/Verify";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminBulkGenerator from "./pages/AdminBulkGenerator";
import AdminAnalytics from "./pages/AdminAnalytics";
import CertificateGeneratorPage from "./pages/CertificateGeneratorPage";
import Auth from "./pages/Auth";
import AdminCertificates from "./pages/AdminCertificates";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/certificate" element={<CertificateGeneratorPage />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/certificates" element={<AdminCertificates />} />
            <Route path="/admin/bulk" element={<AdminBulkGenerator />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

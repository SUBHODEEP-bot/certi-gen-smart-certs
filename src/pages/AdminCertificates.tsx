
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronDown, Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Certificate {
  id: string;
  name: string;
  email: string;
  course_name: string;
  issue_date: string;
  created_at: string;
  generated_by?: string;  // Make this optional to fix the type error
}

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Certificate>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect non-admin users
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [isAdmin, isLoading, navigate, toast]);

  // Fetch certificates function
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      
      // Using the built-in Supabase client to fetch all certificates
      // No user-specific filters applied to ensure admin sees all certificates
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order(sortField, { ascending: sortDirection === 'asc' });

      if (error) {
        throw error;
      }

      // Set all certificates to state without filtering
      setCertificates(data || []);
      
      toast({
        title: "Certificates Loaded",
        description: `Successfully loaded ${data?.length || 0} certificates from database.`
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch certificates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and on sort changes
  useEffect(() => {
    if (isAdmin) {
      fetchCertificates();
    }
  }, [isAdmin, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field: keyof Certificate) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchCertificates();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 container mx-auto px-4 py-12 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin: Certificate Management</h1>
          
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sort By <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSort('name')}>
                  Sort by Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('email')}>
                  Sort by Email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('course_name')}>
                  Sort by Course
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('issue_date')}>
                  Sort by Issue Date
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('created_at')}>
                  Sort by Created Date
                </DropdownMenuItem>
                {/* Only show this option if generated_by exists */}
                <DropdownMenuItem onClick={() => handleSort('generated_by' as keyof Certificate)}>
                  Sort by Generated By
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-xl">No certificates found</p>
          </div>
        ) : (
          <div className="rounded-md border shadow-sm overflow-auto">
            <Table>
              <TableCaption>List of all generated certificates</TableCaption>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                    Name
                    {sortField === 'name' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('email')} className="cursor-pointer">
                    Email
                    {sortField === 'email' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('course_name')} className="cursor-pointer">
                    Course
                    {sortField === 'course_name' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('issue_date')} className="cursor-pointer">
                    Issue Date
                    {sortField === 'issue_date' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('created_at')} className="cursor-pointer">
                    Created At
                    {sortField === 'created_at' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('generated_by' as keyof Certificate)} className="cursor-pointer">
                    Generated By
                    {sortField === 'generated_by' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell className="font-medium">{certificate.name}</TableCell>
                    <TableCell>{certificate.email}</TableCell>
                    <TableCell>{certificate.course_name}</TableCell>
                    <TableCell>{format(new Date(certificate.issue_date), 'PP')}</TableCell>
                    <TableCell>{format(new Date(certificate.created_at), 'PPp')}</TableCell>
                    <TableCell>{certificate.generated_by || "Unknown"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminCertificates;

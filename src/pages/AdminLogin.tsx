
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const ADMIN_USERNAME = "SUBHODEEP PAL";
  const ADMIN_PASSWORD = "Pal@2005";
  const MAX_ATTEMPTS = 5;
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set admin session
        localStorage.setItem('certigenAdmin', 'true');
        navigate('/admin/dashboard');
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard."
        });
      } else {
        setAttempts(prev => prev + 1);
        
        toast({
          title: "Login Failed",
          description: attempts >= MAX_ATTEMPTS - 1 
            ? "Too many failed attempts. Please try again later." 
            : "Invalid username or password.",
          variant: "destructive"
        });
        
        if (attempts >= MAX_ATTEMPTS - 1) {
          // Lock out after too many attempts
          setTimeout(() => {
            setAttempts(0);
          }, 30000); // Reset after 30 seconds
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-4">
            <ShieldAlert className="h-8 w-8 text-certigen-blue mr-2" />
            <h1 className="text-2xl font-bold text-center text-certigen-navy">Admin Login</h1>
          </div>
          
          {attempts >= MAX_ATTEMPTS ? (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
              <p>Too many failed attempts. Please try again later.</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="w-full"
                  disabled={isLoading || attempts >= MAX_ATTEMPTS}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full"
                  disabled={isLoading || attempts >= MAX_ATTEMPTS}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-certigen-blue hover:bg-certigen-navy"
                disabled={isLoading || attempts >= MAX_ATTEMPTS}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          )}
          
          <div className="mt-4 text-sm text-center text-gray-500">
            <p className="text-xs text-certigen-blue">This panel is only accessible to authorized administrators</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login - in a real app, this would be an API call
    setTimeout(() => {
      // Use a simple hardcoded admin credential for demo
      if (username === 'admin' && password === 'admin123') {
        // Set admin session
        localStorage.setItem('certigenAdmin', 'true');
        navigate('/admin/dashboard');
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard."
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-certigen-navy mb-6">Admin Login</h1>
          
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
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-certigen-blue hover:bg-certigen-navy"
              disabled={isLoading}
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
          
          <div className="mt-4 text-sm text-center text-gray-500">
            <p>Use the demo credentials to login:</p>
            <p>Username: admin | Password: admin123</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;

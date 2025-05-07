
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Handle smooth scroll to MAR points section with improved reliability
  const scrollToMarPoints = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Close menu if open
    setIsMenuOpen(false);
    
    // Use setTimeout to ensure the scroll happens after any route changes
    setTimeout(() => {
      const marPointsSection = document.getElementById('mar-points');
      if (marPointsSection) {
        marPointsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If we're not on homepage, navigate to homepage first then scroll
        if (location.pathname !== '/') {
          window.location.href = '/#mar-points';
        }
      }
    }, 100);
  };

  // Make sure all links work correctly
  const LinkComponent = ({ to, className, children, onClick }: { 
    to: string; 
    className?: string; 
    children: React.ReactNode; 
    onClick?: () => void 
  }) => {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="container flex items-center justify-between h-16 mx-auto px-4">
        <LinkComponent to="/" className="flex items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-certigen-navy">
              Certi<span className="text-certigen-blue">Gen</span>
            </span>
            <span className="ml-2 bg-certigen-blue text-white text-xs px-2 py-1 rounded-md">MAKAUT</span>
          </div>
        </LinkComponent>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <LinkComponent to="/" className="text-gray-700 hover:text-certigen-blue transition-colors">
            Home
          </LinkComponent>
          <LinkComponent to="/generator" className="text-gray-700 hover:text-certigen-blue transition-colors">
            Generate Certificate
          </LinkComponent>
          <LinkComponent to="/verify" className="text-gray-700 hover:text-certigen-blue transition-colors">
            Verify Certificate
          </LinkComponent>
          <a href="#mar-points" className="text-gray-700 hover:text-certigen-blue transition-colors" onClick={scrollToMarPoints}>
            MAR Points
          </a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" asChild>
            <LinkComponent to="/admin">
              Admin Login
            </LinkComponent>
          </Button>
          <Button className="bg-certigen-blue hover:bg-certigen-navy" asChild>
            <LinkComponent to="/generator">
              Get Started
            </LinkComponent>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4 bg-white border-t border-gray-100 px-4`}>
        <div className="flex flex-col space-y-3">
          <LinkComponent
            to="/" 
            className="text-gray-700 hover:text-certigen-blue py-2 px-3 rounded-md hover:bg-blue-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </LinkComponent>
          <LinkComponent
            to="/generator" 
            className="text-gray-700 hover:text-certigen-blue py-2 px-3 rounded-md hover:bg-blue-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Generate Certificate
          </LinkComponent>
          <LinkComponent
            to="/verify" 
            className="text-gray-700 hover:text-certigen-blue py-2 px-3 rounded-md hover:bg-blue-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Verify Certificate
          </LinkComponent>
          <a 
            href="#mar-points" 
            className="text-gray-700 hover:text-certigen-blue py-2 px-3 rounded-md hover:bg-blue-50"
            onClick={scrollToMarPoints}
          >
            MAR Points
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <Button variant="outline" className="w-full justify-center" asChild>
              <LinkComponent to="/admin">
                Admin Login
              </LinkComponent>
            </Button>
            <Button className="w-full justify-center bg-certigen-blue hover:bg-certigen-navy" asChild>
              <LinkComponent to="/generator">
                Get Started
              </LinkComponent>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

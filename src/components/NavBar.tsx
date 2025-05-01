
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="container flex items-center justify-between h-16 mx-auto px-4">
        <Link to="/" className="flex items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-certigen-navy">
              Certi<span className="text-certigen-blue">Gen</span>
            </span>
            <span className="ml-2 bg-certigen-blue text-white text-xs px-2 py-1 rounded-md">MAKAUT</span>
          </div>
        </Link>
        
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
          <Link to="/" className="text-gray-700 hover:text-certigen-blue transition-colors">
            Home
          </Link>
          <Link to="/generator" className="text-gray-700 hover:text-certigen-blue transition-colors">
            Generate Certificate
          </Link>
          <Link to="/verify" className="text-gray-700 hover:text-certigen-blue transition-colors">
            Verify Certificate
          </Link>
          <a href="#mar-points" className="text-gray-700 hover:text-certigen-blue transition-colors">
            MAR Points
          </a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline">
            Admin Login
          </Button>
          <Button className="bg-certigen-blue hover:bg-certigen-navy">
            Get Started
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4 bg-white border-t border-gray-100 px-4`}>
        <div className="flex flex-col space-y-3">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-certigen-blue py-2 px-3 rounded-md hover:bg-blue-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/generator" 
            className="text-gray-700 hover:text-certigen-blue py-2 px-3 rounded-md hover:bg-blue-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Generate Certificate
          </Link>
          <Link 
            to="/verify" 
            className="text-gray-700 hover:text-certigen-blue py-2 px-3 rounded-md hover:bg-blue-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Verify Certificate
          </Link>
          <a 
            href="#mar-points" 
            className="text-gray-700 hover:text-certigen-blue py-2 px-3 rounded-md hover:bg-blue-50"
            onClick={() => setIsMenuOpen(false)}
          >
            MAR Points
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <Button variant="outline" className="w-full justify-center">
              Admin Login
            </Button>
            <Button className="w-full justify-center bg-certigen-blue hover:bg-certigen-navy">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NavBar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16 mx-auto px-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-certigen-navy">
            Certi<span className="text-certigen-blue">Gen</span>
          </span>
        </Link>
        
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
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex">
            Login
          </Button>
          <Button className="bg-certigen-blue hover:bg-certigen-navy">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}

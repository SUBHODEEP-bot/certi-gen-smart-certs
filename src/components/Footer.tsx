import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function Footer() {
  // Check if we're in a route context
  const location = useLocation();

  // This will store either Link components or regular anchor tags
  const LinkComponent = ({
    to,
    children,
    className
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    return <Link to={to} className={className}>
        {children}
      </Link>;
  };
  return <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-certigen-navy">
              Certi<span className="text-certigen-blue">Gen</span>
            </h3>
            <p className="text-gray-600 mb-4">Generate professional certificates instantly for just ₹2 per certificate.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-700">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <LinkComponent to="/" className="text-gray-600 hover:text-certigen-blue">
                  Home
                </LinkComponent>
              </li>
              <li>
                <LinkComponent to="/generator" className="text-gray-600 hover:text-certigen-blue">
                  Generate Certificate
                </LinkComponent>
              </li>
              <li>
                <LinkComponent to="/verify" className="text-gray-600 hover:text-certigen-blue">
                  Verify Certificate
                </LinkComponent>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-700">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Email: support@certigen.com</li>
              
              <li>Address: Bangalore, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} CertiGen. All rights reserved.</p>
        </div>
      </div>
    </footer>;
}
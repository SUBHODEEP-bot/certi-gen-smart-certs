
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-certigen-navy">
              Certi<span className="text-certigen-blue">Gen</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Generate professional certificates instantly for just ₹5 per certificate.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-700">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-certigen-blue">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/generator" className="text-gray-600 hover:text-certigen-blue">
                  Generate Certificate
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-gray-600 hover:text-certigen-blue">
                  Verify Certificate
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-700">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Email: support@certigen.com</li>
              <li>Phone: +91 9876543210</li>
              <li>Address: Bangalore, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} CertiGen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

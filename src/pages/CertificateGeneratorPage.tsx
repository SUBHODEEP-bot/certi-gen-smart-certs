
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CertificateGenerator from '@/components/CertificateGenerator';

const CertificateGeneratorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Certificate Generator</h1>
        <CertificateGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default CertificateGeneratorPage;


import React from 'react';
import { Calendar, FileText, Download, BadgeCheck } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-certigen-blue" />,
      title: "Beautiful Templates",
      description: "Professional certificate designs that stand out and look impressive."
    },
    {
      icon: <Calendar className="h-10 w-10 text-certigen-blue" />,
      title: "Instant Generation",
      description: "Create and download your certificate in seconds, no waiting required."
    },
    {
      icon: <Download className="h-10 w-10 text-certigen-blue" />,
      title: "PDF Download",
      description: "Get high-quality PDF certificates ready for printing or sharing digitally."
    },
    {
      icon: <BadgeCheck className="h-10 w-10 text-certigen-blue" />,
      title: "Verification System",
      description: "Each certificate includes a unique ID for easy verification and authenticity."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-certigen-navy mb-4">Why Choose CertiGen?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make certificate generation simple, affordable, and professional. 
            Perfect for educators, event organizers, and HR professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-certigen-navy">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

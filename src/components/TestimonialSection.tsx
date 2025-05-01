
import React from 'react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      name: "Priya Sharma",
      role: "Workshop Organizer",
      content: "CertiGen has simplified our certificate process tremendously. Our participants love the professional design and quick delivery. Worth every penny!"
    },
    {
      name: "Rahul Verma",
      role: "Course Instructor",
      content: "I was spending hours creating certificates for my students. Now with CertiGen, it takes just minutes and looks even better than what I was making before."
    },
    {
      name: "Anita Desai",
      role: "HR Manager",
      content: "The verification system gives our training certificates more credibility. Our employees appreciate having professionally designed certificates they can show off."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-certigen-navy mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by educators, event organizers, and HR professionals across India.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="mb-4">
                <svg className="h-8 w-8 text-certigen-gold" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z"/>
                </svg>
              </div>
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div>
                <h4 className="font-semibold text-certigen-navy">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

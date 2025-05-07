
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Code, GraduationCap, BookOpen, Users, Star, FileText, TreeDeciduous, Heart, Medal, Building, Pen } from 'lucide-react';

interface PointCardProps {
  title: string;
  subtitle?: string;
  points: number;
  maxPoints?: number;
  icon: React.ReactNode;
  color: string;
}

const PointCard = ({ title, subtitle, points, maxPoints, icon, color }: PointCardProps) => (
  <Card className="card-hover border-t-4" style={{ borderTopColor: color }}>
    <CardContent className="pt-6">
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}15` }}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg text-certigen-navy">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold" style={{ color }}>{points}</span>
            <span className="ml-2 text-gray-600">MAR Points</span>
            {maxPoints && <span className="ml-2 text-sm text-gray-500">(max {maxPoints})</span>}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function MarPointsSection() {
  const pointCategories = [
    {
      title: "MOOCs",
      subtitle: "12 weeks duration/40 hours",
      points: 20,
      maxPoints: 40,
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      color: "#1a56db"
    },
    {
      title: "Tech Fest/Fest",
      subtitle: "Organizer",
      points: 10,
      maxPoints: 5,
      icon: <Code className="h-6 w-6 text-purple-600" />,
      color: "#7c3aed"
    },
    {
      title: "Rural Reporting",
      points: 10,
      maxPoints: 10,
      icon: <Pen className="h-6 w-6 text-amber-600" />,
      color: "#d97706"
    },
    {
      title: "Tree Plantation",
      subtitle: "Per tree",
      points: 1,
      maxPoints: 10,
      icon: <TreeDeciduous className="h-6 w-6 text-green-600" />,
      color: "#059669"
    },
    {
      title: "Relief Activities",
      subtitle: "Fund/materials collection",
      points: 5,
      maxPoints: 40,
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      color: "#db2777"
    },
    {
      title: "Debate/Discussion",
      subtitle: "Participation",
      points: 10,
      maxPoints: 20,
      icon: <Users className="h-6 w-6 text-indigo-600" />,
      color: "#4f46e5"
    },
    {
      title: "Publication",
      subtitle: "News Paper, Magazine",
      points: 10,
      maxPoints: 20,
      icon: <FileText className="h-6 w-6 text-cyan-600" />,
      color: "#0891b2"
    },
    {
      title: "Research Publication",
      points: 15,
      maxPoints: 30,
      icon: <GraduationCap className="h-6 w-6 text-emerald-600" />,
      color: "#059669"
    },
    {
      title: "Innovative Projects",
      points: 30,
      maxPoints: 60,
      icon: <Star className="h-6 w-6 text-amber-600" />,
      color: "#d97706"
    },
    {
      title: "Blood Donation",
      points: 5,
      maxPoints: null,
      icon: <Heart className="h-6 w-6 text-red-600" />,
      color: "#dc2626"
    },
    {
      title: "Sports/Games",
      subtitle: "University Level",
      points: 10,
      maxPoints: 20,
      icon: <Medal className="h-6 w-6 text-yellow-600" />,
      color: "#ca8a04"
    },
    {
      title: "Professional Society",
      points: 10,
      maxPoints: null,
      icon: <Building className="h-6 w-6 text-slate-600" />,
      color: "#475569"
    }
  ];

  return (
    <div id="mar-points" className="py-16 bg-gray-50 gear-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-certigen-navy mb-4">Earn MAR Points with Certificates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each certificate you generate awards MAR Points based on the activity type. 
            These points contribute to your academic achievements at MAKAUT.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pointCategories.map((category, index) => (
            <PointCard 
              key={index}
              title={category.title}
              subtitle={category.subtitle}
              points={category.points}
              maxPoints={category.maxPoints}
              icon={category.icon}
              color={category.color}
            />
          ))}
        </div>
        
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <div className="flex items-center mb-2">
                <Award className="h-6 w-6 text-certigen-gold mr-2" />
                <h3 className="text-xl font-bold text-certigen-navy">MAR Points System</h3>
              </div>
              <p className="text-gray-600">
                MAKAUT Academic Reward (MAR) Points are earned through verified activities and achievements. 
                Accumulate points to enhance your academic profile and qualify for special recognitions.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-center">
                <span className="block text-lg font-semibold text-certigen-blue">Need more points?</span>
                <span className="block text-gray-600">Generate multiple certificates to build your portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

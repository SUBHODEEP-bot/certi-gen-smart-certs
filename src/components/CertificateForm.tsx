
import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Languages, FileCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import CertificatePreview from './CertificatePreview';
import { toast } from '@/hooks/use-toast';
import { 
  CertificateTemplate, 
  SupportedLanguage, 
  getMarPointsForActivity 
} from '@/utils/certificate';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PaymentModal } from './PaymentModal';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  activity: z.string({
    required_error: "Please select an activity.",
  }),
  activityDate: z.date({
    required_error: "Date of activity is required.",
  }),
  certificateText: z.string().optional(),
  collegeName: z.string().min(2, {
    message: "College name must be at least 2 characters."
  }),
  language: z.enum(['english', 'bengali', 'hindi'], {
    required_error: "Please select a language",
  }),
  template: z.enum(['classic', 'modern', 'elegant', 'professional'], {
    required_error: "Please select a template",
  }),
});

type CertificateFormValues = z.infer<typeof formSchema>;

interface CertificateFormProps {
  onSubmit: (values: CertificateFormValues) => void;
  isGenerating: boolean;
}

// Updated activity options based on the provided image
const activityOptions = {
  "MOOC & Courses": [
    "MOOCs (SWAYAM/NPTEL/Spoken Tutorial) - 12 weeks",
    "MOOCs (SWAYAM/NPTEL/Spoken Tutorial) - 8 weeks",
    "MOOCs (SWAYAM/NPTEL/Spoken Tutorial) - 4 weeks",
    "MOOCs (SWAYAM/NPTEL/Spoken Tutorial) - 2 weeks",
    "Online Course",
    "Workshop"
  ],
  "Events & Participation": [
    "Tech Fest/Fest - Organizer",
    "Tech Fest/Fest - Participant",
    "Teachers Day/Fresher's Welcome",
    "Webinar",
    "Hackathon",
    "Internship"
  ],
  "Community & Service": [
    "Rural Reporting",
    "Tree Plantation and Up-keeping (per tree)",
    "Collection of Fund/Materials for Relief Camp",
    "Relief Work Team",
    "Blood Donation",
    "Blood Donation Camp Organization",
    "Community Service",
    "Caring for Senior Citizens/Underprivileged"
  ],
  "Academic & Innovation": [
    "Debate/Group Discussion Participation",
    "Tech Quiz/Seminar/Painting",
    "Publication in News Paper/Magazine",
    "Research Publication",
    "Innovative Projects",
    "Project",
    "Relevant Industry Visit & Report"
  ],
  "Sports & Activities": [
    "Sports/Games - Personal Level",
    "Sports/Games - College Level",
    "Sports/Games - University Level",
    "Sports/Games - District Level",
    "Sports/Games - State Level",
    "Sports/Games - National Level",
    "Adventure Sports/Trekking/Yoga Camp"
  ],
  "Entrepreneurship": [
    "Organize Entrepreneurship Programmes",
    "Entrepreneurship Workshop Participation",
    "Video Film Making on Entrepreneurship",
    "Business Plan Submission",
    "Work for Start-up/as Entrepreneur"
  ],
  "Others": [
    "Activities in Professional Society",
    "Volunteer Work",
    "Innovation"
  ]
};

export default function CertificateForm({ onSubmit, isGenerating }: CertificateFormProps) {
  const [previewData, setPreviewData] = useState<CertificateFormValues | null>(null);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<CertificateFormValues | null>(null);
  const [shouldTriggerGeneration, setShouldTriggerGeneration] = useState(false);
  
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      activity: "",
      certificateText: "",
      collegeName: "",
      language: "english",
      template: "classic",
    },
  });

  // Watch for activity and activityDate changes to trigger automatic text generation
  const activity = form.watch("activity");
  const activityDate = form.watch("activityDate");
  const fullName = form.watch("fullName");
  const collegeName = form.watch("collegeName");
  const language = form.watch("language");

  useEffect(() => {
    // Only trigger generation if both activity and date are provided
    if (activity && activityDate && fullName && collegeName && !isGeneratingText) {
      // Set a small delay to avoid too many simultaneous generations when filling form
      const timer = setTimeout(() => {
        generateCertificateText();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [activity, activityDate, fullName, collegeName, language]);

  function handlePreview(values: CertificateFormValues) {
    setPreviewData(values);
    toast({
      title: "Preview updated",
      description: "Your certificate preview has been updated.",
    });
  }

  async function generateCertificateText() {
    const values = form.getValues();
    
    // Check if required fields are provided
    if (!values.fullName || !values.activity || !values.activityDate || !values.collegeName) {
      // Don't show error toast during automatic generation
      return;
    }
    
    setIsGeneratingText(true);
    
    try {
      // In a real app, this would make an API call to an AI service
      // For now we'll use a simulated response
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      const formattedDate = format(values.activityDate, "MMMM d, yyyy");
      
      // Generate a professional-sounding certificate text
      let generatedText = "";
      switch (values.language) {
        case 'bengali':
          generatedText = `এই প্রত্যয়িত করা হচ্ছে যে ${values.fullName} ${values.collegeName} থেকে সফলভাবে ${values.activity} সম্পন্ন করেছেন যা ${formattedDate} তারিখে অনুষ্ঠিত হয়েছিল।`;
          break;
        case 'hindi':
          generatedText = `यह प्रमाणित किया जाता है कि ${values.fullName} ने ${values.collegeName} से ${formattedDate} को आयोजित ${values.activity} में सफलतापूर्वक भाग लिया है।`;
          break;
        default: // English
          generatedText = `This is to certify that ${values.fullName} from ${values.collegeName} has successfully participated in the ${values.activity} conducted on ${formattedDate}. The candidate has demonstrated exceptional skills and knowledge throughout this program.`;
      }
      
      // Update the form with the generated text
      form.setValue("certificateText", generatedText);
      
      // Update preview
      handlePreview({
        ...values,
        certificateText: generatedText
      });
      
      // Only show toast for manual generation
      if (shouldTriggerGeneration) {
        toast({
          title: "Text Generated",
          description: "Certificate text has been generated successfully.",
        });
        setShouldTriggerGeneration(false);
      }
    } catch (error) {
      toast({
        title: "Text Generation Failed",
        description: "There was an error generating the certificate text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingText(false);
    }
  }

  function handleSubmit(values: CertificateFormValues) {
    // Directly submit the form values without showing payment modal
    onSubmit(values);
  }
  
  function handlePaymentSuccess() {
    if (submittedValues) {
      onSubmit(submittedValues);
      setShowPaymentModal(false);
    }
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Card className="flex-1 border border-certigen-lightblue shadow-md">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        className="border-certigen-lightblue focus-visible:ring-certigen-blue" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="collegeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your college name" 
                        {...field} 
                        className="border-certigen-lightblue focus-visible:ring-certigen-blue" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Activity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-certigen-lightblue focus-visible:ring-certigen-blue">
                          <SelectValue placeholder="Select an activity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {Object.entries(activityOptions).map(([category, activities]) => (
                          <SelectGroup key={category}>
                            <SelectLabel>{category}</SelectLabel>
                            {activities.map((activity) => (
                              <SelectItem key={activity} value={activity}>
                                {activity}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="activityDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Activity</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal border-certigen-lightblue focus-visible:ring-certigen-blue",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("2000-01-01")
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Languages className="h-4 w-4 mr-2" />
                        Certificate Language
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-certigen-lightblue focus-visible:ring-certigen-blue">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="bengali">Bengali</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Certificate Template
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-certigen-lightblue focus-visible:ring-certigen-blue">
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="elegant">Elegant</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Hide the AI generation button from normal users */}
              {false && (
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-certigen-cream hover:bg-certigen-cream/80 border-certigen-gold text-certigen-navy"
                    onClick={() => {
                      setShouldTriggerGeneration(true);
                      generateCertificateText();
                    }}
                    disabled={isGeneratingText}
                  >
                    {isGeneratingText ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Text...
                      </>
                    ) : (
                      "Generate Certificate Text with AI"
                    )}
                  </Button>
                </div>
              )}

              <FormField
                control={form.control}
                name="certificateText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Text</FormLabel>
                    <FormControl>
                      <textarea 
                        {...field} 
                        rows={4}
                        placeholder="Certificate text will be automatically generated..."
                        className="w-full border rounded-md p-2 border-certigen-lightblue focus-visible:ring-certigen-blue text-sm focus:outline-none focus:ring-2" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    const values = form.getValues();
                    // Only update preview if we have all required fields
                    if (values.fullName && values.activity && values.activityDate && values.collegeName) {
                      handlePreview(values);
                    } else {
                      toast({
                        title: "Fill all required fields",
                        description: "Please fill all required fields to preview your certificate.",
                        variant: "destructive"
                      });
                    }
                  }}
                >
                  Preview Certificate
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-certigen-blue hover:bg-certigen-navy"
                  disabled={isGenerating || !form.getValues().certificateText}
                >
                  {isGenerating ? "Generating..." : "Generate Certificate"}
                </Button>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mt-2">
                <p className="text-blue-700 text-sm text-center">
                  💳 Online payment system will be available soon once LIVE Razorpay mode is activated.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="flex-1">
        <CertificatePreview certificateData={previewData} />
      </div>
    </div>
  );
}

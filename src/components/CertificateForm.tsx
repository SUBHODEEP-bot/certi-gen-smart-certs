
import React, { useState } from 'react';
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
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
  SelectItem,
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
import { getMarPointsForActivity } from '@/utils/certificate';

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
});

type CertificateFormValues = z.infer<typeof formSchema>;

interface CertificateFormProps {
  onSubmit: (values: CertificateFormValues) => void;
  isGenerating: boolean;
}

const activityOptions = [
  "Workshop", 
  "Hackathon", 
  "Webinar", 
  "Online Course", 
  "Volunteer Work", 
  "Innovation", 
  "Internship"
];

export default function CertificateForm({ onSubmit, isGenerating }: CertificateFormProps) {
  const [previewData, setPreviewData] = useState<CertificateFormValues | null>(null);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      activity: "",
      certificateText: "",
    },
  });

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
    if (!values.fullName || !values.activity || !values.activityDate) {
      toast({
        title: "Fill all fields",
        description: "Please fill all required fields to generate certificate text.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingText(true);
    
    try {
      // In a real app, this would make an API call to an AI service
      // For now we'll use a simulated response
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      const formattedDate = format(values.activityDate, "MMMM d, yyyy");
      
      // Generate a professional-sounding certificate text
      const generatedText = `This is to certify that ${values.fullName} has successfully participated in the ${values.activity} conducted on ${formattedDate}. The candidate has demonstrated exceptional skills and knowledge throughout this program, meeting all the necessary requirements as per academic standards recognized by MAKAUT. This achievement is worth ${getMarPointsForActivity(values.activity)} MAR Points.`;
      
      // Update the form with the generated text
      form.setValue("certificateText", generatedText);
      
      // Update preview
      handlePreview({
        ...values,
        certificateText: generatedText
      });
      
      toast({
        title: "Text Generated",
        description: "Certificate text has been generated successfully.",
      });
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
    onSubmit(values);
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Card className="flex-1 border border-certigen-lightblue shadow-md">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                      <SelectContent>
                        {activityOptions.map((activity) => (
                          <SelectItem key={activity} value={activity}>
                            {activity} ({getMarPointsForActivity(activity)} MAR points)
                          </SelectItem>
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

              <div className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-certigen-cream hover:bg-certigen-cream/80 border-certigen-gold text-certigen-navy"
                  onClick={generateCertificateText}
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
                        placeholder="Generate text or write your own certificate description..."
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
                    if (values.fullName && values.activity && values.activityDate) {
                      handlePreview(values);
                    } else {
                      toast({
                        title: "Fill all fields",
                        description: "Please fill all fields to preview your certificate.",
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
                  {isGenerating ? "Generating..." : "Pay ₹5 & Generate"}
                </Button>
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

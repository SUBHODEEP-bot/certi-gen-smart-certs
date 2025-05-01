
import React, { useState } from 'react';
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
  
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      activity: "",
    },
  });

  function handlePreview(values: CertificateFormValues) {
    setPreviewData(values);
    toast({
      title: "Preview updated",
      description: "Your certificate preview has been updated.",
    });
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
                            {activity}
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
                  disabled={isGenerating}
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

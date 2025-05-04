
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount: number;
}

export function PaymentModal({ isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [isComplete, setIsComplete] = useState(false);

  const handleFreeDownload = () => {
    setIsComplete(true);
    setTimeout(() => {
      onPaymentSuccess();
      // Reset state after success
      setIsComplete(false);
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Certificate Download</DialogTitle>
          <DialogDescription>
            Your certificate is ready to be downloaded.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          {isComplete ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-700">Success!</h3>
              <p className="text-gray-500 mt-1">Preparing your certificate download...</p>
            </div>
          ) : (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Payment System Notice</h3>
                    <p className="text-blue-700">
                      💳 Online payment system will be available soon once LIVE Razorpay mode is activated.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Button 
                    onClick={handleFreeDownload} 
                    className="bg-green-600 hover:bg-green-700 w-full py-6 text-lg"
                  >
                    Continue to Download
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  By clicking "Continue", you agree to our terms and conditions.
                </p>
              </div>
            </>
          )}
        </div>
        
        {/* Preserved Razorpay code for future reference */}
        {/*
        useEffect(() => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          document.body.appendChild(script);

          return () => {
            document.body.removeChild(script);
          };
        }, []);
        
        const processPayment = () => {
          setIsProcessing(true);
          setErrorMessage(null);
          
          // Calculate total amount with GST
          const totalAmount = amount * 1.18;
          // Razorpay takes amount in paise (multiply by 100)
          const amountInPaise = Math.round(totalAmount * 100);
          
          try {
            // Initialize Razorpay options
            const options = {
              key: "rzp_test_StD5wShjMQBnXC", // Razorpay key
              amount: amountInPaise,
              currency: "INR",
              name: "CertiGen",
              description: "Certificate Generation Fee",
              image: "/favicon.ico",
              handler: function(response: any) {
                // Payment successful
                setIsComplete(true);
                setTimeout(() => {
                  onPaymentSuccess();
                  // Reset state after success
                  setIsProcessing(false);
                  setIsComplete(false);
                }, 1500);
              },
              prefill: {
                name: "",
                email: "",
                contact: ""
              },
              notes: {
                purpose: "Certificate generation"
              },
              theme: {
                color: "#1a56db"
              },
              modal: {
                ondismiss: function() {
                  setIsProcessing(false);
                }
              }
            };
            
            // Create Razorpay instance and open payment modal
            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
          } catch (error) {
            console.error("Razorpay error:", error);
            setErrorMessage("Payment initialization failed. Please try again.");
            setIsProcessing(false);
          }
        }
        */}
      </DialogContent>
    </Dialog>
  );
}

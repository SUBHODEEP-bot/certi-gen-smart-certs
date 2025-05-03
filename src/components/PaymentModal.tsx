
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Loader2, CreditCard } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount: number;
}

export function PaymentModal({ isOpen, onClose, onPaymentSuccess, amount }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Simulate payment process
  const processPayment = () => {
    setIsProcessing(true);
    setErrorMessage(null);
    
    // Simulate API call to payment gateway
    setTimeout(() => {
      // Simulate successful payment (in a real app, this would be the response from payment gateway)
      const paymentSuccessful = true; 
      
      if (paymentSuccessful) {
        setIsComplete(true);
        setTimeout(() => {
          onPaymentSuccess();
          // Reset state after success
          setIsProcessing(false);
          setIsComplete(false);
        }, 1500);
      } else {
        setErrorMessage("Payment failed. Please try again.");
        setIsProcessing(false);
      }
    }, 2000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Required</DialogTitle>
          <DialogDescription>
            A payment of ₹{amount} is required to generate your certificate.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          {errorMessage && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {errorMessage}
            </div>
          )}
          
          {isComplete ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-700">Payment Successful!</h3>
              <p className="text-gray-500 mt-1">Generating your certificate...</p>
            </div>
          ) : (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <h3 className="font-medium text-blue-800 mb-2">Payment Details</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Certificate fee:</span>
                    <span className="font-medium">₹{amount.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">GST (18%):</span>
                    <span className="font-medium">₹{(amount * 0.18).toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-gray-700 font-medium">Total:</span>
                    <span className="font-bold">₹{(amount * 1.18).toFixed(2)}</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Button 
                    onClick={processPayment} 
                    disabled={isProcessing}
                    className="bg-green-600 hover:bg-green-700 w-full py-6 text-lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Pay ₹{(amount * 1.18).toFixed(2)}
                      </>
                    )}
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  By clicking "Pay", you agree to our terms and conditions.
                  Your payment is secured with industry-standard encryption.
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

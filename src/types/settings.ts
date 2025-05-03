
export interface Settings {
  language: 'english' | 'bengali' | 'hindi';
  template: 'classic' | 'modern' | 'elegant' | 'professional';
}

export interface PaymentDetails {
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
}

export interface BatchCertificateData {
  fullName: string;
  activity: string;
  activityDate: string;
  certificateText?: string;
  collegeName: string;
  id?: string;
}

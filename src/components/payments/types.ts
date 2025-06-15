
export interface WalletBalance {
  type: 'polygon' | 'upi' | 'cbdc';
  name: string;
  balance: string;
  currency: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: string;
  currency: string;
  from: string;
  to: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  method: 'polygon' | 'upi' | 'cbdc';
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  color: string;
}


import { useState } from 'react';
import { WalletBalance } from './WalletBalance';
import { QuickActions } from './QuickActions';
import { PaymentMethods } from './PaymentMethods';
import { TransactionList } from './TransactionList';
import { PaymentForm } from './PaymentForm';
import { useToast } from '@/hooks/use-toast';
import type { WalletBalance as WalletBalanceType, Transaction, PaymentMethod } from './types';

const PaymentsInterface = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'send' | 'history'>('overview');
  const { toast } = useToast();

  // Mock data - in real app this would come from API
  const walletBalances: WalletBalanceType[] = [
    {
      type: 'polygon',
      name: 'Polygon',
      balance: '125.50',
      currency: 'MATIC',
      icon: '⬟',
      color: 'bg-purple-100'
    },
    {
      type: 'upi',
      name: 'UPI Balance',
      balance: '₹15,420.00',
      currency: 'INR',
      icon: '💳',
      color: 'bg-blue-100'
    },
    {
      type: 'cbdc',
      name: 'Digital Rupee',
      balance: '₹2,500.00',
      currency: 'e₹',
      icon: '🪙',
      color: 'bg-green-100'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI',
      description: 'Instant bank transfers',
      icon: '💳',
      enabled: true,
      color: 'bg-blue-100'
    },
    {
      id: 'polygon',
      name: 'Polygon',
      description: 'Cryptocurrency payments',
      icon: '⬟',
      enabled: true,
      color: 'bg-purple-100'
    },
    {
      id: 'cbdc',
      name: 'Digital Rupee',
      description: 'Central Bank Digital Currency',
      icon: '🪙',
      enabled: false,
      color: 'bg-green-100'
    }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'sent',
      amount: '500.00',
      currency: 'INR',
      from: 'You',
      to: 'john.doe@upi',
      timestamp: '2 hours ago',
      status: 'completed',
      method: 'upi'
    },
    {
      id: '2',
      type: 'received',
      amount: '25.50',
      currency: 'MATIC',
      from: '0x742d35Cc6634C0532925a3b8D3aC93d3',
      to: 'You',
      timestamp: '1 day ago',
      status: 'completed',
      method: 'polygon'
    },
    {
      id: '3',
      type: 'sent',
      amount: '1,200.00',
      currency: 'INR',
      from: 'You',
      to: 'alice@paytm',
      timestamp: '3 days ago',
      status: 'pending',
      method: 'upi'
    }
  ];

  const handleSendPayment = () => {
    setActiveTab('send');
  };

  const handleReceivePayment = () => {
    toast({
      title: "Receive Payment",
      description: "QR code generated for receiving payments.",
    });
  };

  const handleScanQR = () => {
    toast({
      title: "QR Scanner",
      description: "Camera access requested for QR code scanning.",
    });
  };

  const handleViewHistory = () => {
    setActiveTab('history');
  };

  const handleToggleMethod = (methodId: string) => {
    toast({
      title: "Payment Method",
      description: `Payment method ${methodId} toggled.`,
    });
  };

  const handleSendPaymentForm = (data: any) => {
    console.log('Sending payment:', data);
    toast({
      title: "Payment Sent",
      description: `Payment of ${data.amount} ${data.currency} sent successfully.`,
    });
    setActiveTab('overview');
  };

  const handleFilterTransactions = () => {
    toast({
      title: "Filter",
      description: "Transaction filter options coming soon.",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'send':
        return (
          <div className="w-full max-w-md mx-auto px-4">
            <PaymentForm
              onSend={handleSendPaymentForm}
              onScanQR={handleScanQR}
            />
          </div>
        );
      case 'history':
        return (
          <div className="px-4">
            <TransactionList
              transactions={transactions}
              onFilter={handleFilterTransactions}
            />
          </div>
        );
      default:
        return (
          <div className="space-y-6 px-4">
            {/* Mobile: Stack everything vertically */}
            <div className="block lg:hidden space-y-6">
              <WalletBalance balances={walletBalances} />
              <QuickActions
                onSend={handleSendPayment}
                onReceive={handleReceivePayment}
                onScan={handleScanQR}
                onHistory={handleViewHistory}
              />
              <PaymentMethods
                methods={paymentMethods}
                onToggleMethod={handleToggleMethod}
              />
              <TransactionList
                transactions={transactions.slice(0, 3)}
                onFilter={handleFilterTransactions}
              />
            </div>
            
            {/* Desktop: Side by side layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <WalletBalance balances={walletBalances} />
                <QuickActions
                  onSend={handleSendPayment}
                  onReceive={handleReceivePayment}
                  onScan={handleScanQR}
                  onHistory={handleViewHistory}
                />
              </div>
              <div className="space-y-6">
                <PaymentMethods
                  methods={paymentMethods}
                  onToggleMethod={handleToggleMethod}
                />
              </div>
              <div className="col-span-2">
                <TransactionList
                  transactions={transactions}
                  onFilter={handleFilterTransactions}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Payments</h1>
            <p className="text-sm md:text-base text-gray-600">Manage your digital wallets and transactions</p>
          </div>
          
          {/* Tab Navigation - Mobile optimized */}
          <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'send', label: 'Send' },
              { id: 'history', label: 'History' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentsInterface;

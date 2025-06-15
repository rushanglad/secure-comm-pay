
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Send, 
  QrCode, 
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';

const PaymentsInterface = () => {
  const [activeTab, setActiveTab] = useState('wallet');

  const walletBalances = [
    { type: 'UPI', balance: '₹12,450.00', currency: 'INR' },
    { type: 'Polygon', balance: '0.5847', currency: 'MATIC' },
    { type: 'e₹ (CBDC)', balance: '₹5,000.00', currency: 'INR' }
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'send',
      amount: '₹500.00',
      recipient: 'Alice Smith',
      method: 'UPI',
      status: 'completed',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'receive',
      amount: '₹1,200.00',
      sender: 'Company Salary',
      method: 'UPI',
      status: 'completed',
      time: '1 day ago'
    },
    {
      id: '3',
      type: 'send',
      amount: '0.1 MATIC',
      recipient: '0x742d...4b8c',
      method: 'Polygon',
      status: 'pending',
      time: '2 days ago'
    }
  ];

  const quickActions = [
    { label: 'Send Money', icon: Send, action: 'send' },
    { label: 'Scan QR', icon: QrCode, action: 'scan' },
    { label: 'Request Money', icon: ArrowDownLeft, action: 'request' },
    { label: 'Add Money', icon: Plus, action: 'add' }
  ];

  return (
    <div className="h-[calc(100vh-8rem)] space-y-6">
      {/* Wallet Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {walletBalances.map((wallet, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {wallet.type}
                  </p>
                  <p className="text-2xl font-bold">{wallet.balance}</p>
                  <p className="text-xs text-muted-foreground">{wallet.currency}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Wallet className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.action}
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => console.log(`${action.action} clicked`)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Money */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send Money
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Recipient</label>
              <Input placeholder="UPI ID, Phone, or Wallet Address" />
            </div>
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input placeholder="Enter amount" type="number" />
            </div>
            <div>
              <label className="text-sm font-medium">Payment Method</label>
              <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <option>UPI</option>
                <option>Polygon Wallet</option>
                <option>e₹ (CBDC)</option>
              </select>
            </div>
            <Button className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Payment
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'send' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {transaction.type === 'send' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {transaction.type === 'send' 
                          ? `To ${transaction.recipient}` 
                          : `From ${transaction.sender}`
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.method} • {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'send' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.type === 'send' ? '-' : '+'}{transaction.amount}
                    </p>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsInterface;

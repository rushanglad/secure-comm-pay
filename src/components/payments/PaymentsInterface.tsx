
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wallet, Send, QrCode, ArrowUpRight, ArrowDownLeft, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  method: 'polygon' | 'upi' | 'erupee';
  amount: number;
  currency: string;
  from: string;
  to: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

const PaymentsInterface = () => {
  const [activeTab, setActiveTab] = useState('wallet');
  const [sendAmount, setSendAmount] = useState('');
  const [sendTo, setSendTo] = useState('');

  const wallets = [
    {
      type: 'polygon',
      name: 'Polygon Wallet',
      balance: '125.45',
      currency: 'MATIC',
      address: '0x742d35Cc7b4c4532C6671a847a7a6f39fD5123C9',
      color: 'bg-purple-500'
    },
    {
      type: 'upi',
      name: 'UPI',
      balance: '15,250.00',
      currency: 'INR',
      address: 'user@paytm',
      color: 'bg-blue-500'
    },
    {
      type: 'erupee',
      name: 'e₹ (CBDC)',
      balance: '5,000.00',
      currency: 'INR',
      address: 'erupee-id-123456789',
      color: 'bg-green-500'
    }
  ];

  const cryptoCurrencies = [
    { symbol: 'MATIC', name: 'Polygon', price: '$0.85', change: '+2.5%' },
    { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: '0.0%' },
    { symbol: 'USDT', name: 'Tether', price: '$1.00', change: '+0.1%' },
    { symbol: 'DAI', name: 'Dai Stablecoin', price: '$1.00', change: '-0.1%' }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'sent',
      method: 'polygon',
      amount: 25.5,
      currency: 'MATIC',
      from: 'You',
      to: '0x123...abc',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'received',
      method: 'upi',
      amount: 1000,
      currency: 'INR',
      from: 'Alice Kumar',
      to: 'You',
      timestamp: '1 day ago',
      status: 'completed'
    }
  ];

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };

  const handleSendPayment = () => {
    if (sendAmount && sendTo) {
      toast.success(`Payment of ${sendAmount} initiated to ${sendTo}`);
      setSendAmount('');
      setSendTo('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Wallet className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Payments & Wallets</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wallet">Wallets</TabsTrigger>
          <TabsTrigger value="send">Send</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wallets.map((wallet) => (
              <Card key={wallet.type}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-full ${wallet.color} flex items-center justify-center`}>
                      <Wallet className="h-5 w-5 text-white" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyAddress(wallet.address)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-2">{wallet.name}</h3>
                  <p className="text-2xl font-bold mb-1">
                    {wallet.balance} <span className="text-sm font-normal">{wallet.currency}</span>
                  </p>
                  <p className="text-xs text-gray-500 truncate">{wallet.address}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="send" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Send Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <Input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">To (Address/UPI ID)</label>
                <Input
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                  placeholder="0x... or user@upi"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSendPayment} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Payment
                </Button>
                <Button variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supported Cryptocurrencies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cryptoCurrencies.map((crypto) => (
                  <div key={crypto.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">{crypto.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{crypto.symbol}</p>
                        <p className="text-sm text-gray-600">{crypto.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{crypto.price}</p>
                      <p className={`text-sm ${crypto.change.startsWith('+') ? 'text-green-600' : crypto.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                        {crypto.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          {tx.type === 'sent' ? (
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                          ) : (
                            <ArrowDownLeft className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {tx.type === 'sent' ? `To ${tx.to}` : `From ${tx.from}`}
                          </p>
                          <p className="text-sm text-gray-600">{tx.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${tx.type === 'sent' ? 'text-red-600' : 'text-green-600'}`}>
                          {tx.type === 'sent' ? '-' : '+'}{tx.amount} {tx.currency}
                        </p>
                        <Badge variant={tx.status === 'completed' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}>
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsInterface;

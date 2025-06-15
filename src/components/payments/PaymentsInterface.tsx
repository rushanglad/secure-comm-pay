
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wallet, Send, QrCode, ArrowUpRight, ArrowDownLeft, Copy, Eye, EyeOff, Plus, TrendingUp } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('overview');
  const [sendAmount, setSendAmount] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [balanceVisible, setBalanceVisible] = useState(true);

  const wallets = [
    {
      type: 'polygon',
      name: 'Polygon',
      balance: '125.45',
      currency: 'MATIC',
      usdValue: '$106.63',
      address: '0x742d35Cc7b4c4532C6671a847a7a6f39fD5123C9',
      color: 'from-purple-500 to-purple-600',
      icon: '⬡'
    },
    {
      type: 'upi',
      name: 'UPI Wallet',
      balance: '15,250.00',
      currency: 'INR',
      usdValue: '$182.43',
      address: 'user@paytm',
      color: 'from-blue-500 to-blue-600',
      icon: '₹'
    },
    {
      type: 'erupee',
      name: 'Digital Rupee',
      balance: '5,000.00',
      currency: 'e₹',
      usdValue: '$59.81',
      address: 'erupee-id-123456789',
      color: 'from-green-500 to-green-600',
      icon: '₹'
    }
  ];

  const recentActivity = [
    { type: 'sent', amount: '25.5 MATIC', to: '0x123...abc', time: '2 hours ago', status: 'completed' },
    { type: 'received', amount: '₹1,000', from: 'Alice Kumar', time: '1 day ago', status: 'completed' },
    { type: 'sent', amount: '₹500', to: 'Bob Singh', time: '2 days ago', status: 'completed' },
  ];

  const cryptoData = [
    { symbol: 'MATIC', name: 'Polygon', price: '$0.85', change: '+2.5%', trend: 'up' },
    { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: '0.0%', trend: 'neutral' },
    { symbol: 'USDT', name: 'Tether', price: '$1.00', change: '+0.1%', trend: 'up' },
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

  const totalBalance = balanceVisible ? '$348.87' : '****';

  return (
    <div className="h-[calc(100vh-8rem)] bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">ProtonWallet</h1>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Funds
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Balance</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900">{totalBalance}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                >
                  {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Wallet Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wallets.map((wallet) => (
                <Card key={wallet.type} className="overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${wallet.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${wallet.color} flex items-center justify-center text-white font-bold`}>
                          {wallet.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{wallet.name}</h3>
                          <p className="text-sm text-gray-600">{wallet.currency}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyAddress(wallet.address)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {balanceVisible ? (
                      <>
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                          {wallet.balance} <span className="text-sm font-normal">{wallet.currency}</span>
                        </p>
                        <p className="text-sm text-gray-600">{wallet.usdValue}</p>
                      </>
                    ) : (
                      <p className="text-2xl font-bold text-gray-900">••••••</p>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-3 truncate">{wallet.address}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                          }`}>
                            {activity.type === 'sent' ? (
                              <ArrowUpRight className="h-4 w-4 text-red-600" />
                            ) : (
                              <ArrowDownLeft className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{activity.amount}</p>
                            <p className="text-sm text-gray-600">
                              {activity.type === 'sent' ? `To ${activity.to}` : `From ${activity.from}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{activity.time}</p>
                          <Badge variant="default" className="text-xs">
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Send className="h-4 w-4 mr-3" />
                    Send Payment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <QrCode className="h-4 w-4 mr-3" />
                    Receive Payment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-3" />
                    Add New Wallet
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="send" className="space-y-6">
            <Card className="max-w-lg mx-auto">
              <CardHeader>
                <CardTitle>Send Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount</label>
                  <Input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">To Address/UPI ID</label>
                  <Input
                    value={sendTo}
                    onChange={(e) => setSendTo(e.target.value)}
                    placeholder="0x... or user@upi"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSendPayment} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
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

          <TabsContent value="markets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cryptoData.map((crypto) => (
                    <div key={crypto.symbol} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">{crypto.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{crypto.symbol}</p>
                          <p className="text-sm text-gray-600">{crypto.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{crypto.price}</p>
                        <p className={`text-sm flex items-center gap-1 ${
                          crypto.trend === 'up' ? 'text-green-600' : 
                          crypto.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {crypto.trend === 'up' && <TrendingUp className="h-3 w-3" />}
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
                      <div key={tx.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                          }`}>
                            {tx.type === 'sent' ? (
                              <ArrowUpRight className="h-5 w-5 text-red-600" />
                            ) : (
                              <ArrowDownLeft className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {tx.type === 'sent' ? `Sent to ${tx.to}` : `Received from ${tx.from}`}
                            </p>
                            <p className="text-sm text-gray-600">{tx.timestamp}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${tx.type === 'sent' ? 'text-red-600' : 'text-green-600'}`}>
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
    </div>
  );
};

export default PaymentsInterface;

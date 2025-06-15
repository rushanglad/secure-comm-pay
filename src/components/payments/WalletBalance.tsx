
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { WalletBalance as WalletBalanceType } from './types';

interface WalletBalanceProps {
  balances: WalletBalanceType[];
}

export const WalletBalance = ({ balances }: WalletBalanceProps) => {
  const [showBalances, setShowBalances] = useState(true);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Wallet Balances</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalances(!showBalances)}
            className="h-8 w-8"
          >
            {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {balances.map((wallet) => (
          <div key={wallet.type} className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${wallet.color}`}>
                <span className="text-lg">{wallet.icon}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{wallet.name}</p>
                <p className="text-sm text-gray-500">{wallet.type.toUpperCase()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {showBalances ? wallet.balance : '***'}
              </p>
              <p className="text-sm text-gray-500">{wallet.currency}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

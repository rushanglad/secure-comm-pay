
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Send, Scan } from 'lucide-react';
import { useState } from 'react';

interface PaymentFormProps {
  onSend: (data: any) => void;
  onScanQR: () => void;
}

export const PaymentForm = ({ onSend, onScanQR }: PaymentFormProps) => {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    currency: 'INR',
    method: '',
    note: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Send Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Enter UPI ID, wallet address, or username"
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onScanQR}
              className="mt-6"
            >
              <Scan className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="MATIC">MATIC</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="e₹">e₹</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="method">Payment Method</Label>
            <Select value={formData.method} onValueChange={(value) => setFormData({ ...formData, method: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="cbdc">e₹ (CBDC)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              placeholder="Add a note for this payment"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="resize-none"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!formData.recipient || !formData.amount || !formData.method}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import type { PaymentMethod } from './types';

interface PaymentMethodsProps {
  methods: PaymentMethod[];
  onToggleMethod: (methodId: string) => void;
}

export const PaymentMethods = ({ methods, onToggleMethod }: PaymentMethodsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Payment Methods</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {methods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${method.color}`}>
                <span className="text-lg">{method.icon}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
            <Switch
              checked={method.enabled}
              onCheckedChange={() => onToggleMethod(method.id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

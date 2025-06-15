
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Scan, ArrowUpDown, History } from 'lucide-react';

interface QuickActionsProps {
  onSend: () => void;
  onReceive: () => void;
  onScan: () => void;
  onHistory: () => void;
}

export const QuickActions = ({ onSend, onReceive, onScan, onHistory }: QuickActionsProps) => {
  const actions = [
    { icon: Send, label: 'Send', onClick: onSend, color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: ArrowUpDown, label: 'Receive', onClick: onReceive, color: 'bg-green-500 hover:bg-green-600' },
    { icon: Scan, label: 'Scan QR', onClick: onScan, color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: History, label: 'History', onClick: onHistory, color: 'bg-gray-500 hover:bg-gray-600' }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {actions.map((action) => (
            <Button
              key={action.label}
              onClick={action.onClick}
              className={`h-16 sm:h-20 flex flex-col gap-1 sm:gap-2 ${action.color} text-white touch-manipulation`}
            >
              <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

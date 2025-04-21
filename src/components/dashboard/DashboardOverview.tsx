
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Mail, Calendar, Wallet } from 'lucide-react';

const DashboardOverview = () => {
  const services = [
    {
      title: 'Messages',
      icon: MessageSquare,
      description: 'Secure messaging with Matrix protocol',
      color: 'text-blue-500',
    },
    {
      title: 'Email',
      icon: Mail,
      description: 'Encrypted email communication',
      color: 'text-purple-500',
    },
    {
      title: 'Calendar',
      icon: Calendar,
      description: 'Schedule and manage your events',
      color: 'text-green-500',
    },
    {
      title: 'Payments',
      icon: Wallet,
      description: 'Secure payment processing',
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <Card key={service.title} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {service.title}
            </CardTitle>
            <service.icon className={`h-4 w-4 ${service.color}`} />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {service.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardOverview;

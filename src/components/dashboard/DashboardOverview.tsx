
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Mail, 
  Calendar, 
  CreditCard, 
  Shield,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';

const DashboardOverview = () => {
  const { user } = useAuth();

  const quickStats = [
    { 
      title: 'Unread Messages', 
      value: '3', 
      icon: MessageSquare, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50' 
    },
    { 
      title: 'New Emails', 
      value: '7', 
      icon: Mail, 
      color: 'text-green-600',
      bgColor: 'bg-green-50' 
    },
    { 
      title: 'Upcoming Events', 
      value: '2', 
      icon: Calendar, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50' 
    },
    { 
      title: 'Wallet Balance', 
      value: '₹1,250', 
      icon: CreditCard, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50' 
    },
  ];

  const quickActions = [
    { label: 'Send Message', path: '/messages', icon: MessageSquare },
    { label: 'Compose Email', path: '/email', icon: Mail },
    { label: 'Schedule Event', path: '/calendar', icon: Calendar },
    { label: 'Send Payment', path: '/payments', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Welcome back!</CardTitle>
              <p className="text-muted-foreground mt-1">
                Here's your secure communication overview
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                Secure
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
                  key={action.label}
                  asChild
                  variant="outline"
                  className="h-20 flex-col gap-2"
                >
                  <Link to={action.path}>
                    <Icon className="h-6 w-6" />
                    <span className="text-sm">{action.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Security Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">End-to-End Encryption</span>
              <Badge className="bg-green-50 text-green-700">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Matrix Messaging</span>
              <Badge className="bg-green-50 text-green-700">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">PGP Email Encryption</span>
              <Badge className="bg-green-50 text-green-700">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Two-Factor Authentication</span>
              <Badge variant="outline">Setup Required</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;

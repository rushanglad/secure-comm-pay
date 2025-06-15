
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  Mail, 
  Calendar, 
  CreditCard, 
  User, 
  LogOut,
  Shield,
  Home
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { signOut, user } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/email', icon: Mail, label: 'Email' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/payments', icon: CreditCard, label: 'Payments' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-navy-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-navy-900">SecureComm</h1>
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {user?.email}
              </Badge>
            </div>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-primary text-white' 
                          : 'text-navy-600 hover:bg-navy-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="mt-8 pt-4 border-t">
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

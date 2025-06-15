
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { MessageSquare, Mail, Calendar, Wallet, Menu, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const isMobile = useIsMobile();

  const menuItems = [
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Mail, label: 'Email', path: '/email' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Wallet, label: 'Payments', path: '/payments' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="h-screen" collapsible>
          <SidebarContent>
            <div className="p-3 md:p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary-500" />
                  <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-teal-500 -ml-2" />
                </div>
                <span className="text-base md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-teal-500">
                  SecureComm
                </span>
              </div>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs md:text-sm">Services</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild>
                        <button 
                          onClick={() => navigate(item.path)}
                          className="flex items-center gap-2 w-full p-3 md:p-2 rounded-lg hover:bg-gray-100 touch-manipulation"
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="text-sm md:text-base">{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
          <header className="bg-white border-b border-gray-200 px-3 md:px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <SidebarTrigger>
                <Button variant="ghost" size={isMobile ? "sm" : "icon"} className="touch-manipulation">
                  <Menu className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </SidebarTrigger>
              <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
                {isMobile ? 'SecureComm' : 'SecureComm Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/profile')}
                className="border-primary-500 text-primary-500 hover:bg-primary-100 px-2 md:px-3 touch-manipulation"
              >
                <User className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline text-xs md:text-sm">Profile</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 px-2 md:px-3 touch-manipulation"
              >
                <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline text-xs md:text-sm">Sign Out</span>
              </Button>
            </div>
          </header>
          
          <main className="flex-1 p-3 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

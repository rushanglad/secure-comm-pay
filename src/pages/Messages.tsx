
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MessagingInterface from '@/components/messaging/MessagingInterface';

const Messages = () => {
  const { session } = useAuth();

  useEffect(() => {
    document.title = 'Messages - SecureComm';
  }, []);

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <DashboardLayout>
      <div className="h-full">
        <MessagingInterface />
      </div>
    </DashboardLayout>
  );
};

export default Messages;

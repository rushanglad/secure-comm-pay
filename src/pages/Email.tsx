
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EmailInterface from '@/components/email/EmailInterface';

const Email = () => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <DashboardLayout>
      <div className="h-full">
        <EmailInterface />
      </div>
    </DashboardLayout>
  );
};

export default Email;

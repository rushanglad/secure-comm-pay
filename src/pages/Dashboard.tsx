
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const Dashboard = () => {
  const { session } = useAuth();

  useEffect(() => {
    document.title = 'Dashboard - SecureComm';
  }, []);

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
};

export default Dashboard;

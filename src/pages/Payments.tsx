
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PaymentsInterface from '@/components/payments/PaymentsInterface';

const Payments = () => {
  const { session } = useAuth();

  useEffect(() => {
    document.title = 'Payments - SecureComm';
  }, []);

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <DashboardLayout>
      <div className="h-full">
        <PaymentsInterface />
      </div>
    </DashboardLayout>
  );
};

export default Payments;

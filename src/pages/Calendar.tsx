
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CalendarInterface from '@/components/calendar/CalendarInterface';

const Calendar = () => {
  const { session } = useAuth();

  useEffect(() => {
    document.title = 'Calendar - SecureComm';
  }, []);

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <DashboardLayout>
      <div className="h-full">
        <CalendarInterface />
      </div>
    </DashboardLayout>
  );
};

export default Calendar;


import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CalendarInterface from '@/components/calendar/CalendarInterface';

const Calendar = () => {
  const { session } = useAuth();

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

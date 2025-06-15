
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CalendarSidebarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const CalendarSidebar = ({
  selectedDate,
  onSelectDate,
  currentMonth,
  onMonthChange,
  isOpen = true,
  onClose,
}: CalendarSidebarProps) => {
  const isMobile = useIsMobile();

  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <div className={`${
      isMobile 
        ? 'fixed inset-0 z-50 bg-white' 
        : 'w-80 bg-white border-r border-gray-200'
    } p-4`}>
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Calendar</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      <div className="mb-6">
        {!isMobile && (
          <h3 className="font-semibold text-gray-900 mb-3">Calendar</h3>
        )}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          month={currentMonth}
          onMonthChange={onMonthChange}
          className="rounded-md border border-gray-200 w-full"
        />
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">My Calendars</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 touch-manipulation">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium">Personal</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 touch-manipulation">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">Work</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 touch-manipulation">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm font-medium">Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;

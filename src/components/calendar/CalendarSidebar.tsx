
import { Calendar } from '@/components/ui/calendar';

interface CalendarSidebarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
}

const CalendarSidebar = ({
  selectedDate,
  onSelectDate,
  currentMonth,
  onMonthChange,
}: CalendarSidebarProps) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4">
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Calendar</h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          month={currentMonth}
          onMonthChange={onMonthChange}
          className="rounded-md border border-gray-200"
        />
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">My Calendars</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium">Personal</span>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">Work</span>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm font-medium">Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;

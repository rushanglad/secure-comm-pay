
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';
import { CreateEventDialog } from './CreateEventDialog';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  newEvent: {
    title: string;
    description: string;
    time: string;
    location: string;
  };
  onNewEventChange: (event: any) => void;
  onCreateEvent: () => void;
}

const CalendarHeader = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  isDialogOpen,
  onDialogOpenChange,
  newEvent,
  onNewEventChange,
  onCreateEvent,
}: CalendarHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
            <DialogTrigger asChild>
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </DialogTrigger>
            <CreateEventDialog
              newEvent={newEvent}
              onNewEventChange={onNewEventChange}
              onCreateEvent={onCreateEvent}
            />
          </Dialog>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-lg font-semibold min-w-[200px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <Button variant="outline" size="sm" onClick={onNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;


import { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarSidebar from './CalendarSidebar';
import EventsList from './EventsList';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location?: string;
  color: string;
}

const CalendarInterface = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Standup',
      description: 'Daily team synchronization meeting',
      date: new Date(),
      time: '09:00',
      location: 'Conference Room A',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Project Review',
      description: 'Q1 project milestone review',
      date: new Date(Date.now() + 86400000),
      time: '14:00',
      color: 'bg-green-500'
    },
    {
      id: '3',
      title: 'Client Presentation',
      description: 'Present new features to client',
      date: new Date(Date.now() + 172800000),
      time: '11:00',
      location: 'Meeting Room B',
      color: 'bg-purple-500'
    }
  ]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    time: '',
    location: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.time && selectedDate) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description,
        date: selectedDate,
        time: newEvent.time,
        location: newEvent.location,
        color: 'bg-indigo-500'
      };
      setEvents(prev => [...prev, event]);
      setNewEvent({ title: '', description: '', time: '', location: '' });
      setIsDialogOpen(false);
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="h-[calc(100vh-8rem)] bg-gray-50">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        isDialogOpen={isDialogOpen}
        onDialogOpenChange={setIsDialogOpen}
        newEvent={newEvent}
        onNewEventChange={setNewEvent}
        onCreateEvent={handleCreateEvent}
      />

      <div className="flex h-full">
        <CalendarSidebar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
        <EventsList
          selectedDate={selectedDate}
          events={events}
        />
      </div>
    </div>
  );
};

export default CalendarInterface;

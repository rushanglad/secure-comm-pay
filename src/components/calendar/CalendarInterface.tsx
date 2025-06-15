
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Plus, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

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

  const selectedDateEvents = events.filter(event => 
    event.date.toDateString() === selectedDate?.toDateString()
  );

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
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">ProtonCalendar</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter event title"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Add location"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Add description"
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={handleCreateEvent} className="w-full bg-purple-600 hover:bg-purple-700">
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold min-w-[200px] text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Calendar Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Calendar</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
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

        {/* Events View */}
        <div className="flex-1 bg-white">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
            </h2>
          </div>
          
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="p-6">
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <Card key={event.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-1 h-16 rounded-full ${event.color}`}></div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              {event.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                              {event.description && (
                                <p className="mt-2 text-gray-700">{event.description}</p>
                              )}
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            Personal
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <CalendarIcon className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No events scheduled</p>
                  <p className="text-gray-400 text-sm">
                    {selectedDate ? 'Create a new event for this date' : 'Select a date to view or create events'}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default CalendarInterface;

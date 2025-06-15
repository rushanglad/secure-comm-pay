
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin
} from 'lucide-react';

const CalendarInterface = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const mockEvents = [
    {
      id: '1',
      title: 'Team Meeting',
      time: '10:00 AM - 11:00 AM',
      date: new Date(),
      location: 'Conference Room A',
      type: 'meeting'
    },
    {
      id: '2',
      title: 'Project Review',
      time: '2:00 PM - 3:30 PM',
      date: new Date(),
      location: 'Online',
      type: 'review'
    },
    {
      id: '3',
      title: 'Doctor Appointment',
      time: '4:00 PM - 5:00 PM',
      date: new Date(Date.now() + 86400000), // Tomorrow
      location: 'City Hospital',
      type: 'personal'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'personal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const days = getDaysInMonth(currentDate);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Calendar Grid */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 flex-1">
            {days.map((day, index) => (
              <div
                key={index}
                onClick={() => day && setSelectedDate(day)}
                className={`
                  min-h-[80px] p-2 border rounded-lg cursor-pointer transition-colors
                  ${day ? 'hover:bg-gray-50' : ''}
                  ${selectedDate && day && selectedDate.toDateString() === day.toDateString() 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'border-gray-200'
                  }
                  ${day && day.toDateString() === new Date().toDateString() 
                    ? 'bg-blue-100 border-blue-300' 
                    : ''
                  }
                `}
              >
                {day && (
                  <>
                    <div className="text-sm font-medium mb-1">
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {getEventsForDate(day).slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {getEventsForDate(day).length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{getEventsForDate(day).length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Events Sidebar */}
      <Card className="w-80 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>
            {selectedDate ? selectedDate.toLocaleDateString() : 'Today\'s Events'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-4">
            {(selectedDate ? getEventsForDate(selectedDate) : getEventsForDate(new Date()))
              .map(event => (
                <div key={event.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            
            {(selectedDate ? getEventsForDate(selectedDate) : getEventsForDate(new Date())).length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No events scheduled</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarInterface;

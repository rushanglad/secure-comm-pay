
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location?: string;
  color: string;
}

interface EventsListProps {
  selectedDate: Date | undefined;
  events: Event[];
}

const EventsList = ({ selectedDate, events }: EventsListProps) => {
  const selectedDateEvents = events.filter(event => 
    event.date.toDateString() === selectedDate?.toDateString()
  );

  return (
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
  );
};

export default EventsList;

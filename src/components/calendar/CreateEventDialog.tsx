
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface CreateEventDialogProps {
  newEvent: {
    title: string;
    description: string;
    time: string;
    location: string;
  };
  onNewEventChange: (event: any) => void;
  onCreateEvent: () => void;
}

export const CreateEventDialog = ({
  newEvent,
  onNewEventChange,
  onCreateEvent,
}: CreateEventDialogProps) => {
  return (
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
            onChange={(e) => onNewEventChange(prev => ({ ...prev, title: e.target.value }))}
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
            onChange={(e) => onNewEventChange(prev => ({ ...prev, time: e.target.value }))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="location">Location (Optional)</Label>
          <Input
            id="location"
            value={newEvent.location}
            onChange={(e) => onNewEventChange(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Add location"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newEvent.description}
            onChange={(e) => onNewEventChange(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Add description"
            className="mt-1"
          />
        </div>
        <Button onClick={onCreateEvent} className="w-full bg-purple-600 hover:bg-purple-700">
          Create Event
        </Button>
      </div>
    </DialogContent>
  );
};

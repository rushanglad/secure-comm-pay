
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Send } from 'lucide-react';

interface NewEmailState {
  to: string;
  subject: string;
  body: string;
}

interface ComposeEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newEmail: NewEmailState;
  onNewEmailChange: (newEmail: NewEmailState) => void;
  onSend: () => void;
}

export const ComposeEmailDialog = ({ open, onOpenChange, newEmail, onNewEmailChange, onSend }: ComposeEmailDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>
            Compose and send a new encrypted message.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <Input
            placeholder="To"
            value={newEmail.to}
            onChange={(e) => onNewEmailChange({ ...newEmail, to: e.target.value })}
          />
          <Input
            placeholder="Subject"
            value={newEmail.subject}
            onChange={(e) => onNewEmailChange({ ...newEmail, subject: e.target.value })}
          />
          <Textarea
            placeholder="Write your message..."
            className="min-h-[300px] resize-none"
            value={newEmail.body}
            onChange={(e) => onNewEmailChange({ ...newEmail, body: e.target.value })}
          />
        </div>
        <DialogFooter>
          <Button onClick={onSend} className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

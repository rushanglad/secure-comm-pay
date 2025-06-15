
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Image, Send } from 'lucide-react';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  attachments: File[];
  onSendMessage: () => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageInput = ({ 
  newMessage, 
  setNewMessage, 
  attachments, 
  onSendMessage, 
  onFileSelect 
}: MessageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-end gap-2">
        {/* Attachment Buttons */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => fileInputRef.current?.click()}
            title="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => imageInputRef.current?.click()}
            title="Attach image"
          >
            <Image className="h-4 w-4" />
          </Button>
        </div>

        {/* Message Input */}
        <div className="flex-1">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
            className="min-h-[36px] resize-none border-gray-200 focus:border-primary"
          />
        </div>

        {/* Send Button */}
        <Button
          onClick={onSendMessage}
          disabled={!newMessage.trim() && attachments.length === 0}
          className="h-9 w-9 p-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        className="hidden"
        multiple
        accept=".pdf,.doc,.docx,.txt,.zip,.rar"
      />
      <input
        type="file"
        ref={imageInputRef}
        onChange={onFileSelect}
        className="hidden"
        multiple
        accept="image/*"
      />
    </div>
  );
};

export default MessageInput;

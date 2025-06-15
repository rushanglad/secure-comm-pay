
import { ScrollArea } from '@/components/ui/scroll-area';
import { Image, FileText } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    type: 'image' | 'file';
    size: string;
    url?: string;
  }>;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-md">
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.isOwn
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-900 rounded-bl-md'
                }`}
              >
                {message.content && <p className="text-sm">{message.content}</p>}
                
                {/* Attachments */}
                {message.attachments && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          message.isOwn ? 'bg-white/20' : 'bg-white'
                        }`}
                      >
                        {attachment.type === 'image' ? (
                          <Image className="h-4 w-4 text-gray-500" />
                        ) : (
                          <FileText className="h-4 w-4 text-gray-500" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium truncate ${
                            message.isOwn ? 'text-white' : 'text-gray-900'
                          }`}>
                            {attachment.name}
                          </p>
                          <p className={`text-xs ${
                            message.isOwn ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {attachment.size}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className={`text-xs text-gray-500 mt-1 ${
                message.isOwn ? 'text-right' : 'text-left'
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageList;

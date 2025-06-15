
import { Button } from '@/components/ui/button';
import { Lock, MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
  chatName: string;
}

const ChatHeader = ({ chatName }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{chatName}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <Lock className="h-3 w-3" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;


import { MessageSquare } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Select a conversation to start messaging</p>
        <p className="text-sm text-gray-400 mt-1">All messages are end-to-end encrypted</p>
      </div>
    </div>
  );
};

export default EmptyState;

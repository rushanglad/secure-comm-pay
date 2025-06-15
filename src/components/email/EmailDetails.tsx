
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Reply, Forward, Archive, MoreHorizontal, Mail } from 'lucide-react';
import type { Email } from './types';

interface EmailDetailsProps {
  email: Email | undefined;
  isFolderEmpty: boolean;
}

export const EmailDetails = ({ email, isFolderEmpty }: EmailDetailsProps) => {
  if (!email) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center h-full">
        <div className="text-center">
          <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {isFolderEmpty ? 'This folder is empty' : 'Select an email to read'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {email.subject}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>From: {email.from}</span>
              <span>{email.timestamp}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Reply className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Forward className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 p-6">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            This is the full email content. In a real implementation, this would show the complete encrypted email content with proper formatting and security features.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Our end-to-end encryption ensures that only you and the intended recipient can read the message. Your privacy is protected at all times.
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};

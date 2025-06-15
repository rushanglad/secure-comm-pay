
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star } from 'lucide-react';
import type { Email } from './types';

interface EmailListProps {
  emails: Email[];
  selectedEmail: string | null;
  onSelectEmail: (emailId: string) => void;
  folderName: string;
  currentFolderId: string;
}

export const EmailList = ({ emails, selectedEmail, onSelectEmail, folderName, currentFolderId }: EmailListProps) => {
  return (
    <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 text-lg">
          {folderName}
        </h2>
      </div>
      <ScrollArea className="flex-1">
        {emails.map((email) => (
          <div
            key={email.id}
            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
              selectedEmail === email.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
            } ${!email.read ? 'bg-blue-25' : ''}`}
            onClick={() => onSelectEmail(email.id)}
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${!email.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                    {currentFolderId === 'inbox' ? email.from : `To: ${email.from}`}
                  </span>
                  {email.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <span className="text-xs text-gray-500">{email.timestamp}</span>
              </div>
              <h4 className={`${!email.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-800'} line-clamp-1`}>
                {email.subject}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">{email.preview}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};


import { useState } from 'react';
import { Inbox, Send, FileText, Trash2 } from 'lucide-react';
import { EmailToolbar } from './EmailToolbar';
import { EmailSidebar } from './EmailSidebar';
import { EmailList } from './EmailList';
import { EmailDetails } from './EmailDetails';
import { ComposeEmailDialog } from './ComposeEmailDialog';
import type { Email, Folder } from './types';

const EmailInterface = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [newEmail, setNewEmail] = useState({ to: '', subject: '', body: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // This would come from an API in a real app
  const allEmails: { [key: string]: Email[] } = {
    inbox: [
      {
        id: '1',
        from: 'alice@example.com',
        subject: 'Project Update - Q1 2024',
        preview: 'Here\'s the latest update on our project progress. We\'ve made significant improvements...',
        timestamp: '2 hours ago',
        read: false,
        starred: true
      },
      {
        id: '2',
        from: 'security@example.com',
        subject: 'Security Alert: New Login Detected',
        preview: 'We noticed a new login to your account from a device we don\'t recognize...',
        timestamp: '1 day ago',
        read: true,
        starred: false
      }
    ],
    sent: [
      {
        id: '3',
        from: 'bob@example.com',
        subject: 'Re: Dinner tonight?',
        preview: 'Sounds great! See you at 8 PM.',
        timestamp: '5 hours ago',
        read: true,
        starred: false
      }
    ],
    drafts: [
      {
        id: '4',
        from: 'charlie@example.com',
        subject: 'Draft: Marketing Strategy',
        preview: 'Here are some initial thoughts on the new marketing campaign...',
        timestamp: '2 days ago',
        read: true,
        starred: false
      }
    ],
    trash: [],
  };

  const folders: Folder[] = [
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: allEmails.inbox.length, color: 'text-blue-600' },
    { id: 'sent', name: 'Sent', icon: Send, count: allEmails.sent.length, color: 'text-green-600' },
    { id: 'drafts', name: 'Drafts', icon: FileText, count: allEmails.drafts.length, color: 'text-orange-600' },
    { id: 'trash', name: 'Trash', icon: Trash2, count: allEmails.trash.length, color: 'text-red-600' }
  ];

  const emails: Email[] = allEmails[selectedFolder] || [];

  const handleSendEmail = () => {
    if (newEmail.to && newEmail.subject) {
      console.log('Sending email:', newEmail);
      // In a real app, you'd handle the API call here
      setNewEmail({ to: '', subject: '', body: '' });
      setComposing(false);
    }
  };

  const handleSelectFolder = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedEmail(null);
  };

  const selectedEmailData = emails.find(e => e.id === selectedEmail);

  return (
    <div className="h-[calc(100vh-8rem)] bg-gray-50 flex flex-col">
      <EmailToolbar
        onCompose={() => setComposing(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex flex-1 min-h-0">
        <EmailSidebar
          folders={folders}
          selectedFolder={selectedFolder}
          onSelectFolder={handleSelectFolder}
        />
        <EmailList
          emails={emails}
          selectedEmail={selectedEmail}
          onSelectEmail={setSelectedEmail}
          folderName={folders.find(f => f.id === selectedFolder)?.name || ''}
          currentFolderId={selectedFolder}
        />
        <EmailDetails
          email={selectedEmailData}
          isFolderEmpty={emails.length === 0}
        />
      </div>

      <ComposeEmailDialog
        open={composing}
        onOpenChange={setComposing}
        newEmail={newEmail}
        onNewEmailChange={setNewEmail}
        onSend={handleSendEmail}
      />
    </div>
  );
};

export default EmailInterface;

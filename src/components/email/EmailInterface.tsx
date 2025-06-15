
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, Send, Plus, Inbox, FileText, Trash2 } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
}

const EmailInterface = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [newEmail, setNewEmail] = useState({ to: '', subject: '', body: '' });

  const folders = [
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: 3 },
    { id: 'sent', name: 'Sent', icon: Send, count: 0 },
    { id: 'drafts', name: 'Drafts', icon: FileText, count: 1 },
    { id: 'trash', name: 'Trash', icon: Trash2, count: 0 }
  ];

  const emails: Email[] = [
    {
      id: '1',
      from: 'alice@example.com',
      subject: 'Project Update',
      preview: 'Here\'s the latest update on our project progress...',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '2',
      from: 'support@service.com',
      subject: 'Security Alert',
      preview: 'We noticed a new login to your account...',
      timestamp: '1 day ago',
      read: true
    }
  ];

  const handleSendEmail = () => {
    if (newEmail.to && newEmail.subject) {
      console.log('Sending email:', newEmail);
      setNewEmail({ to: '', subject: '', body: '' });
      setComposing(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Sidebar */}
      <Card className="w-64">
        <CardHeader>
          <Button onClick={() => setComposing(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.id}
                className={`w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 ${
                  selectedFolder === folder.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
                onClick={() => setSelectedFolder(folder.id)}
              >
                <div className="flex items-center gap-2">
                  <folder.icon className="h-4 w-4" />
                  <span>{folder.name}</span>
                </div>
                {folder.count > 0 && (
                  <span className="bg-gray-200 text-xs rounded-full px-2 py-1">
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email List */}
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {folders.find(f => f.id === selectedFolder)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedEmail === email.id ? 'bg-blue-50' : ''
                } ${!email.read ? 'font-medium' : ''}`}
                onClick={() => setSelectedEmail(email.id)}
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-sm">{email.from}</span>
                    <span className="text-xs text-gray-500">{email.timestamp}</span>
                  </div>
                  <h4 className="font-medium">{email.subject}</h4>
                  <p className="text-sm text-gray-600 truncate">{email.preview}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Email Content or Compose */}
      <Card className="flex-1">
        {composing ? (
          <>
            <CardHeader>
              <CardTitle>Compose Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="To"
                value={newEmail.to}
                onChange={(e) => setNewEmail(prev => ({ ...prev, to: e.target.value }))}
              />
              <Input
                placeholder="Subject"
                value={newEmail.subject}
                onChange={(e) => setNewEmail(prev => ({ ...prev, subject: e.target.value }))}
              />
              <Textarea
                placeholder="Email body"
                className="min-h-[300px]"
                value={newEmail.body}
                onChange={(e) => setNewEmail(prev => ({ ...prev, body: e.target.value }))}
              />
              <div className="flex gap-2">
                <Button onClick={handleSendEmail}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
                <Button variant="outline" onClick={() => setComposing(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </>
        ) : selectedEmail ? (
          <>
            <CardHeader>
              <CardTitle>
                {emails.find(e => e.id === selectedEmail)?.subject}
              </CardTitle>
              <p className="text-sm text-gray-600">
                From: {emails.find(e => e.id === selectedEmail)?.from}
              </p>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>This is the full email content. In a real implementation, this would show the complete encrypted email content.</p>
                <p>Email encryption ensures that only you and the intended recipient can read the message.</p>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-[500px]">
            <p className="text-gray-500">Select an email to read or compose a new one</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default EmailInterface;

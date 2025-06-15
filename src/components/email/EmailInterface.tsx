
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Plus, Inbox, FileText, Trash2, Search, Star, Archive, Reply, Forward, MoreHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Email {
  id: string;
  from: string; // For sent/drafts, this can represent 'to'
  subject:string;
  preview: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
}

const EmailInterface = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [newEmail, setNewEmail] = useState({ to: '', subject: '', body: '' });
  const [searchQuery, setSearchQuery] = useState('');

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

  const folders = [
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

  const selectedEmailData = emails.find(e => e.id === selectedEmail);

  return (
    <div className="h-[calc(100vh-8rem)] bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Mail</h1>
            <Button onClick={() => setComposing(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Compose
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="space-y-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
                  selectedFolder === folder.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedFolder(folder.id);
                  setSelectedEmail(null);
                }}
              >
                <div className="flex items-center gap-3">
                  <folder.icon className={`h-5 w-5 ${folder.color}`} />
                  <span className="font-medium">{folder.name}</span>
                </div>
                {folder.count > 0 && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {folder.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Email List */}
        <div className="w-1/3 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 text-lg">
              {folders.find(f => f.id === selectedFolder)?.name}
            </h2>
          </div>
          <ScrollArea className="h-[calc(100vh-16rem)]">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  selectedEmail === email.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
                } ${!email.read ? 'bg-blue-25' : ''}`}
                onClick={() => setSelectedEmail(email.id)}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${!email.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                        {selectedFolder === 'inbox' ? email.from : `To: ${email.from}`}
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

        {/* Email Content */}
        <div className="flex-1 bg-white">
          {selectedEmailData ? (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedEmailData.subject}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>From: {selectedEmailData.from}</span>
                      <span>{selectedEmailData.timestamp}</span>
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
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {emails.length > 0 ? 'Select an email to read' : 'This folder is empty'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={composing} onOpenChange={setComposing}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 pb-4">
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
              placeholder="Write your message..."
              className="min-h-[300px] resize-none"
              value={newEmail.body}
              onChange={(e) => setNewEmail(prev => ({ ...prev, body: e.target.value }))}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSendEmail} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailInterface;

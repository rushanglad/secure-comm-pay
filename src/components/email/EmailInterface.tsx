
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Search, 
  Send, 
  Shield, 
  Star,
  Archive,
  Trash2,
  Plus
} from 'lucide-react';

const EmailInterface = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const folders = [
    { id: 'inbox', name: 'Inbox', count: 12 },
    { id: 'sent', name: 'Sent', count: 0 },
    { id: 'drafts', name: 'Drafts', count: 3 },
    { id: 'archived', name: 'Archived', count: 45 },
    { id: 'trash', name: 'Trash', count: 2 }
  ];

  const mockEmails = [
    {
      id: '1',
      from: 'team@company.com',
      subject: 'Weekly Project Update',
      preview: 'Here\'s the latest update on our project progress...',
      time: '2:30 PM',
      isRead: false,
      isStarred: true,
      isEncrypted: true
    },
    {
      id: '2',
      from: 'alice@example.com',
      subject: 'Meeting Confirmation',
      preview: 'Just confirming our meeting tomorrow at 10 AM...',
      time: '11:45 AM',
      isRead: true,
      isStarred: false,
      isEncrypted: true
    },
    {
      id: '3',
      from: 'notifications@bank.com',
      subject: 'Transaction Alert',
      preview: 'Your account has been credited with ₹5,000...',
      time: 'Yesterday',
      isRead: true,
      isStarred: false,
      isEncrypted: false
    }
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Email Folders Sidebar */}
      <Card className="w-64 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email
          </CardTitle>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="space-y-1">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between ${
                  selectedFolder === folder.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                }`}
              >
                <span className="text-sm font-medium capitalize">{folder.name}</span>
                {folder.count > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {folder.count}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email List */}
      <Card className="w-96 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-y-auto">
          <div className="space-y-1">
            {mockEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email.id)}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedEmail === email.id ? 'bg-blue-50' : ''
                } ${!email.isRead ? 'bg-blue-25' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${!email.isRead ? 'font-semibold' : 'font-medium'}`}>
                    {email.from}
                  </span>
                  <div className="flex items-center gap-1">
                    {email.isStarred && (
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    )}
                    {email.isEncrypted && (
                      <Shield className="h-3 w-3 text-green-500" />
                    )}
                    <span className="text-xs text-muted-foreground">{email.time}</span>
                  </div>
                </div>
                <p className={`text-sm mb-1 ${!email.isRead ? 'font-medium' : ''}`}>
                  {email.subject}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {email.preview}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Content */}
      <Card className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">
                    {mockEmails.find(e => e.id === selectedEmail)?.subject}
                  </CardTitle>
                  <Shield className="h-4 w-4 text-green-500" />
                  <Badge variant="secondary" className="text-xs">
                    PGP Encrypted
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                From: {mockEmails.find(e => e.id === selectedEmail)?.from}
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <p>
                  {mockEmails.find(e => e.id === selectedEmail)?.preview}
                </p>
                <p className="mt-4">
                  This is a sample email content. In a real implementation, this would show the 
                  decrypted email content with proper formatting and attachments support.
                </p>
              </div>
            </CardContent>
            
            <div className="p-4 border-t">
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Reply
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select an email to read</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EmailInterface;

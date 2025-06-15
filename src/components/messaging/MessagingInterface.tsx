
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Shield, 
  Users,
  Plus,
  Search
} from 'lucide-react';

const MessagingInterface = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const mockChats = [
    {
      id: '1',
      name: 'Work Team',
      lastMessage: 'Meeting scheduled for tomorrow',
      unread: 2,
      isGroup: true,
      encrypted: true
    },
    {
      id: '2',
      name: 'Alice Smith',
      lastMessage: 'Thanks for the update!',
      unread: 0,
      isGroup: false,
      encrypted: true
    },
    {
      id: '3',
      name: 'Family Group',
      lastMessage: 'Dinner plans for Sunday?',
      unread: 5,
      isGroup: true,
      encrypted: true
    }
  ];

  const mockMessages = [
    {
      id: '1',
      sender: 'Alice Smith',
      content: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'I\'m doing great! How about you?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      sender: 'Alice Smith',
      content: 'Thanks for the update!',
      timestamp: '10:35 AM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Chat List Sidebar */}
      <Card className="w-80 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="space-y-1">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === chat.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{chat.name}</span>
                    {chat.isGroup && (
                      <Users className="h-3 w-3 text-muted-foreground" />
                    )}
                    {chat.encrypted && (
                      <Shield className="h-3 w-3 text-green-500" />
                    )}
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="bg-blue-500 text-white text-xs px-2 py-0">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {chat.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">
                    {mockChats.find(c => c.id === selectedChat)?.name}
                  </CardTitle>
                  <Shield className="h-4 w-4 text-green-500" />
                  <Badge variant="secondary" className="text-xs">
                    End-to-End Encrypted
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.isOwn
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {!msg.isOwn && (
                        <p className="text-xs font-medium mb-1">{msg.sender}</p>
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MessagingInterface;

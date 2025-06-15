
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Image, 
  FileText, 
  X,
  Search,
  MoreVertical,
  Lock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroup?: boolean;
}

const MessagingInterface = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'John Doe',
      content: 'Hey, how are you? I wanted to discuss the project details.',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'You',
      content: "I'm doing great! How about you? Let's set up a call to discuss.",
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      sender: 'John Doe',
      content: 'Perfect! I have some documents to share with you.',
      timestamp: '10:35 AM',
      isOwn: false,
      attachments: [
        {
          id: '1',
          name: 'project-specs.pdf',
          type: 'file',
          size: '2.4 MB'
        }
      ]
    }
  ]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const chats: Chat[] = [
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Perfect! I have some documents...',
      timestamp: '2 min ago',
      unread: 0
    },
    {
      id: '2',
      name: 'Project Team',
      lastMessage: 'Meeting at 3 PM today',
      timestamp: '1 hour ago',
      unread: 2,
      isGroup: true
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      lastMessage: 'Thanks for the update!',
      timestamp: '3 hours ago',
      unread: 0
    }
  ];

  const currentChat = chats.find(c => c.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim() || attachments.length > 0) {
      const messageAttachments = attachments.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' as const : 'file' as const,
        size: formatFileSize(file.size)
      }));

      const message: Message = {
        id: `${Date.now()}`,
        sender: 'You',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        attachments: messageAttachments.length > 0 ? messageAttachments : undefined
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setAttachments([]);
      
      toast({
        title: "Message sent",
        description: "Your message has been delivered with end-to-end encryption.",
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50/50">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Messages
            </h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-1 ${
                  selectedChat === chat.id 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'hover:bg-white hover:shadow-sm'
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                      {chat.isGroup && (
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-2">
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    {chat.unread > 0 && (
                      <span className="bg-primary text-white rounded-full px-2 py-0.5 text-xs font-medium min-w-[20px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {selectedChat && currentChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{currentChat.name}</h3>
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

            {/* Messages Area */}
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

            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                      {file.type.startsWith('image/') ? (
                        <Image className="h-4 w-4 text-gray-500" />
                      ) : (
                        <FileText className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="text-sm text-gray-700 truncate max-w-32">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                {/* Attachment Buttons */}
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach file"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => imageInputRef.current?.click()}
                    title="Attach image"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                </div>

                {/* Message Input */}
                <div className="flex-1">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[36px] resize-none border-gray-200 focus:border-primary"
                  />
                </div>

                {/* Send Button */}
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() && attachments.length === 0}
                  className="h-9 w-9 p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Hidden File Inputs */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.txt,.zip,.rar"
            />
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
              accept="image/*"
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a conversation to start messaging</p>
              <p className="text-sm text-gray-400 mt-1">All messages are end-to-end encrypted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingInterface;

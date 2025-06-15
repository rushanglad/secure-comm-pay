
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ChatListSidebar from './ChatListSidebar';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import AttachmentPreview from './AttachmentPreview';
import MessageInput from './MessageInput';
import EmptyState from './EmptyState';

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

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg border border-gray-200 overflow-hidden">
      <ChatListSidebar 
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />

      <div className="flex-1 flex flex-col">
        {selectedChat && currentChat ? (
          <>
            <ChatHeader chatName={currentChat.name} />
            <MessageList messages={messages} />
            <AttachmentPreview 
              attachments={attachments}
              onRemoveAttachment={removeAttachment}
            />
            <MessageInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              attachments={attachments}
              onSendMessage={handleSendMessage}
              onFileSelect={handleFileSelect}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default MessagingInterface;

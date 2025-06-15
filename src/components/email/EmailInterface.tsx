
import { EmailToolbar } from './EmailToolbar';
import { EmailSidebar } from './EmailSidebar';
import { EmailList } from './EmailList';
import { EmailDetails } from './EmailDetails';
import { ComposeEmailDialog } from './ComposeEmailDialog';
import { useEmailState } from '@/hooks/useEmailState';

const EmailInterface = () => {
  const {
    selectedFolder,
    selectedEmail,
    composing,
    newEmail,
    searchQuery,
    folders,
    emails,
    selectedEmailData,
    setSelectedEmail,
    setComposing,
    setNewEmail,
    setSearchQuery,
    handleSendEmail,
    handleSelectFolder,
  } = useEmailState();

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

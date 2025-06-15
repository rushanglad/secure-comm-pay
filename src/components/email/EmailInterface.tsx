
import { EmailToolbar } from './EmailToolbar';
import { EmailSidebar } from './EmailSidebar';
import { EmailList } from './EmailList';
import { EmailDetails } from './EmailDetails';
import { ComposeEmailDialog } from './ComposeEmailDialog';
import { useEmailState } from '@/hooks/useEmailState';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

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

  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [showEmailDetails, setShowEmailDetails] = useState(false);

  const handleSelectEmailMobile = (emailId: string) => {
    setSelectedEmail(emailId);
    if (isMobile) {
      setShowEmailDetails(true);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-gray-50 flex flex-col">
      <EmailToolbar
        onCompose={() => setComposing(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        showSidebarToggle={isMobile}
      />

      <div className="flex flex-1 min-h-0 relative">
        {/* Mobile: Sliding panels */}
        {isMobile ? (
          <>
            {/* Sidebar */}
            {showSidebar && (
              <div className="absolute inset-0 z-20 bg-white">
                <EmailSidebar
                  folders={folders}
                  selectedFolder={selectedFolder}
                  onSelectFolder={(folderId) => {
                    handleSelectFolder(folderId);
                    setShowSidebar(false);
                  }}
                />
              </div>
            )}
            
            {/* Email List */}
            {!showSidebar && !showEmailDetails && (
              <div className="flex-1">
                <EmailList
                  emails={emails}
                  selectedEmail={selectedEmail}
                  onSelectEmail={handleSelectEmailMobile}
                  folderName={folders.find(f => f.id === selectedFolder)?.name || ''}
                  currentFolderId={selectedFolder}
                />
              </div>
            )}
            
            {/* Email Details */}
            {showEmailDetails && (
              <div className="flex-1">
                <EmailDetails
                  email={selectedEmailData}
                  isFolderEmpty={emails.length === 0}
                  onBack={() => setShowEmailDetails(false)}
                  showBackButton={true}
                />
              </div>
            )}
          </>
        ) : (
          /* Desktop: Side by side layout */
          <>
            {showSidebar && (
              <EmailSidebar
                folders={folders}
                selectedFolder={selectedFolder}
                onSelectFolder={handleSelectFolder}
              />
            )}
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
          </>
        )}
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

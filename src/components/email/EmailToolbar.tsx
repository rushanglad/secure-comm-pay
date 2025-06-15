
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Menu } from 'lucide-react';

interface EmailToolbarProps {
  onCompose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
}

export const EmailToolbar = ({
  onCompose,
  searchQuery,
  setSearchQuery,
  onToggleSidebar,
  showSidebarToggle,
}: EmailToolbarProps) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showSidebarToggle && onToggleSidebar && (
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden mr-2"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold text-gray-900">Mail</h1>
          <Button onClick={onCompose} className="bg-blue-600 hover:bg-blue-700">
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
  );
};

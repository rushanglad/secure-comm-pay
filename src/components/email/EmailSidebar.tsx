
import { Badge } from '@/components/ui/badge';
import type { Folder } from './types';

interface EmailSidebarProps {
  folders: Folder[];
  selectedFolder: string;
  onSelectFolder: (folderId: string) => void;
}

export const EmailSidebar = ({ folders, selectedFolder, onSelectFolder }: EmailSidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 shrink-0">
      <div className="space-y-2">
        {folders.map((folder) => (
          <button
            key={folder.id}
            className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
              selectedFolder === folder.id 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelectFolder(folder.id)}
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
  );
};

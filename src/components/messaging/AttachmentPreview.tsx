
import { Button } from '@/components/ui/button';
import { Image, FileText, X } from 'lucide-react';

interface AttachmentPreviewProps {
  attachments: File[];
  onRemoveAttachment: (index: number) => void;
}

const AttachmentPreview = ({ attachments, onRemoveAttachment }: AttachmentPreviewProps) => {
  if (attachments.length === 0) return null;

  return (
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
              onClick={() => onRemoveAttachment(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentPreview;

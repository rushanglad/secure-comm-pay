
import type { LucideIcon } from 'lucide-react';

export interface Email {
  id: string;
  from: string; // For sent/drafts, this can represent 'to'
  subject:string;
  preview: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
}

export interface Folder {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  color: string;
}

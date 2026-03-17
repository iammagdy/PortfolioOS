import { ReactNode } from 'react';

export enum FileType {
  FOLDER = 'FOLDER',
  FILE = 'FILE',
  APP = 'APP',
}

export enum AppID {
  FINDER = 'finder',
  TERMINAL = 'terminal',
  TEXT_EDITOR = 'text_editor',
  IMAGE_VIEWER = 'image_viewer',
  PDF_VIEWER = 'pdf_viewer',
  EMAIL = 'email',
  MINESWEEPER = 'minesweeper',
  SNAKE = 'snake',
  TRASH = 'trash',
  SYSTEM_PREFERENCES = 'system_preferences',
  ACHIEVEMENTS = 'achievements',
  CALENDAR = 'calendar',
}

export type ThemeId = 'modern' | 'retro' | 'cyberpunk' | 'paper' | 'nord';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
}

export interface FileSystemItem {
  id: string;
  name: string;
  type: FileType;
  parentId: string | null;
  content?: string; // For text files
  src?: string; // For images/PDFs
  appId?: AppID; // If it opens a specific app
  children?: string[]; // IDs of children if folder
  icon?: string; // Custom icon override
  locked?: boolean;
  lockedMessage?: string; // Message to show if file is locked/restricted
}

export interface WindowState {
  id: string;
  appId: AppID;
  title: string;
  contentId?: string; // File ID if associated
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface SystemState {
  windows: WindowState[];
  activeWindowId: string | null;
  files: Record<string, FileSystemItem>;
  clipboard: string | null;
  theme: 'light' | 'dark';
}

export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => string | void;
}
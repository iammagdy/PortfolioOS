import { FileSystemItem } from '../types';

export const getChildren = (files: Record<string, FileSystemItem>, folderId: string) => {
  const folder = files[folderId];
  if (!folder || !folder.children) return [];
  return folder.children.map(childId => files[childId]);
};

export const getPath = (files: Record<string, FileSystemItem>, itemId: string): FileSystemItem[] => {
  const path: FileSystemItem[] = [];
  let current: FileSystemItem | undefined = files[itemId];
  
  while (current && current.id !== 'root') {
    path.unshift(current);
    if (!current.parentId) break;
    current = files[current.parentId];
  }
  return path;
};

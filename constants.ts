import { FileSystemItem, FileType, AppID, Theme } from './types';
import { FileText, Folder, Terminal, Image, Mail, Gamepad2, Trash2, Cpu, User, Briefcase, Code, StickyNote, Settings, Activity } from 'lucide-react';

export const INITIAL_FILES: Record<string, FileSystemItem> = {
  'root': { id: 'root', name: 'Root', type: FileType.FOLDER, parentId: null, children: ['desktop', 'documents', 'downloads'] },
  'desktop': { id: 'desktop', name: 'Desktop', type: FileType.FOLDER, parentId: 'root', children: ['folder_about', 'folder_experience', 'folder_projects', 'file_cv', 'app_email', 'app_terminal', 'folder_playground', 'trash_bin'] },
  
  // Desktop Items
  'folder_about': { id: 'folder_about', name: 'About Me', type: FileType.FOLDER, parentId: 'desktop', children: ['bio_txt', 'values_md'] },
  'folder_experience': { id: 'folder_experience', name: 'Experience', type: FileType.FOLDER, parentId: 'desktop', children: ['exp_corp', 'exp_startup'] },
  'folder_projects': { id: 'folder_projects', name: 'Projects', type: FileType.FOLDER, parentId: 'desktop', children: ['proj_1', 'proj_2', 'proj_3', 'proj_4'] },
  'folder_playground': { id: 'folder_playground', name: 'Playground', type: FileType.FOLDER, parentId: 'desktop', children: ['app_minesweeper', 'app_snake', 'secret_txt'] },
  
  // Files - About
  'bio_txt': { 
    id: 'bio_txt', 
    name: 'bio.txt', 
    type: FileType.FILE, 
    parentId: 'folder_about', 
    appId: AppID.TEXT_EDITOR,
    content: `HI, I'M JOHN DOE.\n\nI am a creative software engineer with a passion for building intuitive, high-performance digital experiences.\n\nI specialize in modern web technologies and user interface design. I believe software should be as beautiful as it is functional.` 
  },
  'values_md': { 
    id: 'values_md', 
    name: 'values.md', 
    type: FileType.FILE, 
    parentId: 'folder_about', 
    appId: AppID.TEXT_EDITOR,
    content: `# Core Principles\n\n1. **Simplicity**: Clear thought leads to clear code.\n2. **Impact**: Focus on work that moves the needle.\n3. **Empathy**: Design for the person using the tool.\n4. **Growth**: Always be learning.` 
  },

  // Files - Experience
  'exp_corp': { 
    id: 'exp_corp', 
    name: 'Senior_Dev_TechCorp.txt', 
    type: FileType.FILE, 
    parentId: 'folder_experience', 
    appId: AppID.TEXT_EDITOR,
    content: `TECH GIANT CORP (2021 - Present)\nSenior Software Engineer\n\n- Led a team of 8 developers in re-architecting the legacy platform.\n- Reduced build times by 60% through optimized pipelines.\n- Collaborated across departments to launch key Q4 features.` 
  },
  'exp_startup': { 
    id: 'exp_startup', 
    name: 'Lead_InnovateInc.txt', 
    type: FileType.FILE, 
    parentId: 'folder_experience', 
    appId: AppID.TEXT_EDITOR,
    content: `INNOVATE INC (2018 - 2021)\nLead Developer\n\n- Built the core product from zero to one.\n- Managed deployment infrastructure on AWS.\n- Scaled user base from 0 to 100k active users.` 
  },

  // Files - Projects (4 Projects)
  'proj_1': { 
    id: 'proj_1', 
    name: 'E-Commerce_Platform.png', 
    type: FileType.FILE, 
    parentId: 'folder_projects', 
    appId: AppID.IMAGE_VIEWER,
    src: 'https://picsum.photos/id/1/800/600'
  },
  'proj_2': { 
    id: 'proj_2', 
    name: 'Analytics_Dashboard.png', 
    type: FileType.FILE, 
    parentId: 'folder_projects', 
    appId: AppID.IMAGE_VIEWER,
    src: 'https://picsum.photos/id/20/800/601'
  },
  'proj_3': { 
    id: 'proj_3', 
    name: 'Finance_App_Mobile.png', 
    type: FileType.FILE, 
    parentId: 'folder_projects', 
    appId: AppID.IMAGE_VIEWER,
    src: 'https://picsum.photos/id/48/800/602'
  },
  'proj_4': { 
    id: 'proj_4', 
    name: 'Design_System_UI.png', 
    type: FileType.FILE, 
    parentId: 'folder_projects', 
    appId: AppID.IMAGE_VIEWER,
    src: 'https://picsum.photos/id/180/800/603'
  },

  // CV
  'file_cv': { 
    id: 'file_cv', 
    name: 'Resume.pdf', 
    type: FileType.FILE, 
    parentId: 'desktop', 
    appId: AppID.PDF_VIEWER,
    content: "CV CONTENT" 
  },

  // Apps on Desktop as Shortcuts
  'app_email': { id: 'app_email', name: 'Mail', type: FileType.APP, parentId: 'desktop', appId: AppID.EMAIL },
  'app_terminal': { id: 'app_terminal', name: 'Terminal', type: FileType.APP, parentId: 'desktop', appId: AppID.TERMINAL },
  'app_minesweeper': { id: 'app_minesweeper', name: 'Minesweeper', type: FileType.APP, parentId: 'folder_playground', appId: AppID.MINESWEEPER },
  'app_snake': { id: 'app_snake', name: 'Snake', type: FileType.APP, parentId: 'folder_playground', appId: AppID.SNAKE },
  
  // Playground
  'secret_txt': { id: 'secret_txt', name: 'secret.txt', type: FileType.FILE, parentId: 'folder_playground', appId: AppID.TEXT_EDITOR, content: "You found the secret! Try typing 'easter_eggs' in the terminal." },

  // Trash & Restricted Files
  'trash_bin': { 
    id: 'trash_bin', 
    name: 'Trash', 
    type: FileType.FOLDER, 
    parentId: 'desktop', 
    appId: AppID.TRASH, 
    icon: 'trash',
    children: ['trash_passwords', 'trash_journal', 'trash_bank', 'trash_projects']
  },
  'trash_passwords': { 
    id: 'trash_passwords', 
    name: 'passwords.txt', 
    type: FileType.FILE, 
    parentId: 'trash_bin', 
    appId: AppID.TEXT_EDITOR,
    lockedMessage: "Absolutely not. PS don't store your passwords in a .txt file like EVER"
  },
  'trash_journal': { 
    id: 'trash_journal', 
    name: 'journal_2020-2022.txt', 
    type: FileType.FILE, 
    parentId: 'trash_bin', 
    appId: AppID.TEXT_EDITOR,
    lockedMessage: "Nope. Nope. Nope."
  },
  'trash_bank': { 
    id: 'trash_bank', 
    name: 'bank_transactions_2021.csv', 
    type: FileType.FILE, 
    parentId: 'trash_bin', 
    appId: AppID.TEXT_EDITOR,
    lockedMessage: "Financial data is not part of the portfolio."
  },
  'trash_projects': { 
    id: 'trash_projects', 
    name: 'side_projects_roi.csv', 
    type: FileType.FILE, 
    parentId: 'trash_bin', 
    appId: AppID.TEXT_EDITOR,
    lockedMessage: "Some metrics hurt more than they help."
  },
};

export const DOCK_ITEMS = [
  { id: 'finder', appId: AppID.FINDER, name: 'Finder', icon: User },
  { id: 'mail', appId: AppID.EMAIL, name: 'Mail', icon: Mail },
  { id: 'terminal', appId: AppID.TERMINAL, name: 'Terminal', icon: Terminal },
  { id: 'text', appId: AppID.TEXT_EDITOR, name: 'Notes', icon: StickyNote },
  { id: 'minesweeper', appId: AppID.MINESWEEPER, name: 'Minesweeper', icon: Gamepad2 },
  { id: 'snake', appId: AppID.SNAKE, name: 'Snake', icon: Activity },
  { id: 'settings', appId: AppID.SYSTEM_PREFERENCES, name: 'Settings', icon: Settings },
  { id: 'trash', appId: AppID.TRASH, name: 'Trash', icon: Trash2 },
];

export const THEMES: Theme[] = [
  { id: 'modern', name: 'Modern (Default)', description: 'The standard clean macOS-inspired look.' },
  { id: 'retro', name: 'Concrete', description: 'Brutalist grays and industrial sharp edges.' },
  { id: 'cyberpunk', name: 'Vintage Tech', description: 'Green phosphor, scanlines, and high contrast.' },
  { id: 'paper', name: 'Minimal', description: 'Stark monochrome with clean outlines.' },
  { id: 'nord', name: 'Aurora', description: 'Cool night sky and arctic palette.' },
];

export const WALLPAPERS = [
  // Default (moved Peak here)
  { id: 'nord-mountain', name: 'Peak', value: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2560&auto=format&fit=crop)', type: 'image' },

  // Modern / macOS Defaults
  { id: 'default', name: 'Warm Mist', value: 'radial-gradient(circle at 50% 50%, #e7e5e4 0%, #a8a29e 100%)', type: 'gradient' },
  { id: 'sequoia', name: 'Sequoia', value: 'url(https://images.unsplash.com/photo-1707164964646-34064560b21a?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'sonoma', name: 'Sonoma', value: 'url(https://images.unsplash.com/photo-1696423736561-6a2c22272304?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'ventura', name: 'Ventura', value: 'url(https://images.unsplash.com/photo-1667069396349-2e0e564d257a?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'monterey', name: 'Monterey', value: 'url(https://images.unsplash.com/photo-1627483262769-04d0a1401487?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'bigsur', name: 'Big Sur', value: 'url(https://images.unsplash.com/photo-1605218427368-35b861218f2e?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'abstract-shapes', name: 'Abstract', value: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  
  // Concrete (Was Retro)
  { id: 'retro-teal', name: 'Concrete Teal', value: '#008080', type: 'color' },
  { id: 'retro-grid', name: 'Industrial Grid', value: 'url(https://images.unsplash.com/photo-1614726365205-592b23a72665?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'retro-setup', name: 'Workstation', value: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'retro-tape', name: 'Analog', value: 'url(https://images.unsplash.com/photo-1592930954854-7d07c82aa90d?q=80&w=2560&auto=format&fit=crop)', type: 'image' },

  // Vintage Tech (Was Cyberpunk)
  { id: 'cyber-city', name: 'Phosphor City', value: 'url(https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'cyber-grid', name: 'Mainframe', value: 'url(https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'cyber-rain', name: 'Digital Rain', value: 'url(https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'cyber-board', name: 'Circuitry', value: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2560&auto=format&fit=crop)', type: 'image' },

  // Minimal (Was Paper)
  { id: 'paper-crumpled', name: 'White Noise', value: 'url(https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'paper-arch', name: 'Architecture', value: 'url(https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'paper-draw', name: 'Draft', value: 'url(https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'paper-texture', name: 'Canvas', value: 'url(https://images.unsplash.com/photo-1579762593158-b525143a5716?q=80&w=2560&auto=format&fit=crop)', type: 'image' },

  // Aurora (Was Nord)
  { id: 'nord-lake', name: 'Aurora Lake', value: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'nord-snow', name: 'Snow', value: 'url(https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  { id: 'nord-fog', name: 'Foggy Pines', value: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop)', type: 'image' },
  
  // Solids
  { id: 'dark', name: 'Midnight', value: '#1c1917', type: 'color' },
  { id: 'solid-gray', name: 'Studio', value: '#44403c', type: 'color' },
];

export const ACHIEVEMENTS_LIST = [
  { id: 'first_boot', name: 'First Boot', description: 'Booted up the system for the first time.' },
  { id: 'desktop_explorer', name: 'Desktop Explorer', description: 'Opened 5 different files or folders.' },
  { id: 'context_matters', name: 'Context Matters', description: 'Read both About Me files.' },
  { id: 'reference_check', name: 'Reference Check', description: 'Opened the Mail app.' },
  { id: 'actually_read_it', name: 'Actually Read It', description: 'Opened the CV PDF.' },
  { id: 'command_line_curious', name: 'Command Line Curious', description: 'Executed a command in the Terminal.' },
  { id: 'help_actually', name: 'Help, Actually', description: 'Asked for help in the Terminal.' },
  { id: 'trash_explorer', name: 'Trash Explorer', description: 'Tried to open every file in the Trash.' },
  { id: 'first_mine', name: 'First Mine', description: 'Exploded a mine in Minesweeper.' },
  { id: 'clean_board', name: 'Clean Board', description: 'Won a game of Minesweeper.' },
  { id: 'just_one_more', name: 'Just One More', description: 'Restarted a game.' },
  { id: 'gamer', name: 'Gamer', description: 'Played both Minesweeper and Snake.' },
];
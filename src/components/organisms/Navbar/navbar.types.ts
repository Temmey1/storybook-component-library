import { ReactNode } from 'react';

export interface NavLink {
  label: string;
  href: string;
  icon?: ReactNode;
  isExternal?: boolean;
  badge?: {
    text: string;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  };
  subLinks?: NavLink[];
}

export interface UserProfile {
  name: string;
  avatar: string;
  role?: string;
  notifications?: number;
  status?: 'online' | 'offline' | 'busy' | 'away';
  email?: string;
  actions?: {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
  }[];
}

export interface SearchConfig {
  enabled?: boolean;
  placeholder?: string;
  onSearch?: (query: string) => void;
  searchButtonLabel?: string;
  quickLinks?: {
    label: string;
    href: string;
  }[];
}

export interface NotificationConfig {
  enabled?: boolean;
  count?: number;
  items?: {
    id: string;
    title: string;
    message: string;
    time: string;
    isRead?: boolean;
    type?: 'info' | 'success' | 'warning' | 'error';
    action?: {
      label: string;
      onClick: () => void;
    };
  }[];
  onNotificationClick?: (id: string) => void;
  onMarkAllRead?: () => void;
  maxHeight?: string;
}

export interface NavbarProps {
  /**
   * The logo component or image to display
   */
  logo: ReactNode;
  
  /**
   * Array of navigation links
   */
  navLinks: NavLink[];
  
  /**
   * User profile information for the avatar
   */
  userProfile: UserProfile;
  
  /**
   * Whether to show the mobile menu by default
   * @default false
   */
  isMobileMenuOpen?: boolean;
  
  /**
   * Custom CSS class for the navbar
   */
  className?: string;
  
  /**
   * Whether to make the navbar sticky
   * @default false
   */
  isSticky?: boolean;
  
  /**
   * Background color variant
   * @default "light"
   */
  variant?: 'light' | 'dark' | 'transparent';
  
  /**
   * Search configuration
   */
  searchConfig?: SearchConfig;
  
  /**
   * Notification configuration
   */
  notificationConfig?: NotificationConfig;
  
  /**
   * Whether to show a language selector
   * @default false
   */
  showLanguageSelector?: boolean;
  
  /**
   * Available languages for the language selector
   */
  languages?: {
    code: string;
    name: string;
    flag?: string;
  }[];
  
  /**
   * Current selected language
   */
  currentLanguage?: string;
  
  /**
   * Callback when language is changed
   */
  onLanguageChange?: (languageCode: string) => void;
  
  /**
   * Whether to show a theme toggle (light/dark)
   * @default false
   */
  showThemeToggle?: boolean;
  
  /**
   * Current theme
   */
  theme?: 'light' | 'dark';
  
  /**
   * Callback when theme is toggled
   */
  onThemeToggle?: () => void;
  
  /**
   * Callback when mobile menu state changes
   */
  onMobileMenuToggle?: (isOpen: boolean) => void;
  
  /**
   * Callback when user profile is clicked
   */
  onProfileClick?: () => void;
  
  /**
   * Whether to show a divider between navbar items
   * @default false
   */
  showDividers?: boolean;
  
  /**
   * Maximum width for the navbar container
   * @default "7xl"
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
} 
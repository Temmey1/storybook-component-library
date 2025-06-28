import { ReactNode } from 'react';

export interface FooterLink {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface FooterSocialLink extends FooterLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'github' | 'youtube';
}

export interface FooterProps {
  /**
   * Content to be displayed in the left section of the footer
   */
  left?: ReactNode;
  
  /**
   * Content to be displayed in the center section of the footer
   */
  center?: ReactNode;
  
  /**
   * Content to be displayed in the right section of the footer
   */
  right?: ReactNode;

  /**
   * Navigation links to be displayed in the footer
   */
  navigationLinks?: FooterLink[];

  /**
   * Social media links with icons
   */
  socialLinks?: FooterSocialLink[];

  /**
   * Copyright text to be displayed
   */
  copyrightText?: string;

  /**
   * Logo element or image
   */
  logo?: ReactNode;

  /**
   * Optional CSS class name for additional styling
   */
  className?: string;
  
  /**
   * Optional background color variant
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'transparent';

  /**
   * Optional size variant that affects padding and text size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether to show a newsletter subscription form
   * @default false
   */
  showNewsletter?: boolean;

  /**
   * Callback function when newsletter form is submitted
   */
  onNewsletterSubmit?: (email: string) => void;

  /**
   * Whether to show the logo in the mobile view
   * @default true
   */
  showLogoOnMobile?: boolean;

  /**
   * Whether to use a sticky footer that stays at the bottom
   * @default false
   */
  sticky?: boolean;
} 
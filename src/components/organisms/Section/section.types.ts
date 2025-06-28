import { ReactNode } from 'react';

/**
 * Props for the Section component
 * 
 * @interface SectionProps
 */
export interface SectionProps {
  /** Main content of the section */
  children: ReactNode;
  /** Section title */
  title?: string;
  /** Section subtitle or description */
  subtitle?: string;
  /** Additional content for the header */
  headerContent?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'shadowed';
  /** Background color variant */
  background?: 'white' | 'gray' | 'transparent';
  /** Size variant affects padding and spacing */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show divider between header and content */
  showHeaderDivider?: boolean;
  /** Whether to show divider between content and footer */
  showFooterDivider?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether the section is collapsible */
  collapsible?: boolean;
  /** Whether the section is initially collapsed */
  defaultCollapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapseChange?: (isCollapsed: boolean) => void;
  /** Custom header actions */
  actions?: ReactNode;
  /** Whether to show loading state */
  loading?: boolean;
  /** Whether to disable the section */
  disabled?: boolean;
} 
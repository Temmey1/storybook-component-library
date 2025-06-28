/**
 * A versatile section component for organizing and displaying content with headers, footers, and various styling options.
 * 
 * @component
 * @example
 * ```tsx
 * import { Section } from '@your-library/components';
 * 
 * function App() {
 *   return (
 *     <Section
 *       title="Dashboard Overview"
 *       subtitle="Key metrics and statistics"
 *       actions={
 *         <Button variant="primary">Export</Button>
 *       }
 *       footer={
 *         <div className="text-sm text-gray-500">Last updated: 2 hours ago</div>
 *       }
 *       variant="bordered"
 *       background="white"
 *       showHeaderDivider
 *     >
 *       <div className="grid grid-cols-3 gap-4">
 *         {'\/* Your dashboard content *\/'}
 *       </div>
 *     </Section>
 *   );
 * }
 * ```
 */ 

import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from './section.types';
import '../../../styles/components/Section/section.css';

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const LoadingSpinner = () => (
  <div role="status" className="flex flex-col items-center gap-4 mt-8">
    <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-gray-200 border-t-blue-600" />
    <span className="text-gray-900 dark:text-gray-100">Loading...</span>
    <span className="sr-only">Loading</span>
  </div>
);

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  headerContent,
  footer,
  variant = 'default',
  background = 'white',
  size = 'md',
  showHeaderDivider = false,
  showFooterDivider = false,
  className,
  collapsible = false,
  defaultCollapsed = false,
  onCollapseChange,
  actions,
  loading = false,
  disabled = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handleCollapse = () => {
    if (collapsible && !disabled) {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      onCollapseChange?.(newState);
    }
  };

  const sectionClasses = classNames(
    'section',
    `section-${variant}`,
    `section-${size}`,
    `section-bg-${background}`,
    'p-3 sm:p-6',
    {
      'section-disabled': disabled,
      'section-loading': loading,
      'section-collapsible': collapsible,
      'section-collapsed': isCollapsed,
    },
    className
  );

  const headerClasses = classNames('section-header', 'px-2 sm:px-4', {
    'section-header-with-divider': showHeaderDivider,
    'section-header-collapsible': collapsible,
  });

  const contentClasses = classNames('section-content', 'px-2 sm:px-4', {
    'section-content-collapsed': isCollapsed,
  });

  const footerClasses = classNames('section-footer', 'px-2 sm:px-4', {
    'section-footer-with-divider': showFooterDivider,
  });

  return (
    <div className={sectionClasses}>
      {(title || subtitle || headerContent || actions) && (
        <div className={headerClasses} onClick={collapsible ? handleCollapse : undefined}>
          <div className="section-header-content">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
            {headerContent}
          </div>
          <div className="section-header-actions">
            {actions}
            {collapsible && (
              <button
                className="section-collapse-button"
                onClick={handleCollapse}
                disabled={disabled}
                aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
              >
                <ChevronDownIcon />
              </button>
            )}
          </div>
        </div>
      )}

      <div className={contentClasses}>
        {loading ? (
          <div className="section-loading-indicator">
            <LoadingSpinner />
          </div>
        ) : (
          children
        )}
      </div>

      {footer && <div className={footerClasses}>{footer}</div>}
    </div>
  );
};
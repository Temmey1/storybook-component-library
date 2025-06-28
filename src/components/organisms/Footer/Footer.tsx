import React, { useState } from 'react';
import classNames from 'classnames';
import { FooterProps, FooterSocialLink } from './footer.types';

const SocialIcon: React.FC<{ platform: FooterSocialLink['platform'] }> = ({ platform }) => {
  const iconClasses = "w-5 h-5";
  
  const icons = {
    facebook: <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/></svg>,
    twitter: <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
    linkedin: <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    instagram: <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>,
    github: <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
    youtube: <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  };

  return icons[platform] || null;
};

/**
 * A modern, responsive footer component that can be used at the bottom of pages or sections.
 * Supports left, center, and right content sections that stack on mobile and align horizontally on larger screens.
 *
 * @example
 * ```tsx
 * <Footer
 *   left={<span>© 2024 Company Name. All rights reserved.</span>}
 *   center={<img src="/logo.svg" alt="Logo" className="h-8" />}
 *   right={(
 *     <div className="flex gap-4">
 *       <a href="/privacy">Privacy</a>
 *       <a href="/terms">Terms</a>
 *     </div>
 *   )}
 * />
 * ```
 */
export const Footer: React.FC<FooterProps> = ({
  left,
  center,
  right,
  className,
  variant = 'light',
  size = 'md',
  navigationLinks = [],
  socialLinks = [],
  copyrightText,
  logo,
  showNewsletter = false,
  onNewsletterSubmit,
  showLogoOnMobile = true,
  sticky = false,
}) => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewsletterSubmit?.(email);
    setEmail('');
  };

  const footerClasses = classNames(
    'w-full',
    'border-t',
    {
      'bg-white border-gray-200': variant === 'light',
      'bg-gray-900 text-white border-gray-800': variant === 'dark',
      'bg-transparent': variant === 'transparent',
      'fixed bottom-0 left-0': sticky,
    },
    className
  );

  const linkClasses = classNames(
    'text-sm hover:underline transition-colors duration-200',
    {
      'text-gray-600 hover:text-gray-900': variant === 'light',
      'text-gray-300 hover:text-white': variant === 'dark',
    }
  );

  const socialIconClasses = classNames(
    'p-2 rounded-full transition-colors duration-200 hover:bg-opacity-10',
    {
      'hover:bg-gray-100': variant === 'light',
      'hover:bg-gray-800': variant === 'dark',
    }
  );

  return (
    <footer className={footerClasses}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Company Info */}
          <div className={classNames("space-y-4", { 'hidden sm:block': !showLogoOnMobile })}>
            {logo && <div className="mb-4">{logo}</div>}
            {left && <div className="text-sm text-gray-600 dark:text-gray-400">{left}</div>}
          </div>

          {/* Navigation Links - Split into columns */}
          {navigationLinks.length > 0 && (
            <div className="grid grid-cols-2 gap-4 lg:col-span-2">
              <div>
                <h3 className={classNames("font-semibold mb-4", {
                  "text-gray-900": variant === 'light',
                  "text-white": variant === 'dark'
                })}>Quick Links</h3>
                <ul className="space-y-2">
                  {navigationLinks.slice(0, Math.ceil(navigationLinks.length / 2)).map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className={linkClasses}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={classNames("font-semibold mb-4", {
                  "text-gray-900": variant === 'light',
                  "text-white": variant === 'dark'
                })}>Resources</h3>
                <ul className="space-y-2">
                  {navigationLinks.slice(Math.ceil(navigationLinks.length / 2)).map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className={linkClasses}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Newsletter Section */}
          {showNewsletter && (
            <div className="space-y-4">
              <h3 className={classNames("font-semibold", {
                "text-gray-900": variant === 'light',
                "text-white": variant === 'dark'
              })}>Stay Updated</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Subscribe to our newsletter</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className={classNames(
                    'w-full px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                    {
                      'bg-blue-600 text-white hover:bg-blue-700': variant === 'light',
                      'bg-blue-500 text-white hover:bg-blue-400': variant === 'dark',
                    }
                  )}
                >
                  Subscribe
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            {copyrightText && (
              <div className={classNames('text-sm', {
                'text-gray-600': variant === 'light',
                'text-gray-400': variant === 'dark',
              })}>
                {copyrightText}
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={socialIconClasses}
                    aria-label={`Follow us on ${link.platform}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon platform={link.platform} />
                  </a>
                ))}
              </div>
            )}

            {/* Additional Links */}
            {right && (
              <div className="flex items-center gap-4">
                {right}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}; 
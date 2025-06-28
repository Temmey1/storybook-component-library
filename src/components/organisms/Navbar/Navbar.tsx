import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { NavbarProps } from './navbar.types';
import { Avatar } from '../../atoms/Avatar';
import '../../../styles/components/Navbar/navbar.css';

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  navLinks,
  userProfile,
  isMobileMenuOpen = false,
  className,
  isSticky = false,
  variant = 'light',
  searchConfig,
  notificationConfig,
  showLanguageSelector = false,
  languages = [],
  currentLanguage,
  onLanguageChange,
  showThemeToggle = false,
  theme = 'light',
  onThemeToggle,
  onMobileMenuToggle,
  onProfileClick,
  showDividers = false,
  maxWidth = '7xl',
}) => {
  const [isOpen, setIsOpen] = useState(isMobileMenuOpen);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSticky) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isSticky]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMobileMenuToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onMobileMenuToggle?.(newState);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchConfig?.onSearch?.(searchQuery);
  };

  const handleNotificationClick = (id: string) => {
    notificationConfig?.onNotificationClick?.(id);
    setIsNotificationsOpen(false);
  };

  const handleLanguageSelect = (code: string) => {
    onLanguageChange?.(code);
    setIsLanguageOpen(false);
  };

  const containerClasses = classNames(
    'navbar-container',
    `max-w-${maxWidth}`,
    { 'divide-x divide-gray-200': showDividers }
  );

  const navbarClasses = classNames(
    'navbar',
    `navbar-${variant}`,
    {
      'navbar-sticky': isSticky,
      'navbar-scrolled': isScrolled,
      'navbar-open': isOpen,
    },
    className
  );

  return (
    <nav className={navbarClasses}>
      <div className={containerClasses}>
        {/* Logo Section */}
        <div className="navbar-logo">
          {logo}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar-mobile-toggle"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className="navbar-mobile-toggle-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={classNames('navbar-links', { 'is-open': isOpen })}>
          {navLinks.map((link, index) => (
            <div key={index} className="navbar-link-wrapper">
              <a
                href={link.href}
                className="navbar-link"
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
              >
                {link.icon && <span className="navbar-link-icon">{link.icon}</span>}
                {link.label}
                {link.badge && (
                  <span className={`navbar-link-badge badge-${link.badge.variant || 'primary'}`}>
                    {link.badge.text}
                  </span>
                )}
              </a>
              {link.subLinks && (
                <div className="navbar-sublinks">
                  {link.subLinks.map((subLink, subIndex) => (
                    <a
                      key={subIndex}
                      href={subLink.href}
                      className="navbar-sublink"
                      target={subLink.isExternal ? '_blank' : undefined}
                      rel={subLink.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {subLink.icon && <span className="navbar-link-icon">{subLink.icon}</span>}
                      {subLink.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions Section */}
        <div className="navbar-actions">
          {/* Search */}
          {searchConfig?.enabled && (
            <div ref={searchRef} className="navbar-search">
              <button
                className="navbar-action-button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label={searchConfig.searchButtonLabel || "Search"}
              >
                <SearchIcon />
              </button>
              {isSearchOpen && (
                <div className="navbar-search-dropdown">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={searchConfig.placeholder || "Search..."}
                      className="navbar-search-input"
                    />
                  </form>
                  {searchConfig.quickLinks && (
                    <div className="navbar-search-quick-links">
                      {searchConfig.quickLinks.map((link, index) => (
                        <a key={index} href={link.href} className="navbar-quick-link">
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Notifications */}
          {notificationConfig?.enabled && (
            <div ref={notificationsRef} className="navbar-notifications">
              <button
                className="navbar-action-button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                aria-label="Notifications"
              >
                <BellIcon />
                {notificationConfig?.count && notificationConfig.count > 0 && (
                  <span className="navbar-notification-badge">
                    {notificationConfig.count}
                  </span>
                )}
              </button>
              {isNotificationsOpen && (
                <div className="navbar-notifications-dropdown">
                  <div className="navbar-notifications-header">
                    <h3>Notifications</h3>
                    {notificationConfig.onMarkAllRead && (
                      <button onClick={notificationConfig.onMarkAllRead}>
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="navbar-notifications-list" style={{ maxHeight: notificationConfig.maxHeight }}>
                    {notificationConfig.items?.map((item) => (
                      <div
                        key={item.id}
                        className={classNames('navbar-notification-item', {
                          'is-unread': !item.isRead
                        })}
                        onClick={() => handleNotificationClick(item.id)}
                      >
                        <div className={`notification-icon ${item.type || 'info'}`} />
                        <div className="notification-content">
                          <h4>{item.title}</h4>
                          <p>{item.message}</p>
                          <span className="notification-time">{item.time}</span>
                        </div>
                        {item.action && (
                          <button
                            className="notification-action"
                            onClick={(e) => {
                              e.stopPropagation();
                              item.action?.onClick();
                            }}
                          >
                            {item.action.label}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Language Selector */}
          {showLanguageSelector && (
            <div ref={languageRef} className="navbar-language">
              <button
                className="navbar-action-button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                aria-label="Select language"
              >
                <GlobeIcon />
                <span>{currentLanguage}</span>
              </button>
              {isLanguageOpen && (
                <div className="navbar-language-dropdown">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={classNames('language-option', {
                        'is-active': currentLanguage === lang.code
                      })}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      {lang.flag && <img src={lang.flag} alt={lang.name} className="language-flag" />}
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          {showThemeToggle && (
            <button
              className="navbar-action-button"
              onClick={onThemeToggle}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          )}

          {/* Profile */}
          {userProfile && (
            <div ref={profileRef} className="navbar-profile">
              <button
                className="navbar-profile-button"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  onProfileClick?.();
                }}
                aria-label={userProfile.name}
              >
                <Avatar
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  size="sm"
                />
                <span className="navbar-profile-name">{userProfile.name}</span>
              </button>
              {isProfileOpen && (
                <div className="navbar-profile-dropdown">
                  <div className="navbar-profile-header">
                    <Avatar
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      size="md"
                    />
                    <div className="navbar-profile-info">
                      <span className="navbar-profile-name">{userProfile.name}</span>
                      <span className="navbar-profile-email">{userProfile.email}</span>
                      {userProfile.role && <span className="navbar-profile-role">{userProfile.role}</span>}
                    </div>
                  </div>
                  {userProfile.actions && (
                    <div className="navbar-profile-actions">
                      {userProfile.actions.map((action, index) => (
                        <button key={index} onClick={action.onClick} className="navbar-profile-action">
                          {action.icon && <span className="navbar-action-icon">{action.icon}</span>}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Icons components (you can replace these with your own icons)
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
); 
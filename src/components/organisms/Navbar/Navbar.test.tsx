import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Navbar } from './Navbar';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockLogo = <img src="test-logo.png" alt="Test Logo" />;
const mockNavLinks = [
  { label: 'Home', href: '/' },
  { 
    label: 'Products', 
    href: '/products',
    badge: { text: 'New', variant: 'success' as const },
    subLinks: [
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Books', href: '/products/books' }
    ]
  },
  { label: 'Contact', href: '/contact' }
];
const mockUserProfile = {
  name: 'John Doe',
  avatar: 'test-avatar.jpg',
  role: 'Admin',
  status: 'online' as const,
  email: 'john@example.com',
  actions: [
    { label: 'Profile', onClick: vi.fn() },
    { label: 'Settings', onClick: vi.fn() }
  ]
};

const mockSearchConfig = {
  enabled: true,
  placeholder: 'Search...',
  searchButtonLabel: 'Search',
  onSearch: vi.fn(),
  quickLinks: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/settings' }
  ]
};

const mockNotificationConfig = {
  enabled: true,
  count: 3,
  items: [
    {
      id: '1',
      title: 'New Message',
      message: 'You have a new message',
      time: '5m ago',
      type: 'info' as const,
      isRead: false
    }
  ],
  onNotificationClick: vi.fn(),
  onMarkAllRead: vi.fn()
};

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  const defaultProps = {
    logo: mockLogo,
    navLinks: mockNavLinks,
    userProfile: mockUserProfile
  };

  it('renders without crashing', () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByAltText('Test Logo')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Navbar {...defaultProps} />);
    mockNavLinks.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it('renders user profile information', async () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByText(mockUserProfile.name)).toBeInTheDocument();
    
    const profileButton = screen.getByRole('button', { name: /John Doe/i });
    fireEvent.click(profileButton);

    const role = await screen.findByText(mockUserProfile.role);
    expect(role).toBeInTheDocument();
    
    expect(screen.getByAltText(mockUserProfile.name)).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Navbar {...defaultProps} />);
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).toHaveClass('navbar-open');
    
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).not.toHaveClass('navbar-open');
  });

  it('calls onMobileMenuToggle when mobile menu is toggled', () => {
    const onMobileMenuToggle = vi.fn();
    render(<Navbar {...defaultProps} onMobileMenuToggle={onMobileMenuToggle} />);
    
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(menuButton);
    
    expect(onMobileMenuToggle).toHaveBeenCalledWith(true);
  });

  it('calls onProfileClick when profile is clicked', () => {
    const onProfileClick = vi.fn();
    render(<Navbar {...defaultProps} onProfileClick={onProfileClick} />);
    
    const profileButton = screen.getByRole('button', { name: new RegExp(mockUserProfile.name, 'i') });
    fireEvent.click(profileButton);
    
    expect(onProfileClick).toHaveBeenCalled();
  });

  it('applies correct classes for different variants', () => {
    const { rerender } = render(<Navbar {...defaultProps} variant="light" />);
    expect(screen.getByRole('navigation')).toHaveClass('navbar-light');

    rerender(<Navbar {...defaultProps} variant="dark" />);
    expect(screen.getByRole('navigation')).toHaveClass('navbar-dark');

    rerender(<Navbar {...defaultProps} variant="transparent" />);
    expect(screen.getByRole('navigation')).toHaveClass('navbar-transparent');
  });

  it('applies sticky class when isSticky is true', () => {
    render(<Navbar {...defaultProps} isSticky />);
    expect(screen.getByRole('navigation')).toHaveClass('navbar-sticky');
  });

  it('renders external links with correct attributes', () => {
    const externalLinks = [
      { label: 'External', href: 'https://example.com', isExternal: true }
    ];
    render(<Navbar {...defaultProps} navLinks={externalLinks} />);
    
    const link = screen.getByText('External');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles scroll events when sticky', () => {
    const { rerender } = render(<Navbar {...defaultProps} isSticky />);
    
    // Simulate scroll
    global.window.scrollY = 100;
    fireEvent.scroll(window);
    
    expect(screen.getByRole('navigation')).toHaveClass('navbar-scrolled');
    
    // Reset scroll
    global.window.scrollY = 0;
    fireEvent.scroll(window);
    
    expect(screen.getByRole('navigation')).not.toHaveClass('navbar-scrolled');
  });

  // New tests for search functionality
  describe('Search functionality', () => {
    it('opens search dropdown when search button is clicked', () => {
      render(<Navbar {...defaultProps} searchConfig={mockSearchConfig} />);
      const searchButton = screen.getByLabelText('Search');
      fireEvent.click(searchButton);
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('handles search submission', () => {
      render(<Navbar {...defaultProps} searchConfig={mockSearchConfig} />);
      const searchButton = screen.getByLabelText('Search');
      fireEvent.click(searchButton);
      
      const input = screen.getByPlaceholderText('Search...');
      fireEvent.change(input, { target: { value: 'test query' } });
      
      const form = input.closest('form');
      fireEvent.submit(form!);
      
      expect(mockSearchConfig.onSearch).toHaveBeenCalledWith('test query');
    });

    it('renders quick links in search dropdown', () => {
      render(<Navbar {...defaultProps} searchConfig={mockSearchConfig} />);
      const searchButton = screen.getByLabelText('Search');
      fireEvent.click(searchButton);
      
      mockSearchConfig.quickLinks.forEach(link => {
        expect(screen.getByText(link.label)).toBeInTheDocument();
      });
    });
  });

  // New tests for notification system
  describe('Notification system', () => {
    it('displays notification count badge', () => {
      render(<Navbar {...defaultProps} notificationConfig={mockNotificationConfig} />);
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('opens notification dropdown and displays notifications', () => {
      render(<Navbar {...defaultProps} notificationConfig={mockNotificationConfig} />);
      const notificationButton = screen.getByLabelText('Notifications');
      fireEvent.click(notificationButton);
      
      expect(screen.getByText('New Message')).toBeInTheDocument();
      expect(screen.getByText('You have a new message')).toBeInTheDocument();
    });

    it('handles mark all as read', () => {
      render(<Navbar {...defaultProps} notificationConfig={mockNotificationConfig} />);
      const notificationButton = screen.getByLabelText('Notifications');
      fireEvent.click(notificationButton);
      
      const markAllReadButton = screen.getByText('Mark all as read');
      fireEvent.click(markAllReadButton);
      
      expect(mockNotificationConfig.onMarkAllRead).toHaveBeenCalled();
    });
  });

  // New tests for language selector
  describe('Language selector', () => {
    const languages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Spanish' }
    ];

    it('renders language selector when enabled', () => {
      render(
        <Navbar
          {...defaultProps}
          showLanguageSelector
          languages={languages}
          currentLanguage="en"
        />
      );
      expect(screen.getByText('en')).toBeInTheDocument();
    });

    it('handles language selection', () => {
      const onLanguageChange = vi.fn();
      render(
        <Navbar
          {...defaultProps}
          showLanguageSelector
          languages={languages}
          currentLanguage="en"
          onLanguageChange={onLanguageChange}
        />
      );
      
      const languageButton = screen.getByText('en');
      fireEvent.click(languageButton);
      
      const spanishOption = screen.getByText('Spanish');
      fireEvent.click(spanishOption);
      
      expect(onLanguageChange).toHaveBeenCalledWith('es');
    });
  });

  // New tests for theme toggle
  describe('Theme toggle', () => {
    it('renders theme toggle button when enabled', () => {
      render(<Navbar {...defaultProps} showThemeToggle theme="light" />);
      expect(screen.getByLabelText('Switch to dark theme')).toBeInTheDocument();
    });

    it('calls onThemeToggle when clicked', () => {
      const onThemeToggle = vi.fn();
      render(
        <Navbar
          {...defaultProps}
          showThemeToggle
          theme="light"
          onThemeToggle={onThemeToggle}
        />
      );
      
      const themeButton = screen.getByLabelText('Switch to dark theme');
      fireEvent.click(themeButton);
      
      expect(onThemeToggle).toHaveBeenCalled();
    });
  });

  // New tests for profile dropdown
  describe('Profile dropdown', () => {
    it('opens profile dropdown when clicked', async () => {
      render(<Navbar {...defaultProps} />);
      const profileButton = screen.getByRole('button', { name: /John Doe/i });
      fireEvent.click(profileButton);
      
      const email = await screen.findByText(mockUserProfile.email);
      expect(email).toBeInTheDocument();
    });

    it('handles profile action clicks', async () => {
      render(<Navbar {...defaultProps} />);
      const profileButton = screen.getByRole('button', { name: /John Doe/i });
      fireEvent.click(profileButton);
      
      const profileAction = await screen.findByText('Profile');
      fireEvent.click(profileAction);
      
      expect(mockUserProfile.actions[0].onClick).toHaveBeenCalled();
    });
  });

  // New tests for sublinks
  describe('Navigation sublinks', () => {
    it('renders sublinks for navigation items', () => {
      render(<Navbar {...defaultProps} />);
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Books')).toBeInTheDocument();
    });

    it('applies correct attributes to sublinks', () => {
      const externalSublink = {
        label: 'Products',
        href: '/products',
        subLinks: [
          { label: 'External', href: 'https://example.com', isExternal: true }
        ]
      };
      
      render(<Navbar {...defaultProps} navLinks={[externalSublink]} />);
      const sublinkElement = screen.getByText('External');
      
      expect(sublinkElement).toHaveAttribute('target', '_blank');
      expect(sublinkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  // New tests for click outside behavior
  describe('Click outside behavior', () => {
    it('closes search dropdown when clicking outside', () => {
      render(<Navbar {...defaultProps} searchConfig={mockSearchConfig} />);
      const searchButton = screen.getByLabelText('Search');
      fireEvent.click(searchButton);
      
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      
      fireEvent.mouseDown(document.body);
      
      expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
    });

    it('closes notification dropdown when clicking outside', () => {
      render(<Navbar {...defaultProps} notificationConfig={mockNotificationConfig} />);
      const notificationButton = screen.getByLabelText('Notifications');
      fireEvent.click(notificationButton);
      
      expect(screen.getByText('New Message')).toBeInTheDocument();
      
      fireEvent.mouseDown(document.body);
      
      expect(screen.queryByText('New Message')).not.toBeInTheDocument();
    });

    it('closes profile dropdown when clicking outside', async () => {
      render(<Navbar {...defaultProps} />);
      const profileButton = screen.getByRole('button', { name: /John Doe/i });
      fireEvent.click(profileButton);
      
      const email = await screen.findByText(mockUserProfile.email);
      expect(email).toBeInTheDocument();
      
      fireEvent.mouseDown(document.body);
      
      expect(screen.queryByText(mockUserProfile.email)).not.toBeInTheDocument();
    });
  });
}); 
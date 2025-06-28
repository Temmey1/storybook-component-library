import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
    docs: {
      description: {
        component: `
### Navbar Component

A comprehensive navigation bar component with extensive features and customization options.

#### Features
- 🎨 Multiple visual variants (light, dark, transparent)
- 📱 Fully responsive with mobile menu
- 🔝 Optional sticky positioning
- 👤 Rich user profile integration
- 🔍 Search functionality with quick links
- 🔔 Notification system
- 🌐 Language selector
- 🌓 Theme toggle
- 🔗 Support for external links and sub-navigation
- 📛 Badge support for navigation items
- ♿ Full accessibility support

#### Usage

\`\`\`jsx
import { Navbar } from '@your-library/components';

function App() {
  return (
    <Navbar
      logo={<img src="/logo.svg" alt="Logo" />}
      navLinks={[
        { label: 'Home', href: '/' },
        { 
          label: 'Products', 
          href: '/products',
          badge: { text: 'New', variant: 'success' }
        },
      ]}
      userProfile={{
        name: 'John Doe',
        avatar: '/avatar.jpg',
        role: 'Admin',
        status: 'online'
      }}
      searchConfig={{
        enabled: true,
        placeholder: 'Search...'
      }}
      notificationConfig={{
        enabled: true,
        count: 3
      }}
      showThemeToggle
      isSticky
    />
  );
}
\`\`\`

#### Accessibility
- ARIA attributes for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly notifications
- Focus management
`
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-[200px] relative">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark', 'transparent'],
      description: 'The visual variant of the navbar'
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'],
      description: 'Maximum width of the navbar container'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const defaultNavLinks = [
  { label: 'Home', href: '#' },
  { 
    label: 'Products', 
    href: '#',
    badge: { text: 'New', variant: 'success' as const },
    subLinks: [
      { label: 'Electronics', href: '#' },
      { label: 'Clothing', href: '#' },
      { label: 'Books', href: '#' }
    ]
  },
  { 
    label: 'Services', 
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  { label: 'About', href: '#' },
  { 
    label: 'Documentation', 
    href: 'https://docs.example.com', 
    isExternal: true,
    badge: { text: 'Beta', variant: 'warning' as const }
  }
];

const defaultUserProfile = {
  name: 'John Doe',
  avatar: 'https://placehold.co/300x300/4F46E5/FFFFFF/png?text=JD',
  role: 'Administrator',
  status: 'online' as const,
  email: 'john.doe@example.com',
  actions: [
    { 
      label: 'View Profile',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>,
      onClick: () => console.log('View Profile clicked')
    },
    {
      label: 'Settings',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>,
      onClick: () => console.log('Settings clicked')
    },
    {
      label: 'Sign Out',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>,
      onClick: () => console.log('Sign Out clicked')
    }
  ]
};

const defaultNotifications = {
  enabled: true,
  count: 3,
  items: [
    {
      id: '1',
      title: 'New Order',
      message: 'You have received a new order #12345',
      time: '5 minutes ago',
      type: 'success' as const,
      isRead: false,
      action: {
        label: 'View Order',
        onClick: () => console.log('View Order clicked')
      }
    },
    {
      id: '2',
      title: 'System Update',
      message: 'System maintenance scheduled for tonight',
      time: '1 hour ago',
      type: 'warning' as const,
      isRead: true
    },
    {
      id: '3',
      title: 'New Message',
      message: 'You have a new message from Support',
      time: '2 hours ago',
      type: 'info' as const,
      isRead: false
    }
  ],
  maxHeight: '300px',
  onNotificationClick: (id) => console.log('Notification clicked:', id),
  onMarkAllRead: () => console.log('Mark all as read clicked')
};

// Default Navbar
export const Default: Story = {
  args: {
    logo: <img src="https://placehold.co/120x40/4F46E5/FFFFFF/png?text=Logo" alt="Logo" />,
    navLinks: defaultNavLinks,
    userProfile: defaultUserProfile,
    searchConfig: {
      enabled: true,
      placeholder: 'Search anything...',
      searchButtonLabel: 'Search',
      quickLinks: [
        { label: 'Dashboard', href: '#' },
        { label: 'Settings', href: '#' },
        { label: 'Help Center', href: '#' }
      ],
      onSearch: (query) => console.log('Search:', query)
    },
    notificationConfig: defaultNotifications,
    showLanguageSelector: true,
    languages: [
      { code: 'en', name: 'English', flag: 'https://placehold.co/20x20/4F46E5/FFFFFF/png?text=EN' },
      { code: 'es', name: 'Español', flag: 'https://placehold.co/20x20/4F46E5/FFFFFF/png?text=ES' },
      { code: 'fr', name: 'Français', flag: 'https://placehold.co/20x20/4F46E5/FFFFFF/png?text=FR' }
    ],
    currentLanguage: 'en',
    showThemeToggle: true,
    theme: 'light',
    isSticky: true,
    maxWidth: '7xl'
  }
};

// Dark Variant
export const DarkVariant: Story = {
  args: {
    ...Default.args,
    variant: 'dark',
    theme: 'dark'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

// Minimal
export const Minimal: Story = {
  args: {
    logo: <img src="https://placehold.co/120x40/4F46E5/FFFFFF/png?text=Logo" alt="Logo" />,
    navLinks: defaultNavLinks.slice(0, 3),
    userProfile: {
      name: 'John Doe',
      avatar: 'https://placehold.co/300x300/4F46E5/FFFFFF/png?text=JD',
      role: 'User'
    }
  }
};

// With Dividers
export const WithDividers: Story = {
  args: {
    ...Default.args,
    showDividers: true
  }
};

// Transparent
export const Transparent: Story = {
  args: {
    ...Default.args,
    variant: 'transparent',
    isSticky: true
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(45deg, #4F46E5 0%, #7C3AED 100%)'
        }
      ]
    }
  }
}; 
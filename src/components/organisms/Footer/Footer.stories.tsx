import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

/**
 * # Footer Component
 * 
 * A comprehensive footer component with extensive features and customization options.
 * 
 * ## Features
 * 
 * - 🎨 Multiple visual variants (light, dark)
 * - 📱 Fully responsive design
 * - 📌 Optional sticky positioning
 * - 🔗 Support for navigation links
 * - 💬 Social media integration
 * - 📧 Newsletter subscription functionality
 * - 🎯 Custom content areas (left/right sections)
 * - 💫 Flexible sizing options (sm, md)
 * - 🖼️ Logo integration
 * - ♿ Full accessibility support
 */

// Sample logo component
const SampleLogo = () => (
  <div className="flex items-center">
    <svg className="h-8 w-auto" viewBox="0 0 100 40" fill="currentColor">
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <text x="50" y="25" fontSize="16" fill={`var(--logo-text-color, #1a1a1a)`} className="font-semibold">
        LOGO
      </text>
    </svg>
  </div>
);

const meta: Meta<typeof Footer> = {
  title: 'Components/Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    copyrightText: '© 2024 Company Name. All rights reserved.',
    variant: 'light',
  },
};

export const WithNavigation: Story = {
  args: {
    ...Default.args,
    navigationLinks: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
};

export const WithSocialLinks: Story = {
  args: {
    ...Default.args,
    socialLinks: [
      { platform: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
      { platform: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
      { platform: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
      { platform: 'github', href: 'https://github.com', label: 'GitHub' },
    ],
  },
};

export const WithNewsletter: Story = {
  args: {
    ...Default.args,
    showNewsletter: true,
    onNewsletterSubmit: (email: string) => console.log('Newsletter subscription:', email),
  },
};

export const DarkVariant: Story = {
  args: {
    ...WithSocialLinks.args,
    variant: 'dark',
    navigationLinks: WithNavigation.args!.navigationLinks,
    logo: <SampleLogo />,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const FullFeatured: Story = {
  args: {
    variant: 'light',
    size: 'md',
    logo: <SampleLogo />,
    navigationLinks: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
    socialLinks: [
      { platform: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
      { platform: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
      { platform: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
      { platform: 'github', href: 'https://github.com', label: 'GitHub' },
    ],
    showNewsletter: true,
    copyrightText: '© 2024 Company Name. All rights reserved.',
    onNewsletterSubmit: (email: string) => console.log('Newsletter subscription:', email),
    left: <div className="text-sm text-gray-600">Your trusted partner</div>,
    right: (
      <div className="flex gap-4">
        <a href="/support" className="text-sm text-gray-600 hover:text-gray-900">
          Support
        </a>
        <a href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
          Contact
        </a>
      </div>
    ),
  },
};

export const Sticky: Story = {
  args: {
    ...Default.args,
    sticky: true,
    variant: 'light',
    size: 'sm',
    logo: <SampleLogo />,
  },
}; 
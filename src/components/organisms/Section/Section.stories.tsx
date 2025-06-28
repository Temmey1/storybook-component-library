import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './Section';
import { Button } from '../../atoms/Button/button';

const meta: Meta<typeof Section> = {
  title: 'Components/Organisms/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive section component with extensive features and customization options.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Section>;

/**
 * # Section
 * 
 * A comprehensive section component for organizing and displaying content with extensive customization options.
 * Perfect for creating structured layouts with headers, content areas, and footers.
 * 
 * ## Features
 * 
 * 🎨 Multiple visual variants (light, dark)
 * - Default, bordered, and shadowed styles
 * - Customizable background colors
 * 
 * 📱 Responsive design
 * - Adapts to different screen sizes
 * - Multiple size options (sm, md, lg)
 * 
 * 📑 Rich header options
 * - Title and subtitle support
 * - Custom header content
 * - Optional header divider
 * - Action buttons
 * 
 * 🔄 Interactive features
 * - Collapsible content
 * - Loading state with spinner
 * - Disabled state
 * 
 * 👣 Footer support
 * - Custom footer content
 * - Optional footer divider
 * 
 * ⌨️ Accessibility
 * - Full keyboard navigation
 * - ARIA attributes
 * - Screen reader support
 * 
 * 🌓 Theming
 * - Dark mode support
 * - Custom CSS class support
 * 
 * ## Usage
 * 
 * ```jsx
 * import { Section } from '@your-library/components';
 * 
 * function App() {
 *   return (
 *     <Section
 *       title="Dashboard Overview"
 *       subtitle="Key metrics and statistics"
 *       actions={<Button>Export</Button>}
 *       variant="bordered"
 *       showHeaderDivider
 *     >
 *       <div>Your content here</div>
 *     </Section>
 *   );
 * }
 * ```
 */

export const Default: Story = {
  args: {
    title: 'Section Title',
    subtitle: 'Section subtitle text',
    variant: 'default',
    children: (
      <div className="p-6 bg-white rounded-lg border border-gray-100">
        <p className="text-gray-600">Default section with basic content.</p>
      </div>
    )
  }
};

export const WithActions: Story = {
  args: {
    title: 'Dashboard Overview',
    subtitle: 'Key metrics and statistics',
    variant: 'bordered',
    showHeaderDivider: true,
    actions: <Button variant="primary">Export</Button>,
    children: (
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Revenue</h3>
          <p className="text-2xl font-bold">$24,500</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Users</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Growth</h3>
          <p className="text-2xl font-bold">+15%</p>
        </div>
      </div>
    )
  }
};

export const Collapsible: Story = {
  args: {
    title: 'Collapsible Section',
    subtitle: 'Click the header or chevron to collapse',
    variant: 'bordered',
    collapsible: true,
    defaultCollapsed: false,
    children: (
      <div className="p-6 bg-white rounded-lg border border-gray-100">
        <p className="text-gray-600">This section can be collapsed by clicking the header or chevron icon.</p>
      </div>
    )
  }
};

export const WithFooter: Story = {
  args: {
    title: 'Section with Footer',
    variant: 'shadowed',
    children: (
      <div className="p-6 bg-white rounded-lg">
        <p className="text-gray-600">Main content area with a footer below.</p>
      </div>
    ),
    footer: (
      <div className="text-sm text-gray-500 flex items-center justify-between">
        <span>Last updated: 2 hours ago</span>
        <Button variant="text">View History</Button>
      </div>
    ),
    showFooterDivider: true
  }
};

export const Loading: Story = {
  args: {
    title: 'Loading Section',
    variant: 'bordered',
    loading: true,
    children: <div>This content will not be visible while loading</div>
  }
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Section',
    subtitle: 'This section is currently disabled',
    variant: 'bordered',
    disabled: true,
    children: (
      <div className="p-6 bg-white rounded-lg border border-gray-100">
        <p className="text-gray-600">This section is currently disabled and cannot be interacted with.</p>
      </div>
    )
  }
};

export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Section',
    variant: 'bordered',
    background: 'gray',
    size: 'lg',
    showHeaderDivider: true,
    className: 'custom-section',
    children: (
      <div className="p-6 bg-white rounded-lg border border-gray-100">
        <p className="text-gray-600">A section with custom styling applied.</p>
      </div>
    )
  }
}; 
import React, { useState, useRef } from "react";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import type { ModalProps } from "./modal.types";

const meta: Meta<typeof Modal> = {
  title: "Components/Molecules/Modal",
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Modal Component

A versatile and accessible modal dialog component that supports multiple variants, sizes, and interaction patterns.

#### Features
- 🎨 Multiple visual variants (default, profile, post, confirmation, media)
- 📏 Flexible sizing options (small, medium, large, full)
- ♿ Full accessibility support (ARIA attributes, keyboard navigation, focus management)
- 🔄 Dynamic content loading
- 🎯 Customizable close behaviors (overlay click, escape key, close button)
- 🦶 Optional footer with static or dynamic content
- 🎨 Customizable styling through className prop
- 🔒 Error boundary support
- 📱 Responsive design

#### Usage

\`\`\`jsx
import { Modal } from '@your-library/components';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="My Modal"
      size="medium"
      variant="default"
    >
      <div>Modal content goes here</div>
    </Modal>
  );
}
\`\`\`

#### Accessibility
- Manages focus trap within modal
- Provides proper ARIA attributes
- Supports keyboard navigation
- Handles screen reader announcements
- Maintains proper focus restoration

#### Best Practices
- Use clear and concise titles
- Provide meaningful close actions
- Handle loading and error states appropriately
- Consider mobile viewports in content design
- Implement proper focus management
- Use appropriate variant for the use case

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | - | Controls modal visibility |
| onClose | () => void | - | Callback when modal should close |
| title | string | - | Modal title (not shown in media variant) |
| children | ReactNode | - | Modal content |
| size | 'small' \| 'medium' \| 'large' \| 'full' | 'medium' | Controls modal width |
| variant | 'default' \| 'profile' \| 'post' \| 'confirmation' \| 'media' | 'default' | Visual style variant |
| showCloseButton | boolean | true | Show/hide close button |
| closeOnOverlayClick | boolean | true | Enable/disable closing on overlay click |
| closeOnEsc | boolean | true | Enable/disable closing on Escape key |
| footer | ReactNode \| (({ onClose }) => ReactNode) | - | Footer content |
| className | string | - | Additional CSS classes |
| id | string | - | Custom ID for ARIA attributes |
`
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
      description: 'Controls the width of the modal',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium | large | full' }
      }
    },
    variant: {
      control: 'select',
      options: ['default', 'profile', 'post', 'confirmation', 'media'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | profile | post | confirmation | media' }
      }
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
      table: {
        type: { summary: 'boolean' }
      }
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show/hide close button',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Enable/disable closing on overlay click',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Enable/disable closing on Escape key',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    title: {
      control: 'text',
      description: 'Modal title (not displayed in media variant)',
      table: {
        type: { summary: 'string' }
      }
    },
    children: {
      control: 'text',
      description: 'Modal content',
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    footer: {
      control: 'object',
      description: 'Footer content (static ReactNode or function receiving onClose)',
      table: {
        type: { summary: 'ReactNode | (({ onClose }) => ReactNode)' }
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the modal container',
      table: {
        type: { summary: 'string' }
      }
    },
    id: {
      control: 'text',
      description: 'Custom ID for the modal (used for ARIA attributes)',
      table: {
        type: { summary: 'string' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Template with state management
const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
      >
        Open Modal
      </button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

// Basic examples
export const Default: Story = {
  render: Template,
  args: {
    title: "Default Modal",
    children: <p>This is a basic modal with default styling.</p>
  },
  parameters: {
    docs: {
      description: {
        story: `
### Default Modal

The basic modal implementation with default styling. This is the most common use case for simple dialogs and information displays.

\`\`\`jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Default Modal"
>
  <p>Modal content here</p>
</Modal>
\`\`\`
        `
      }
    }
  }
};

export const WithFooter: Story = {
  render: Template,
  args: {
    title: "Modal with Footer",
    children: <p>This modal includes footer actions.</p>,
    footer: (
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
        <button className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">Confirm</button>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
### Modal with Footer

Demonstrates a modal with action buttons in the footer. Commonly used for:
- Confirmation dialogs
- Forms with submit/cancel actions
- Multi-step workflows
- Action confirmations

The footer can be either a static ReactNode or a function that receives the \`onClose\` handler:

\`\`\`jsx
<Modal
  footer={({ onClose }) => (
    <div className="flex gap-2">
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleSubmit}>Confirm</button>
    </div>
  )}
>
  {/* content */}
</Modal>
\`\`\`
        `
      }
    }
  }
};

// Size variations
export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'small' | 'medium' | 'large' | 'full'>('medium');
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {(['small', 'medium', 'large', 'full'] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setSize(s); setIsOpen(true); }}
              className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              {s.charAt(0).toUpperCase() + s.slice(1)} Modal
            </button>
          ))}
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size={size}
          title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
        >
          <div className="space-y-4">
            <p>This modal demonstrates the {size} size variant.</p>
            <p>The content area adjusts based on the selected size.</p>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Size Variants

The Modal component supports four size variants:

| Size | Use Case | Recommended Content |
|------|----------|-------------------|
| small | Quick actions, simple messages | Short text, simple forms |
| medium | Standard dialogs (default) | Forms, content previews |
| large | Complex interactions | Rich content, multi-step forms |
| full | Immersive experiences | Full-screen applications |

Choose the appropriate size based on:
- Content complexity
- User interaction needs
- Screen real estate requirements
- Mobile responsiveness
        `
      }
    }
  }
};

// Variant examples
export const ProfileVariant = Template.bind({});
ProfileVariant.args = {
    variant: 'profile',
  title: 'User Profile',
    children: (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src="https://picsum.photos/200"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/200?text=Profile";
          }}
        />
        <div>
        <h3 className="text-xl font-semibold">John Doe</h3>
        <p className="text-gray-600">Software Engineer</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700">About</h4>
          <p className="text-gray-600">Passionate about creating beautiful and functional user interfaces.</p>
        </div>
            <div>
          <h4 className="font-medium text-gray-700">Contact</h4>
          <p className="text-gray-600">john.doe@example.com</p>
        </div>
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-xl font-bold">152</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">1.2k</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
          <div className="text-center">
            <div className="text-xl font-bold">890</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>
        </div>
      </div>
    )
};

export const PostVariant = Template.bind({});
PostVariant.args = {
  variant: 'post',
  title: 'Post Details',
  children: (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <img
          src="https://picsum.photos/50"
          alt="Author"
          className="w-10 h-10 rounded-full"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/50?text=A";
          }}
        />
        <div>
          <div className="font-medium">Jane Smith</div>
          <div className="text-sm text-gray-500">2 hours ago</div>
        </div>
      </div>
      <div className="relative">
      <img 
          src="https://picsum.photos/800/600"
        alt="Post" 
          className="w-full rounded-lg"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/800x600?text=Post+Image";
          }}
        />
      </div>
      <div className="space-y-4">
        <p className="text-gray-800">Amazing view from my morning hike! 🏔️</p>
        <div className="flex items-center space-x-6 text-gray-500">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 fill-current text-red-500" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>1.2k</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
            <span>234</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
            </svg>
            <span>56</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export const ConfirmationVariant = Template.bind({});
ConfirmationVariant.args = {
  variant: 'confirmation',
  title: "Delete Item",
  children: (
    <div className="text-center">
      <div className="mx-auto w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
        ⚠️
      </div>
      <p className="text-gray-600">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
    </div>
  ),
  footer: ({ onClose }) => (
    <div className="flex gap-2 justify-center w-full">
        <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
        onClick={onClose}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
        Delete
        </button>
      </div>
  )
};

export const MediaVariant = Template.bind({});
MediaVariant.args = {
  variant: 'media',
  children: (
    <div className="relative w-full h-full min-h-[400px]">
    <img 
        src="https://picsum.photos/1200/800"
      alt="Large media"
      className="w-full h-full object-contain"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/1200x800?text=Image+Not+Found";
          e.currentTarget.alt = "Failed to load image";
        }}
    />
    </div>
  )
};

// Edge cases and interactions
export const LongContent = Template.bind({});
LongContent.args = {
  title: "Scrollable Content",
  children: (
    <div className="space-y-4">
      {Array(20).fill(null).map((_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      ))}
    </div>
  )
};

export const CustomInteractions = Template.bind({});
CustomInteractions.args = {
  title: "Custom Interactions",
  closeOnOverlayClick: false,
  closeOnEsc: false,
    children: (
      <div className="space-y-4">
      <p>This modal can only be closed using the close button.</p>
      <p>Clicking the overlay or pressing Escape will not close it.</p>
    </div>
  )
};

export const NestedModals: StoryFn<typeof Modal> = () => {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsFirstOpen(true)}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
      >
        Open First Modal
      </button>
      
      <Modal
        isOpen={isFirstOpen}
        onClose={() => setIsFirstOpen(false)}
        title="First Modal"
      >
        <div className="space-y-4">
          <p>This is the first modal.</p>
          <button 
            onClick={() => setIsSecondOpen(true)}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Open Second Modal
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isSecondOpen}
        onClose={() => setIsSecondOpen(false)}
        title="Second Modal"
      >
        <p>This is the second modal, stacked on top of the first.</p>
      </Modal>
    </>
  );
};

// Accessibility examples
export const AccessibilityFeatures: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-4">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        aria-haspopup="dialog"
      >
        Open Accessible Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          buttonRef.current?.focus(); // Return focus to trigger
        }}
        title="Accessibility Demo"
      >
        <div role="tablist" className="flex border-b mb-4">
          {["Tab 1", "Tab 2"].map((tab, index) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`panel-${index}`}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 ${
                activeTab === index
                  ? "border-b-2 border-blue-700 text-blue-800"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {[0, 1].map((index) => (
          <div
            key={index}
            role="tabpanel"
            id={`panel-${index}`}
            aria-labelledby={`tab-${index}`}
            hidden={activeTab !== index}
          >
            <p>Content for tab {index + 1}</p>
            <button className="mt-2 px-3 py-1 bg-gray-200 rounded">
              Action {index + 1}
            </button>
          </div>
        ))}
      </Modal>
    </div>
  );
};

// Dynamic content example
export const DynamicContent: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreContent = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setContent(prev => [...prev, `New item ${prev.length + 1}`]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
      >
        Open Dynamic Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Dynamic Content"
      >
        <div className="space-y-4">
          {content.map((item, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded">
              {item}
            </div>
          ))}
          <button
            onClick={loadMoreContent}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 disabled:bg-blue-400"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      </Modal>
    </>
  );
};

// Error handling example
export const ErrorHandling: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const simulateError = () => {
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
      >
        Open Error Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Error Handling"
        variant="confirmation"
      >
        <div className="text-center">
          {hasError ? (
            <>
              <div className="mx-auto w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                ❌
              </div>
              <p className="text-red-600 font-semibold">Something went wrong!</p>
              <p className="text-gray-600 mt-2">
                There was an error processing your request.
          </p>
              <button
                onClick={handleRetry}
                className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Retry
              </button>
            </>
          ) : (
            <>
              <p>Click the button to simulate an error</p>
              <button
                onClick={simulateError}
                className="mt-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
              >
                Trigger Error
              </button>
            </>
          )}
      </div>
      </Modal>
    </>
  );
};

// Form handling example
export const FormHandling: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) 
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful submission
      setIsOpen(false);
      setFormData({ name: "", email: "" });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
      >
        Open Form Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Form Example"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              form="modal-form"
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              Submit
            </button>
          </div>
        }
      >
        <form id="modal-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700 ${
                errors.name ? "border-red-700" : ""
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-700">{errors.name}</p>
            )}
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700 ${
                errors.email ? "border-red-700" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-700">{errors.email}</p>
            )}
        </div>
      </form>
      </Modal>
    </>
  );
};

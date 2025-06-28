import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./index";

const meta: Meta<typeof Input> = {
  title: "Components/Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Input Component

A flexible and accessible input component that supports various types, states, and enhancements.

#### Features
- 🎨 Multiple input types (text, password, email, etc.)
- 🏷️ Integrated label support
- ❓ Helper text for additional context
- ⚠️ Error state handling
- 🖼️ Icon support (left/right positioning)
- 🔒 Password visibility toggle
- 🔄 Loading state support
- ♿ Full accessibility support
- 🎯 Customizable styling through className

#### Usage

\`\`\`jsx
import { Input } from '@your-library/components';

function MyComponent() {
  return (
    <Input
      label="Email Address"
      type="email"
      placeholder="Enter your email"
      helperText="We'll never share your email"
      onChange={handleChange}
    />
  );
}
\`\`\`

#### Accessibility
- Proper label association via htmlFor/id
- Error messages announced via aria-describedby
- Helper text linked via aria-describedby
- Loading state announcements
- Password toggle button with proper ARIA
- Icon decoration handling
- Keyboard navigation support

#### Best Practices
- Always use labels for inputs
- Provide clear error messages
- Use helper text for additional context
- Choose appropriate input type
- Consider mobile input methods
- Use clear placeholder text
- Handle all input states

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | InputType | 'text' | Type of input field |
| label | string | - | Input label |
| helperText | string | - | Helper text below input |
| error | string | - | Error message |
| icon | ReactNode | - | Decorative icon |
| showPasswordToggle | boolean | true | Show password visibility toggle |
| iconPosition | 'left' \| 'right' | 'left' | Icon position |
| isLoading | boolean | false | Shows loading state |
| className | string | - | Additional CSS classes |
| ...HTMLInputAttributes | - | - | Native input props |
`
      }
    }
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search"],
      description: "Type of input field",
      table: {
        defaultValue: { summary: 'text' },
        type: { summary: 'InputType' }
      }
    },
    label: {
      control: "text",
      description: "Label for the input field",
      table: {
        type: { summary: 'string' }
      }
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the input",
      table: {
        type: { summary: 'string' }
      }
    },
    error: {
      control: "text",
      description: "Error message to display",
      table: {
        type: { summary: 'string' }
      }
    },
    iconPosition: {
      control: "radio",
      options: ["left", "right"],
      description: "Position of the icon",
      table: {
        defaultValue: { summary: 'left' },
        type: { summary: 'left | right' }
      }
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    isLoading: {
      control: "boolean",
      description: "Shows loading state",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    showPasswordToggle: {
      control: "boolean",
      description: "Show password visibility toggle (password type only)",
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' }
      }
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
      table: {
        type: { summary: 'string' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic Input
export const Basic: Story = {
  args: {
    placeholder: "Enter text",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Basic Input

The most simple implementation of the input component.

\`\`\`jsx
<Input placeholder="Enter text" />
\`\`\`

Best practices:
- Use clear placeholder text
- Consider adding a label for better accessibility
- Use for simple, single-line text input
        `
      }
    }
  }
};

// With Label
export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Input with Label

Input with an associated label for better accessibility and user experience.

\`\`\`jsx
<Input
  label="Username"
  placeholder="Enter username"
/>
\`\`\`

Features:
- Proper label-input association
- Click label to focus input
- Screen reader support
- Clear visual hierarchy
        `
      }
    }
  }
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: "Email",
    helperText: "We'll never share your email with anyone else",
    placeholder: "Enter email",
    type: "email",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Input with Helper Text

Input with additional context provided via helper text.

\`\`\`jsx
<Input
  label="Email"
  helperText="We'll never share your email"
  type="email"
/>
\`\`\`

Best used for:
- Providing extra context
- Input requirements
- Privacy information
- Usage guidelines
        `
      }
    }
  }
};

// With Error
export const WithError: Story = {
  args: {
    label: "Password",
    error: "Password must be at least 8 characters",
    placeholder: "Enter password",
    type: "password",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Input with Error

Input displaying an error state with message.

\`\`\`jsx
<Input
  label="Password"
  error="Password must be at least 8 characters"
  type="password"
/>
\`\`\`

Features:
- Visual error state
- Error message announcement
- Proper ARIA attributes
- Focus management
        `
      }
    }
  }
};

// With Left Icon
export const WithLeftIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    ),
    iconPosition: "left",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Input with Icon

Input with decorative icon enhancement.

\`\`\`jsx
<Input
  label="Search"
  icon={<SearchIcon />}
  iconPosition="left"
/>
\`\`\`

Best practices:
- Use clear, meaningful icons
- Consider icon color contrast
- Maintain proper spacing
- Mark icons as decorative
        `
      }
    }
  }
};

// Password Input
export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    showPasswordToggle: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Password Input

Secure input with visibility toggle.

\`\`\`jsx
<Input
  type="password"
  showPasswordToggle={true}
/>
\`\`\`

Features:
- Password visibility toggle
- Secure input masking
- Accessible toggle button
- Proper ARIA labels
        `
      }
    }
  }
};

// Disabled Input
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Disabled Input

Input in disabled state.

Features:
- Visual disabled state
- Prevents interaction
- Proper cursor style
- ARIA disabled state
        `
      }
    }
  }
};

// Loading Input
export const Loading: Story = {
  args: {
    label: "Loading Input",
    placeholder: "Loading...",
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Loading Input

Input showing a loading state.

Features:
- Visual loading indicator
- Disabled during loading
- Loading announcement
- Prevents interaction
        `
      }
    }
  }
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Dropdown Component

A highly customizable and accessible dropdown select component.

#### Features
- 🎯 Multiple size variants (sm, md, lg)
- 🔍 Search functionality
- 🖼️ Icon support
- 📝 Description support
- ♿ Full accessibility support
- ⌨️ Keyboard navigation
- 🎨 Custom styling options
- ⚠️ Error states
- 💡 Helper text
- 📱 Responsive design
- ⬆️ Position control (dropUp)
- 🔄 Loading states

#### Usage

\`\`\`jsx
import { Dropdown } from '@your-library/components';

function MyComponent() {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2', icon: <Icon /> },
    { value: '3', label: 'Option 3', description: 'With description' }
  ];

  return (
    <Dropdown
      options={options}
      label="Select an option"
      required
      onChange={(value) => console.log(value)}
    />
  );
}
\`\`\`

#### Accessibility
- Full keyboard navigation (↑↓ to navigate, Enter to select, Esc to close)
- ARIA labels and roles
- Focus management
- Screen reader support
- Required field indication
- Error announcements
- Search input labeling

#### Best Practices
- Use clear, concise labels
- Provide meaningful placeholder text
- Include helper text for context
- Use icons sparingly
- Keep descriptions brief
- Consider mobile interaction
- Handle empty states
- Provide feedback on errors

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | DropdownOption[] | - | Array of options |
| value | string | - | Selected value |
| onChange | (value: string) => void | - | Selection handler |
| placeholder | string | - | Placeholder text |
| label | string | - | Label text |
| required | boolean | false | Required field |
| error | string | - | Error message |
| helperText | string | - | Helper text |
| disabled | boolean | false | Disable dropdown |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size variant |
| searchable | boolean | false | Enable search |
| maxHeight | number | - | Max menu height |
| width | string \| number | - | Custom width |
| dropUp | boolean | false | Open upwards |
| className | string | - | Custom classes |

##### DropdownOption
| Prop | Type | Description |
|------|------|-------------|
| value | string | Unique identifier |
| label | string | Display text |
| description | string | Additional info |
| icon | ReactNode | Leading icon |
| disabled | boolean | Disable option |
| className | string | Custom classes |
`
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the dropdown',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    dropUp: {
      control: 'boolean',
      description: 'Position the dropdown above the button',
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of the dropdown menu in pixels',
    },
    width: {
      control: 'text',
      description: 'Custom width of the dropdown',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const defaultOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

export const Basic: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
    onChange: (value) => console.log('Selected:', value),
  },
  parameters: {
    docs: {
      description: {
        story: `
### Basic Dropdown

The simplest implementation of the dropdown component.

\`\`\`jsx
<Dropdown
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]}
  placeholder="Select an option"
  onChange={(value) => handleChange(value)}
/>
\`\`\`

Features:
- Simple value/label pairs
- Default styling
- Basic interaction
- Automatic positioning
        `
      }
    }
  }
};

export const WithLabel: Story = {
  args: {
    ...Basic.args,
    label: 'Choose an option',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Labeled Dropdown

Dropdown with a label and required field indication.

\`\`\`jsx
<Dropdown
  label="Choose an option"
  required
  options={options}
  onChange={handleChange}
/>
\`\`\`

Features:
- Clear labeling
- Required field indicator
- Proper form association
- Screen reader support
        `
      }
    }
  }
};

export const WithError: Story = {
  args: {
    ...Basic.args,
    error: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Error State

Dropdown displaying an error message.

\`\`\`jsx
<Dropdown
  error="This field is required"
  options={options}
  onChange={handleChange}
/>
\`\`\`

Features:
- Error message display
- Visual error indication
- ARIA error announcement
- Focus management
        `
      }
    }
  }
};

export const WithHelperText: Story = {
  args: {
    ...Basic.args,
    helperText: 'Select the best option for you',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Helper Text

Dropdown with additional context via helper text.

\`\`\`jsx
<Dropdown
  helperText="Select the best option for you"
  options={options}
  onChange={handleChange}
/>
\`\`\`

Best used for:
- Field instructions
- Additional context
- Format guidance
- Selection hints
        `
      }
    }
  }
};

export const Disabled: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Disabled State

Dropdown in a disabled state.

\`\`\`jsx
<Dropdown
  disabled
  options={options}
  onChange={handleChange}
/>
\`\`\`

Features:
- Visual disabled state
- Interaction prevention
- ARIA disabled state
- Focus exclusion
        `
      }
    }
  }
};

export const Searchable: Story = {
  args: {
    ...Basic.args,
    searchable: true,
    options: [
      ...defaultOptions,
      { value: "4", label: "Another Option" },
      { value: "5", label: "Yet Another Option" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
### Searchable Dropdown

Dropdown with search functionality.

\`\`\`jsx
<Dropdown
  searchable
  options={options}
  onChange={handleChange}
/>
\`\`\`

Features:
- Search input
- Filtered options
- Keyboard support
- No results state
        `
      }
    }
  }
};

export const WithIcons: Story = {
  args: {
    ...Basic.args,
    options: [
  {
    value: "1",
        label: "Success",
    icon: (
      <svg
            className="w-5 h-5 text-green-500"
        fill="none"
            viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
              d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
  {
    value: "2",
        label: "Warning",
    icon: (
      <svg
            className="w-5 h-5 text-yellow-500"
        fill="none"
            viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
### Icons in Options

Dropdown with icons in the options.

\`\`\`jsx
<Dropdown
  options={[
    {
      value: "1",
      label: "Success",
      icon: <SuccessIcon />
    },
    {
      value: "2",
      label: "Warning",
      icon: <WarningIcon />
    }
  ]}
  onChange={handleChange}
/>
\`\`\`

Best practices:
- Use meaningful icons
- Maintain consistent size
- Consider color meaning
- Keep icons optional
        `
      }
    }
  }
};

export const WithDescriptions: Story = {
  args: {
    ...Basic.args,
    options: [
  {
    value: "1",
    label: "Basic Plan",
    description: "$10/month - Good for starters",
  },
  {
    value: "2",
    label: "Pro Plan",
    description: "$20/month - Perfect for professionals",
  },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
### Descriptions in Options

Dropdown with additional descriptions for options.

\`\`\`jsx
<Dropdown
  options={[
  {
      value: "1",
      label: "Basic Plan",
      description: "$10/month - Good for starters"
    },
    {
      value: "2",
      label: "Pro Plan",
      description: "$20/month - Perfect for professionals"
    }
  ]}
  onChange={handleChange}
/>
\`\`\`

Best used for:
- Pricing plans
- Feature comparison
- Extended information
- Help text
        `
      }
    }
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Dropdown
        options={defaultOptions}
        placeholder="Small size"
        size="sm"
        onChange={console.log}
      />
      <Dropdown
        options={defaultOptions}
        placeholder="Medium size"
        size="md"
        onChange={console.log}
      />
      <Dropdown
        options={defaultOptions}
        placeholder="Large size"
        size="lg"
        onChange={console.log}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Size Variants

Dropdown in different size variants.

\`\`\`jsx
<Dropdown size="sm" options={options} />
<Dropdown size="md" options={options} />
<Dropdown size="lg" options={options} />
\`\`\`

Available sizes:
- sm: Compact
- md: Default
- lg: Large touch targets
        `
      }
    }
  }
};

export const CustomStyling: Story = {
  args: {
    ...Basic.args,
    className: "custom-dropdown",
    width: "300px",
  },
};

export const DropUp: Story = {
  args: {
    ...Basic.args,
    dropUp: true,
  },
};

export const WithManyOptions: Story = {
  args: {
    ...Basic.args,
    options: Array.from({ length: 20 }, (_, i) => ({
      value: String(i + 1),
      label: `Option ${i + 1}`,
    })),
    maxHeight: 200,
    searchable: true,
  },
};

export const EmptyState: Story = {
  args: {
    ...Basic.args,
    options: [],
    noOptionsMessage: "No options available",
  },
};

export const WithDisabledOptions: Story = {
  args: {
    ...Basic.args,
    options: [
      { value: "1", label: "Available Option" },
      { value: "2", label: "Disabled Option", disabled: true },
      { value: "3", label: "Another Available Option" },
    ],
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <Dropdown
        options={[]}
        placeholder="Empty options array"
        onChange={console.log}
        noOptionsMessage="No options available"
      />
      <Dropdown
        options={[{ value: "1", label: "" }]}
        placeholder="Empty label"
        onChange={console.log}
      />
      <Dropdown
        options={[
          { value: "1", label: "Very long option label that might need truncation in some cases" },
          { value: "2", label: "Another very long option label to demonstrate wrapping behavior" }
        ]}
        placeholder="Long labels"
        onChange={console.log}
      />
      <Dropdown
        options={[
          { value: "1", label: "Option with class", className: "custom-option" },
          { value: "2", label: "Disabled with class", disabled: true, className: "disabled-option" }
        ]}
        placeholder="Custom classes"
        onChange={console.log}
      />
    </div>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Dropdown
        options={defaultOptions}
        placeholder="Focus me and use keyboard"
        onChange={console.log}
        helperText="Try using arrow keys and Enter"
      />
      <Dropdown
        options={defaultOptions}
        placeholder="Searchable dropdown"
        onChange={console.log}
        searchable
        helperText="Type to filter options"
      />
      <Dropdown
        options={[
          { value: "1", label: "Enabled option" },
          { value: "2", label: "Disabled option", disabled: true },
          { value: "3", label: "Another enabled option" }
        ]}
        placeholder="Mixed enabled/disabled"
        onChange={console.log}
        helperText="Try keyboard navigation"
      />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Dropdown
        options={defaultOptions}
        placeholder="Required field"
        onChange={console.log}
        label="Required Dropdown"
        required
      />
      <Dropdown
        options={defaultOptions}
        placeholder="With error"
        onChange={console.log}
        error="This field has an error"
        helperText="Helper text with error"
      />
      <Dropdown
        options={[]}
        placeholder="Empty with error"
        onChange={console.log}
        error="No options available"
        noOptionsMessage="No options to select from"
      />
    </div>
  ),
};

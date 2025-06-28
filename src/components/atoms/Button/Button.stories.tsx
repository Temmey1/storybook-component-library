import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Button Component

A versatile and accessible button component that supports multiple variants, sizes, and states.

#### Features
- 🎨 Multiple visual variants (primary, secondary, outline)
- 📏 Flexible sizing options (small, medium, large)
- 🔄 Loading state support
- 📱 Full-width option for responsive layouts
- 🖼️ Icon support
- ♿ Full accessibility support
- 🎯 Customizable styling through className

#### Usage

\`\`\`jsx
import { Button } from '@your-library/components';

function MyComponent() {
  return (
    <Button
      variant="primary"
      size="medium"
      onClick={handleClick}
      isLoading={loading}
    >
      Click Me
    </Button>
  );
}
\`\`\`

#### Accessibility
- Proper ARIA attributes for states (disabled, loading)
- Keyboard navigation support
- High contrast ratios for all variants
- Loading state announcements
- Focus management

#### Best Practices
- Use clear and concise button text
- Choose appropriate variant for the action type
- Maintain consistent sizing within contexts
- Provide loading feedback for async actions
- Use icons to enhance, not replace, text
- Consider mobile touch targets

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' | 'primary' | Visual style variant |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Button size |
| fullWidth | boolean | false | Whether to take full width |
| isLoading | boolean | false | Shows loading spinner |
| disabled | boolean | false | Disables the button |
| icon | ReactNode | - | Icon before text |
| children | ReactNode | - | Button content |
| className | string | - | Additional CSS classes |
`
      }
    }
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
      description: "Visual style variant of the button",
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | outline' }
      }
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the button",
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium | large' }
      }
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button takes full width of its container",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    isLoading: {
      control: "boolean",
      description: "Shows a loading spinner and disables the button",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    icon: {
      control: "text",
      description: "Icon element to show before button text",
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    children: {
      control: "text",
      description: "Button content",
      table: {
        type: { summary: 'ReactNode' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

// Primary Button
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Primary Button

The primary button is used for main actions and calls to action. It should be used sparingly - typically once per view for the main action.

\`\`\`jsx
<Button variant="primary">
  Primary Action
</Button>
\`\`\`

Best used for:
- Form submissions
- Confirmation actions
- Main call-to-action
- Positive actions (Create, Submit, etc.)
        `
      }
    }
  }
};

// Secondary Button
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Secondary Button

Secondary buttons are used for alternative actions that are important but not the primary focus.

\`\`\`jsx
<Button variant="secondary">
  Secondary Action
</Button>
\`\`\`

Best used for:
- Alternative actions
- Secondary functions
- Less prominent actions
- Supporting actions alongside primary buttons
        `
      }
    }
  }
};

// Outline Button
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Outline Button

Outline buttons provide a lighter weight alternative that maintains clickability without drawing as much attention.

\`\`\`jsx
<Button variant="outline">
  Outline Action
</Button>
\`\`\`

Best used for:
- Optional actions
- Cancel actions
- Less important functions
- Clean/minimal interfaces
        `
      }
    }
  }
};

// Small Button
export const Small: Story = {
  args: {
    size: "small",
    children: "Small Button",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Small Button

Compact button variant for tight spaces or dense interfaces.

Best used for:
- Toolbar actions
- Inline actions
- Dense layouts
- Supporting actions
        `
      }
    }
  }
};

// Large Button
export const Large: Story = {
  args: {
    size: "large",
    children: "Large Button",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Large Button

Larger button variant for enhanced visibility and touch targets.

Best used for:
- Main call-to-action
- Mobile interfaces
- Marketing sections
- When prominence is needed
        `
      }
    }
  }
};

// Full Width Button
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Full Width Button

Button that spans the full width of its container.

Best used for:
- Mobile views
- Vertical button stacks
- When button should match input width
- Marketing sections
        `
      }
    }
  }
};

// Loading Button
export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Loading Button",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Loading Button

Shows a loading state for async actions.

Features:
- Visual loading indicator
- Disabled state while loading
- Maintains width to prevent layout shift
- Accessible loading announcement
        `
      }
    }
  }
};

// Disabled Button
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Disabled Button

Indicates that an action is unavailable.

Features:
- Visual disabled state
- Prevents clicking
- Removed from tab order
- Accessible disabled state
        `
      }
    }
  }
};

// Button with Icon
export const WithIcon: Story = {
  args: {
    icon: "★",
    children: "Button with Icon",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Button with Icon

Combines an icon with text for enhanced visual communication.

Best practices:
- Use icons that clearly relate to the action
- Maintain proper spacing between icon and text
- Ensure icon adds value to understanding
- Keep icons consistent across similar actions
        `
      }
    }
  }
};

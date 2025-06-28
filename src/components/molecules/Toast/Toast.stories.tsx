import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./index";
import { ToastProvider, useToast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Molecules/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Toast Component

A flexible toast notification system that supports multiple types, positions, and interactions.

#### Features
- 🎨 Multiple message types (success, error, warning, info)
- 📍 Flexible positioning options
- ⏱️ Customizable duration
- 🔄 Progress indicator
- 🎯 Action buttons
- ♿ Full accessibility support
- 🔕 Manual and auto-dismiss
- 🎨 Custom icons
- 📱 Responsive design

#### Usage

\`\`\`jsx
import { ToastProvider, useToast } from '@your-library/components';

function App() {
  return (
    <ToastProvider>
      <YourComponents />
    </ToastProvider>
  );
}

function YourComponent() {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast({
      type: "success",
      title: "Success",
      message: "Operation completed",
      duration: 3000,
    });
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
\`\`\`

#### Context and Hooks
The Toast system uses React Context to manage state:
- \`ToastProvider\`: Wrapper component that provides toast functionality
- \`useToast\`: Hook to access toast functions

#### Accessibility
- ARIA live regions for screen readers
- Keyboard navigation support
- Focus management
- Auto-dismiss announcements
- High contrast colors
- Clear action labeling

#### Best Practices
- Keep messages concise and clear
- Use appropriate type for context
- Consider message duration
- Provide action context
- Don't stack too many toasts
- Use consistent positioning
- Consider mobile viewports

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | 'success' \| 'error' \| 'warning' \| 'info' | 'info' | Toast type |
| title | string | - | Toast title |
| message | string | - | Main message |
| duration | number | 5000 | Auto-dismiss duration |
| dismissible | boolean | true | Allow manual dismiss |
| icon | ReactNode | - | Custom icon |
| position | ToastPosition | 'top-right' | Toast position |
| showProgress | boolean | true | Show progress bar |
| action | ToastAction | - | Action button config |
| className | string | - | Additional CSS classes |

##### ToastAction
| Prop | Type | Description |
|------|------|-------------|
| label | string | Action button text |
| onClick | () => void | Action callback |

##### ToastPosition
Available positions:
- top-right
- top-left
- bottom-right
- bottom-left
- top-center
- bottom-center
`
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Demo component to show toast functionality
const ToastDemo = () => {
  const { showToast } = useToast();

  return (
    <div className="flex gap-4">
      <button
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        onClick={() =>
          showToast({
            type: "info",
            title: "Information",
            message: "This is an information message",
          })
        }
      >
        Show Info Toast
      </button>

      <button
        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
        onClick={() =>
          showToast({
            type: "success",
            title: "Success",
            message: "Operation completed successfully",
          })
        }
      >
        Show Success Toast
      </button>

      <button
        className="px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2"
        onClick={() =>
          showToast({
            type: "warning",
            title: "Warning",
            message: "Please be careful with this action",
          })
        }
      >
        Show Warning Toast
      </button>

      <button
        className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
        onClick={() =>
          showToast({
            type: "error",
            title: "Error",
            message: "Something went wrong",
          })
        }
      >
        Show Error Toast
      </button>
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastDemo />,
  parameters: {
    docs: {
      description: {
        story: `
### Basic Toast Types

Demonstrates the four main toast types: info, success, warning, and error.

\`\`\`jsx
const { showToast } = useToast();

// Show an info toast
showToast({
  type: "info",
  title: "Information",
  message: "This is an information message"
});

// Show a success toast
showToast({
  type: "success",
  title: "Success",
  message: "Operation completed successfully"
});
\`\`\`

Each type has:
- Appropriate icon
- Semantic colors
- Clear visual hierarchy
- Consistent styling
        `
      }
    }
  }
};

export const CustomDuration: Story = {
  render: () => {
    const { showToast } = useToast();
    return (
      <button
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        onClick={() =>
          showToast({
            type: "info",
            title: "Long Duration",
            message: "This toast will stay for 10 seconds",
            duration: 10000,
          })
        }
      >
        Show Long Duration Toast
      </button>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Custom Duration Toast

Toast with a custom display duration.

\`\`\`jsx
showToast({
  type: "info",
  title: "Long Duration",
  message: "This toast will stay for 10 seconds",
  duration: 10000
});
\`\`\`

Best used for:
- Important messages
- Complex information
- When action is required
- Critical notifications
        `
      }
    }
  }
};

export const WithAction: Story = {
  render: () => {
    const { showToast } = useToast();
    return (
      <button
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        onClick={() =>
          showToast({
            type: "info",
            title: "With Action",
            message: "This toast has an action button",
            action: {
              label: "Undo",
              onClick: () => alert("Action clicked!"),
            },
          })
        }
      >
        Show Toast with Action
      </button>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Toast with Action

Toast with an interactive action button.

\`\`\`jsx
showToast({
  type: "info",
  title: "With Action",
  message: "This toast has an action button",
  action: {
    label: "Undo",
    onClick: () => handleUndo()
  }
});
\`\`\`

Features:
- Focusable action button
- Clear action labeling
- Proper keyboard support
- Action callback handling
        `
      }
    }
  }
};

export const NonDismissible: Story = {
  render: () => {
    const { showToast } = useToast();
    return (
      <button
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        onClick={() =>
          showToast({
            type: "warning",
            title: "Important",
            message: "This toast cannot be dismissed manually",
            dismissible: false,
            duration: 5000,
          })
        }
      >
        Show Non-dismissible Toast
      </button>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Non-dismissible Toast

Toast that can only be dismissed automatically.

\`\`\`jsx
showToast({
  type: "warning",
  title: "Important",
  message: "This toast cannot be dismissed manually",
  dismissible: false,
  duration: 5000
});
\`\`\`

Best used for:
- Critical notifications
- Required information
- System status updates
- Security alerts
        `
      }
    }
  }
};

export const CustomPosition: Story = {
  render: () => {
    const positions = [
            "top-right",
            "top-left",
            "bottom-right",
            "bottom-left",
            "top-center",
            "bottom-center",
    ] as const;

    return (
      <div className="space-y-4">
        {positions.map((position) => {
          const PositionButton = () => {
            const { showToast } = useToast();
            return (
            <button
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 block w-full"
                onClick={() =>
                  showToast({
                  type: "info",
                  title: `Position: ${position}`,
                  message: `This toast appears in the ${position} position`,
                  })
                }
            >
              Show Toast ({position})
            </button>
            );
          };

          return (
            <ToastProvider key={position} position={position}>
              <PositionButton />
          </ToastProvider>
          );
        })}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Custom Position Toast

Demonstrates different toast positioning options.

\`\`\`jsx
<ToastProvider position="top-right">
  {/* Your app content */}
</ToastProvider>
\`\`\`

Available positions:
- top-right (default)
- top-left
- bottom-right
- bottom-left
- top-center
- bottom-center

Consider:
- Screen real estate
- User attention flow
- Mobile viewports
- Other UI elements
        `
      }
    }
  }
};

export const NoProgress: Story = {
  render: () => {
    const { showToast } = useToast();
    return (
      <button
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        onClick={() =>
          showToast({
            type: "info",
            title: "No Progress",
            message: "This toast doesn't show a progress bar",
            showProgress: false,
          })
        }
      >
        Show Toast Without Progress
      </button>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Toast Without Progress

Toast without the auto-dismiss progress indicator.

\`\`\`jsx
showToast({
  type: "info",
  title: "No Progress",
  message: "This toast doesn't show a progress bar",
  showProgress: false
});
\`\`\`

Best used for:
- Simple notifications
- Quick messages
- When duration is less important
- Static information
        `
      }
    }
  }
};

export const CustomIcon: Story = {
  render: () => {
    const { showToast } = useToast();
    return (
      <button
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        onClick={() =>
          showToast({
            type: "info",
            title: "Custom Icon",
            message: "This toast has a custom icon",
            icon: (
              <svg
                className="w-6 h-6 text-purple-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
          })
        }
      >
        Show Toast with Custom Icon
      </button>
    );
  },
};

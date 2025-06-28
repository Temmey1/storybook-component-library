import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import { AvatarProps } from "./avatar.types";

const meta: Meta<typeof Avatar> = {
  title: "Components/Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Avatar Component

A versatile avatar component for displaying user profile images with rich features and accessibility support.

#### Features
- 👤 Single and group avatars
- 📏 Multiple sizes (xs, sm, md, lg, xl)
- 🔲 Multiple shapes (circle, square)
- 🟢 Status indicators
- 🔤 Fallback initials
- 🎨 Custom colors
- ♿ Full accessibility support
- 🖼️ Image error handling
- 🔄 Group display with overlap
- 🎯 Border customization

#### Usage

\`\`\`jsx
import { Avatar } from '@your-library/components';

// Single Avatar
<Avatar
  src="user-avatar.jpg"
  alt="User Name"
  name="User Name"
  size="md"
  status="online"
/>

// Group Avatar
<Avatar
  group={[
    { name: "John Doe", src: "john.jpg", status: "online" },
    { name: "Jane Smith", src: "jane.jpg", status: "busy" }
  ]}
  maxGroupSize={3}
/>
\`\`\`

#### Accessibility
- Alt text for images
- ARIA labels for status
- High contrast colors
- Fallback for failed images
- Screen reader support
- Focus management
- WCAG AA compliance

#### Best Practices
- Always provide alt text
- Use appropriate sizes
- Consider mobile display
- Handle image failures
- Use clear status indicators
- Maintain consistent styling
- Consider group limits

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | - | Image URL |
| alt | string | - | Alt text |
| name | string | - | User name |
| size | AvatarSize | 'md' | Avatar size |
| shape | AvatarShape | 'circle' | Avatar shape |
| backgroundColor | string | - | Custom bg color |
| bordered | boolean | false | Add border |
| status | AvatarStatus | - | Status indicator |
| className | string | - | Custom classes |
| onError | () => void | - | Error handler |
| textColor | string | '#ffffff' | Initials color |
| group | AvatarData[] | - | Group data |
| maxGroupSize | number | - | Max group size |
| groupOverlap | number | - | Group overlap |

##### AvatarSize
- xs: Extra small
- sm: Small
- md: Medium
- lg: Large
- xl: Extra large

##### AvatarShape
- circle: Circular avatar
- square: Square avatar

##### AvatarStatus
- online: Green indicator
- offline: Gray indicator
- busy: Red indicator
- away: Yellow indicator
`
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
      description: 'Shape of the avatar',
      table: {
        defaultValue: { summary: 'circle' },
      },
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away'],
      description: 'Status indicator',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show a border',
    },
    backgroundColor: {
      control: 'text',
      description: 'Custom background color class',
    },
    textColor: {
      control: 'text',
      description: 'Color of the initials text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {
  args: {
    src: "https://i.pravatar.cc/300",
    alt: "User avatar",
    name: "John Doe",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Basic Avatar

The simplest implementation of the avatar component.

\`\`\`jsx
<Avatar
  src="user-avatar.jpg"
  alt="User avatar"
  name="John Doe"
  size="md"
/>
\`\`\`

Features:
- Image display
- Fallback to initials
- Default size
- Circular shape
        `
      }
    }
  }
};

export const WithStatus: Story = {
  args: {
    ...Basic.args,
    status: "online",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Status Indicator

Avatar with online status indicator.

\`\`\`jsx
<Avatar
  src="user-avatar.jpg"
  alt="User avatar"
  name="John Doe"
  status="online"
/>
\`\`\`

Features:
- Status dot
- ARIA label
- Color indication
- Position handling
        `
      }
    }
  }
};

export const OfflineStatus: Story = {
  args: {
    ...Basic.args,
    status: "offline",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Offline Status

Avatar with offline status indicator.

Best used for:
- User presence
- Availability status
- Contact lists
- Chat interfaces
        `
      }
    }
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" name="John Doe" />
      <Avatar size="sm" name="John Doe" />
      <Avatar size="md" name="John Doe" />
      <Avatar size="lg" name="John Doe" />
      <Avatar size="xl" name="John Doe" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Size Variants

Available avatar sizes from extra small to extra large.

\`\`\`jsx
<Avatar size="xs" name="John Doe" />
<Avatar size="sm" name="John Doe" />
<Avatar size="md" name="John Doe" />
<Avatar size="lg" name="John Doe" />
<Avatar size="xl" name="John Doe" />
\`\`\`

Use cases:
- xs: Compact lists
- sm: Dense UIs
- md: General use
- lg: Profile views
- xl: Hero sections
        `
      }
    }
  }
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="circle" name="John Doe" />
      <Avatar shape="square" name="John Doe" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Shape Variants

Circle and square avatar shapes.

\`\`\`jsx
<Avatar shape="circle" name="John Doe" />
<Avatar shape="square" name="John Doe" />
\`\`\`

Best practices:
- Use consistent shapes
- Consider UI context
- Match design system
- Maintain aspect ratio
        `
      }
    }
  }
};

export const WithInitials: Story = {
  args: {
    name: "John Doe",
    backgroundColor: "bg-blue-800",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Initials Fallback

Avatar with initials when no image is provided.

\`\`\`jsx
<Avatar
  name="John Doe"
  backgroundColor="bg-blue-800"
/>
\`\`\`

Features:
- Automatic initials
- Custom background
- Accessible contrast
- Fallback handling
        `
      }
    }
  }
};

export const Group: Story = {
  args: {
    size: "md",
    group: [
      { name: "John Doe", src: "https://i.pravatar.cc/300?img=1", status: "online" },
      { name: "Jane Smith", src: "https://i.pravatar.cc/300?img=2", status: "offline" },
      { name: "Bob Johnson", src: "https://i.pravatar.cc/300?img=3", status: "busy" },
      { name: "Alice Brown", src: "https://i.pravatar.cc/300?img=4" },
      { name: "Charlie Wilson", src: "https://i.pravatar.cc/300?img=5" },
    ],
    maxGroupSize: 3,
    groupOverlap: 16,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Avatar Group

Group of overlapping avatars with count indicator.

\`\`\`jsx
      <Avatar
  group={[
    { name: "John Doe", src: "john.jpg", status: "online" },
    { name: "Jane Smith", src: "jane.jpg", status: "offline" },
    { name: "Bob Johnson", src: "bob.jpg", status: "busy" }
  ]}
  maxGroupSize={3}
  groupOverlap={16}
/>
\`\`\`

Features:
- Overlap control
- Max display limit
- Overflow count
- Status support
        `
      }
    }
  }
};

export const LargeGroup: Story = {
  args: {
    ...Group.args,
    maxGroupSize: 5,
    groupOverlap: 20,
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Large Avatar Group

Larger group with more visible avatars.

Best used for:
- Team displays
- Collaboration UI
- Project members
- Event participants
        `
      }
    }
  }
};

export const GroupWithStatus: Story = {
  args: {
    size: "md",
    group: [
      { name: "John Doe", status: "online" },
      { name: "Jane Smith", status: "offline" },
      { name: "Bob Johnson", status: "busy" },
      { name: "Alice Brown", status: "away" },
    ],
    maxGroupSize: 4,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Group with Status

Avatar group with various status indicators.

Features:
- Multiple statuses
- Initials fallback
- Status positioning
- Group layout
        `
      }
    }
  }
};

export const GroupWithInitials: Story = {
  args: {
    size: "md",
    group: [
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Bob Johnson" },
    ],
    maxGroupSize: 3,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Group with Initials

Avatar group using initials for all members.

Best used for:
- New user groups
- Missing avatars
- Placeholder content
- Testing layouts
        `
      }
    }
  }
};

export const GroupWithBorder: Story = {
  args: {
    ...Group.args,
    bordered: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Bordered Group

Avatar group with borders for better separation.

Features:
- Visual separation
- Depth indication
- Improved contrast
- Stack appearance
        `
      }
    }
  }
};

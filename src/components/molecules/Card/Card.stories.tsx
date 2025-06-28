import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./index";
import { Button } from "../../atoms/Button";

const meta: Meta<typeof Card> = {
  title: "Components/Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Card Component

A flexible and composable card component that supports various content layouts and visual styles.

#### Features
- 🎨 Compound component pattern (Header, Body, Footer)
- 📏 Multiple visual variants (bordered, shadowed, hoverable)
- 🖼️ Image support in header
- 📱 Responsive design
- 🎯 Customizable styling through className
- ♿ Full accessibility support
- 🔄 Interactive states
- 📊 Metric and feature card variants

#### Usage

\`\`\`jsx
import { Card } from '@your-library/components';

function MyComponent() {
  return (
    <Card hoverable shadowed>
      <Card.Header>
        <h2>Card Title</h2>
      </Card.Header>
      <Card.Body>
        <p>Card content goes here</p>
      </Card.Body>
      <Card.Footer>
        <Button>Action</Button>
      </Card.Footer>
    </Card>
  );
}
\`\`\`

#### Compound Components
The Card component uses the compound component pattern with these subcomponents:
- \`Card.Header\`: Optional header with image support
- \`Card.Body\`: Main content area
- \`Card.Footer\`: Optional footer for actions

#### Accessibility
- Proper heading hierarchy
- Image alt text support
- Interactive element management
- Focus handling for hoverable cards
- ARIA landmarks where appropriate

#### Best Practices
- Use consistent spacing within cards
- Maintain clear visual hierarchy
- Use appropriate variants for context
- Consider mobile responsiveness
- Keep content concise
- Use proper heading levels

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| hoverable | boolean | false | Enable hover effect |
| bordered | boolean | false | Add border to card |
| shadowed | boolean | false | Add shadow effect |
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Card content |

##### Header Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| image | string | - | Background image URL |
| imageAlt | string | - | Image alt text |
| bordered | boolean | false | Add border to header |

##### Footer Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| bordered | boolean | false | Add border to footer |
`
      }
    }
  },
  argTypes: {
    hoverable: {
      control: "boolean",
      description: "Enable hover effect on the card",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    bordered: {
      control: "boolean",
      description: "Add border to the card",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    shadowed: {
      control: "boolean",
      description: "Add shadow to the card",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: 'string' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card
export const Basic: Story = {
  args: {
    children: (
      <Card.Body>
        <h3 className="text-lg font-semibold">Basic Card</h3>
        <p className="mt-2 text-gray-600">
          This is a basic card with just a body section.
        </p>
      </Card.Body>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
### Basic Card

The simplest implementation of the card component with just a body section.

\`\`\`jsx
<Card>
  <Card.Body>
    <h3>Basic Card</h3>
    <p>Card content here</p>
  </Card.Body>
</Card>
\`\`\`

Best used for:
- Simple content display
- Short messages
- Quick information
- Status updates
        `
      }
    }
  }
};

// Card with Header and Footer
export const WithHeaderAndFooter: Story = {
  args: {
    children: (
      <>
        <Card.Header>
          <h3 className="text-lg font-semibold">Card Title</h3>
        </Card.Header>
        <Card.Body>
          <p className="text-gray-600">
            This card has a header and footer section.
          </p>
        </Card.Body>
        <Card.Footer>
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Save</Button>
          </div>
        </Card.Footer>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
### Card with Header and Footer

Demonstrates the full compound component pattern with all sections.

\`\`\`jsx
<Card>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Content</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
\`\`\`

Features:
- Clear content hierarchy
- Action area in footer
- Proper spacing between sections
- Flexible layout options
        `
      }
    }
  }
};

// Profile Card
export const ProfileCard: Story = {
  args: {
    hoverable: true,
    shadowed: true,
    children: (
      <>
        <Card.Header
          image="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg"
          imageAlt="Profile background"
        >
          <div className="mt-auto">
            <h3 className="text-2xl font-semibold text-white">John Doe</h3>
            <p className="text-lg text-white/90">Software Engineer</p>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900">About</h4>
              <p className="mt-2 text-gray-600">
                Passionate about creating beautiful and functional user interfaces.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Contact</h4>
              <p className="mt-2 text-gray-600">john.doe@example.com</p>
            </div>
          </div>
        </Card.Body>
        <Card.Footer bordered>
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <div className="text-center">
                <span className="block font-semibold text-gray-900">1.2k</span>
                <span className="text-gray-600">Followers</span>
              </div>
              <div className="text-center">
                <span className="block font-semibold text-gray-900">427</span>
                <span className="text-gray-600">Following</span>
              </div>
            </div>
            <Button variant="outline" size="small">Follow</Button>
          </div>
        </Card.Footer>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
### Profile Card

A specialized card variant for displaying user profiles.

\`\`\`jsx
<Card hoverable shadowed>
  <Card.Header image="profile-bg.jpg" imageAlt="Profile background">
    <h3>User Name</h3>
    <p>Title</p>
  </Card.Header>
  <Card.Body>
    {/* Profile content */}
  </Card.Body>
  <Card.Footer bordered>
    {/* Stats and actions */}
  </Card.Footer>
</Card>
\`\`\`

Features:
- Background image support
- Stats display
- Action buttons
- Hover effect
- Shadow for depth
        `
      }
    }
  }
};

// Info Card
export const InfoCard: Story = {
  args: {
    shadowed: true,
    children: (
      <>
        <Card.Body>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Important Information
              </h3>
              <p className="mt-1 text-gray-600">
                This card displays important information with an icon.
              </p>
            </div>
          </div>
        </Card.Body>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
### Info Card

A card variant for displaying important information with an icon.

Best used for:
- Notifications
- Important messages
- Feature highlights
- Quick tips
        `
      }
    }
  }
};

// Dashboard Card
export const DashboardCard: Story = {
  args: {
    hoverable: true,
    children: (
      <>
        <Card.Body>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Monthly Revenue
              </h3>
              <span className="text-green-700 font-medium">+12.5%</span>
            </div>
            <div className="text-3xl font-bold">$24,567</div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: "75%" }}
                role="progressbar"
                aria-label="Monthly revenue progress"
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>Target: $30,000</span>
            </div>
          </div>
        </Card.Body>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
### Dashboard Card

A specialized card for displaying metrics and KPIs.

Features:
- Progress indicator
- Metric comparison
- Target display
- Hover interaction
- Accessible progress bar
        `
      }
    }
  }
};

// Metric Card
export const MetricCard: Story = {
  args: {
    hoverable: true,
    shadowed: true,
    children: (
      <Card.Body>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Performance
              </h3>
            </div>
            <span className="text-green-700">+4.14%</span>
          </div>
          <div className="text-2xl font-bold">98.3%</div>
          <div className="text-sm text-gray-600">
            Increased by 7% from last week
          </div>
        </div>
      </Card.Body>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
### Metric Card

A compact card for displaying key metrics with trends.

Best used for:
- KPI displays
- Performance metrics
- Trend indicators
- Quick stats
        `
      }
    }
  }
};

// Feature Card
export const FeatureCard: Story = {
  args: {
    hoverable: true,
    bordered: true,
    children: (
      <>
        <Card.Body>
          <div className="space-y-4">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100">
              <svg
                className="w-6 h-6 text-indigo-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Enterprise Security
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Advanced security features including SSO, 2FA, and custom security policies to protect your organization's data.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                'Role-based access control',
                'Audit logging & reporting',
                'Data encryption at rest',
                'Compliance certifications'
              ].map((feature) => (
                <li key={feature} className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-2 text-green-700"
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
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Card.Body>
        <Card.Footer bordered>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">Learn more about security</span>
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <Button variant="primary" size="small">Get Started</Button>
          </div>
        </Card.Footer>
      </>
    ),
  },
};

// Section Card
export const SectionCard: Story = {
  args: {
    hoverable: true,
    shadowed: true,
    children: (
      <>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Project Overview</h3>
                <p className="text-sm text-gray-600">Last updated: 2 days ago</p>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Active
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium text-gray-900">Description</h4>
              <p className="mt-2 text-gray-600">
                A comprehensive project management dashboard with real-time analytics 
                and team collaboration features. Built with modern technologies for 
                optimal performance and scalability.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-700">Team Size</h5>
                <p className="mt-1 text-lg font-semibold text-gray-900">12 Members</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-700">Timeline</h5>
                <p className="mt-1 text-lg font-semibold text-gray-900">6 Months</p>
              </div>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-900">Key Milestones</h4>
              <div className="mt-2 space-y-3">
                {[
                  { name: 'Research & Planning', status: 'Completed', date: 'Jan 15' },
                  { name: 'Design Phase', status: 'In Progress', date: 'Feb 28' },
                  { name: 'Development', status: 'Upcoming', date: 'Mar 30' }
                ].map((milestone) => (
                  <div key={milestone.name} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <svg
                        className={`w-5 h-5 ${
                          milestone.status === 'Completed' 
                            ? 'text-green-700' 
                            : milestone.status === 'In Progress' 
                            ? 'text-blue-700' 
                            : 'text-gray-400'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {milestone.status === 'Completed' ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        ) : milestone.status === 'In Progress' ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        )}
                      </svg>
                      <span className="text-gray-900">{milestone.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{milestone.date}</span>
                      <span className={`text-sm ${
                        milestone.status === 'Completed' 
                          ? 'text-green-700' 
                          : milestone.status === 'In Progress' 
                          ? 'text-blue-700' 
                          : 'text-gray-500'
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer bordered>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  src={`https://i.pravatar.cc/32?img=${i + 1}`}
                  alt={`Team member ${i + 1}`}
                />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">+8</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="small">View Details</Button>
              <Button variant="primary" size="small">Edit Project</Button>
            </div>
          </div>
        </Card.Footer>
      </>
    ),
  },
};

// Edge Cases
export const EmptyFeatureCard: Story = {
  args: {
    children: (
      <Card.Feature
        title="Empty Features"
        description="Card with empty feature list"
        features={[]}
      />
    ),
  },
};

export const KeyboardInteractiveCard: Story = {
  args: {
    children: (
      <Card.Feature
        title="Keyboard Navigation"
        description="Try using keyboard to interact"
        features={["Use Tab to focus", "Press Enter or Space to click"]}
        ctaText="Click Me"
        onCtaClick={() => alert("Button clicked!")}
      />
    ),
  },
};

export const ComplexNestedCard: Story = {
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Metric
            title="Nested Metric"
            value="100"
            progress={50}
            previousValue="+10%"
          />
        </Card.Header>
        <Card.Body>
          <Card.Feature
            title="Nested Feature"
            description="Feature card inside body"
            features={["Nested component", "Complex structure"]}
            ctaText="Action"
          />
        </Card.Body>
      </>
    ),
  },
};

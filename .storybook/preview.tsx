import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/global.css";

// Custom decorator component that uses CSS classes instead of inline styles
const StorybookWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="storybook-wrapper">
    {children}
  </div>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#333333",
        },
      ],
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <StorybookWrapper>
        <Story />
      </StorybookWrapper>
    ),
  ],
};

export default preview;
 
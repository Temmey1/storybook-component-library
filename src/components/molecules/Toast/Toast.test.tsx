import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Toast, ToastProvider, useToast } from "./Toast";
import type { ToastProps } from "./toast.types";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock requestAnimationFrame
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe("Toast Component", () => {
  const defaultProps: ToastProps & { id: string } = {
    id: "test-toast",
    type: "info",
    title: "Test Title",
    message: "Test Message",
    onClose: vi.fn(),
  };

  describe("Rendering", () => {
    it("renders with basic props", () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

    it("renders different types with correct styling", () => {
      const types: ToastProps["type"][] = ["success", "error", "warning", "info"];
    types.forEach((type) => {
        const { container } = render(<Toast {...defaultProps} type={type} />);
        expect(container.firstChild).toHaveClass(`bg-${type}-50`);
        expect(container.firstChild).toHaveClass(`border-${type}-200`);
      });
    });

    it("renders custom icon when provided", () => {
      const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
      render(<Toast {...defaultProps} icon={customIcon} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("renders action button when provided", () => {
      const action = {
        label: "Undo",
        onClick: jest.fn(),
      };
      render(<Toast {...defaultProps} action={action} />);
      const button = screen.getByText("Undo");
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(action.onClick).toHaveBeenCalled();
    });
  });

  describe("Behavior", () => {
    it("calls onClose when close button is clicked", () => {
      render(<Toast {...defaultProps} />);
      const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
      jest.advanceTimersByTime(300); // Animation duration
      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("auto-dismisses after duration", () => {
      render(<Toast {...defaultProps} duration={1000} />);
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("doesn't show close button when dismissible is false", () => {
    render(<Toast {...defaultProps} dismissible={false} />);
      expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
    });

    it("doesn't show progress bar when showProgress is false", () => {
      const { container } = render(<Toast {...defaultProps} showProgress={false} />);
      expect(container.querySelector(".bg-gray-200")).not.toBeInTheDocument();
    });
  });

  describe("Progress Bar", () => {
    it("updates progress over time", () => {
      const { container } = render(<Toast {...defaultProps} duration={1000} />);
      const progressBar = container.querySelector("[style*='width']");
      expect(progressBar).toHaveStyle({ width: "100%" });

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(progressBar).toHaveStyle({ width: "50%" });
    });
  });
});

describe("ToastProvider and useToast", () => {
  const TestComponent = () => {
    const { showToast } = useToast();
    return (
      <button
        onClick={() =>
          showToast({
            type: "info",
            title: "Test Toast",
            message: "Test Message",
          })
        }
      >
        Show Toast
      </button>
    );
  };

  it("shows toast when showToast is called", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Show Toast"));
    expect(screen.getByText("Test Toast")).toBeInTheDocument();
  });

  it("throws error when useToast is used outside provider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow(
      "useToast must be used within a ToastProvider"
    );
    consoleError.mockRestore();
  });

  it("supports different positions", () => {
    const positions = [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
      "top-center",
      "bottom-center",
    ] as const;

    positions.forEach((position) => {
      const { container } = render(
        <ToastProvider position={position}>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText("Show Toast"));
      const toastContainer = container.querySelector("[aria-live='assertive']");
      
      if (position.includes("top")) {
        expect(toastContainer).toHaveClass("top-0");
      }
      if (position.includes("bottom")) {
        expect(toastContainer).toHaveClass("bottom-0");
      }
      if (position.includes("right")) {
        expect(toastContainer).toHaveClass("right-0");
      }
      if (position.includes("left") && !position.includes("center")) {
        expect(toastContainer).toHaveClass("left-0");
      }
      if (position.includes("center")) {
        expect(toastContainer).toHaveClass("-translate-x-1/2");
      }
    });
  });

  it("removes toast after animation", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Show Toast"));
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    act(() => {
      jest.advanceTimersByTime(300); // Animation duration
    });

    expect(screen.queryByText("Test Toast")).not.toBeInTheDocument();
  });
});

describe("Toast Accessibility", () => {
  const TestComponent = ({ type, message, icon, action }: any) => {
    const { showToast } = useToast();
    return (
      <button
        onClick={() =>
          showToast({
            type,
            message,
            icon,
            action
          })
        }
      >
        Show Toast
      </button>
    );
  };

  it("uses accessible colors for all button variants", () => {
    render(
      <ToastProvider>
        <div>
          <TestComponent type="info" message="Test" />
          <TestComponent type="success" message="Test" />
          <TestComponent type="warning" message="Test" />
          <TestComponent type="error" message="Test" />
        </div>
      </ToastProvider>
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach(button => {
      expect(button).toHaveClass("text-white", "focus:ring-2");
    });
  });

  it("maintains accessible colors in custom position buttons", () => {
    render(
      <ToastProvider position="top-right">
        <TestComponent type="info" message="Test" />
      </ToastProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-white", "focus:ring-2");
  });

  it("uses accessible colors for custom icon", () => {
    render(
      <ToastProvider>
        <TestComponent 
          type="info" 
          message="Test" 
          icon={<svg data-testid="custom-icon" className="text-purple-700" />} 
        />
      </ToastProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const icon = screen.getByTestId("custom-icon");
    expect(icon).toHaveClass("text-purple-700");
  });

  it("has proper focus indicators", () => {
    render(
      <ToastProvider>
        <TestComponent type="info" message="Test" />
      </ToastProvider>
    );

    // Click the trigger button to show the toast
    const triggerButton = screen.getByRole("button");
    fireEvent.click(triggerButton);

    // Find the close button in the toast
    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toHaveClass(
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-offset-2",
      "focus:ring-blue-700"
    );

    // Check the action button if present
    const actionButton = screen.queryByRole("button", { name: /action/i });
    if (actionButton) {
      expect(actionButton).toHaveClass(
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-blue-700"
      );
    }
  });

  it("maintains color contrast in action buttons", () => {
    render(
      <ToastProvider>
        <TestComponent 
          type="info" 
          message="Test" 
          action={{
            label: "Action",
            onClick: vi.fn()
          }}
        />
      </ToastProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const actionButton = screen.getByText("Action");
    expect(actionButton).toHaveClass(
      "text-blue-700",
      "bg-blue-50",
      "hover:bg-blue-100",
      "focus:ring-2",
      "focus:ring-blue-700"
    );
  });
});

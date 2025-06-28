import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Button } from "./button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders different variants", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass("btn", "btn-primary");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass("btn", "btn-secondary");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass("btn", "btn-outline");
  });

  it("renders different sizes", () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass("text-sm");

    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass("text-base");

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass("text-lg");
  });

  it("renders full width when specified", () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass("w-full");
  });

  it("renders loading state", () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    const icon = <span data-testid="test-icon">★</span>;
    render(<Button icon={icon}>With Icon</Button>);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("is disabled when specified", () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass("btn-disabled");
  });
});

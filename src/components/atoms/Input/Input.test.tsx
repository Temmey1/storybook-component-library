import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest';
import { Input } from "./Input";

describe("Input", () => {
  it("renders basic input correctly", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("connects label to input using htmlFor", () => {
    render(<Input label="Username" id="username" />);
    const label = screen.getByText("Username");
    const input = screen.getByRole("textbox");
    expect(label).toHaveAttribute("for", "username");
    expect(input).toHaveAttribute("id", "username");
  });

  it("uses name as fallback for htmlFor if id is not provided", () => {
    render(<Input label="Username" name="username" />);
    const label = screen.getByText("Username");
    const input = screen.getByRole("textbox");
    expect(label).toHaveAttribute("for", "username");
    expect(input).toHaveAttribute("name", "username");
  });

  it("marks decorative icons as aria-hidden", () => {
    const icon = <span>🔍</span>;
    render(
      <Input
        leftIcon={icon}
      />
    );
    const iconElement = screen.getByText("🔍");
    expect(iconElement).toHaveAttribute("aria-hidden", "true");
  });

  it("provides accessible name and state for password toggle button", async () => {
    render(<Input type="password" label="Password" />);
    const toggleButton = screen.getByRole("button", { name: /show password/i });
    expect(toggleButton).toHaveAttribute("aria-label", "Show password");

    fireEvent.click(toggleButton);

    const hidePasswordButton = await screen.findByRole("button", { name: /hide password/i });
    expect(hidePasswordButton).toBeInTheDocument();
  });

  it("connects error message to input using aria-describedby", () => {
    render(
      <Input
        type="password"
        error="Password is required"
        id="password-field"
        label="Password"
      />
    );
    const input = screen.getByLabelText("Password");
    const error = screen.getByText("Password is required");
    expect(input).toHaveAttribute("aria-describedby", error.id);
  });

  it("connects helper text to input using aria-describedby", () => {
    render(
      <Input
        helperText="Enter your username"
        id="username"
      />
    );
    const input = screen.getByRole("textbox");
    const helper = screen.getByText("Enter your username");
    
    expect(input).toHaveAttribute("aria-describedby", "username-help");
    expect(helper).toHaveAttribute("id", "username-help");
  });

  it("indicates invalid state when error is present", () => {
    render(<Input error="This field is required" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("applies proper focus styles to password toggle button", () => {
    render(<Input type="password" />);
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveClass("input-password-toggle-button");
  });

  it("renders label when provided", () => {
    render(<Input label="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders helper text when provided", () => {
    render(<Input helperText="This is a helper text" />);
    expect(screen.getByText("This is a helper text")).toBeInTheDocument();
  });

  it("renders error message when provided", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toHaveClass(
      "input-helper-text-error"
    );
  });

  it("handles password toggle", () => {
    render(<Input type="password" label="Password" id="password" />);
    const input = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button");

    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
  });

  it("handles icon positioning", () => {
    const icon = <div className="input-icon">★</div>;

    const { rerender } = render(<Input leftIcon={icon} />);
    const iconWrapper = screen.getByTestId("test-icon");
    expect(iconWrapper).toHaveClass("left-0");

    rerender(<Input rightIcon={icon} />);
    const newIconWrapper = screen.getByTestId("test-icon");
    expect(newIconWrapper).toHaveClass("right-0");
  });

  it("handles disabled state", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("textbox")).toHaveClass("input-disabled");
  });

  it("handles loading state", () => {
    render(<Input isLoading />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("handles different input types", () => {
    const { rerender } = render(<Input type="text" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");

    rerender(<Input type="email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("handles value changes", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test value" },
    });

    expect(handleChange).toHaveBeenCalled();
  });
});

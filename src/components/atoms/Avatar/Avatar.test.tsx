import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar } from "./Avatar";
import { vi } from "vitest";

describe("Avatar", () => {
  // Mock console.error to avoid polluting test output
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("renders with image when src is provided", () => {
      render(<Avatar src="test.jpg" alt="Test User" />);
      const img = screen.getByTestId("avatar-image");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "test.jpg");
    });

    it("renders initials when no src is provided", () => {
      render(<Avatar name="John Doe" />);
      const initials = screen.getByText("JD");
      expect(initials).toBeInTheDocument();
    });

    it("renders with proper accessibility attributes", () => {
      render(<Avatar name="John Doe" alt="John Doe's avatar" />);
      const avatar = screen.getByTestId("avatar");
      const initials = screen.getByText("JD");

      expect(avatar).toHaveAttribute("aria-label", "John Doe's avatar");
      expect(initials).toHaveAttribute("aria-hidden", "true");
    });

    it("applies proper contrast colors", () => {
      render(<Avatar name="John Doe" />);
      const initials = screen.getByText("JD");

      expect(initials).toHaveStyle({ color: "rgb(255, 255, 255)" }); // Updated to rgb
      const parent = initials.parentElement;
      const hasContrastClass = [
        "bg-blue-800",
        "bg-red-800",
        "bg-green-800",
        "bg-yellow-900",
        "bg-purple-800",
        "bg-pink-800",
        "bg-indigo-800",
      ].some((className) => parent?.classList.toString().includes(className));

      expect(hasContrastClass).toBe(true);
    });
  });

  describe("Status Indicator", () => {
    it("renders status indicator with proper accessibility", () => {
      render(<Avatar name="John Doe" status="online" />);
      const status = screen.getByRole("status");

      expect(status).toHaveAttribute("aria-label", "User status: online");
      expect(status).toHaveClass("bg-green-500");
    });
  });

  describe("Error Handling", () => {
    it("shows initials when image fails to load", async () => {
      render(<Avatar src="invalid.jpg" name="John Doe" />);
      const img = screen.getByTestId("avatar-image");
      fireEvent.error(img);

      const initials = await screen.findByText("JD");
      expect(initials).toBeInTheDocument();
    });
  });

  describe("Customization", () => {
    it("accepts custom background color while maintaining contrast", () => {
      render(
        <Avatar
          name="John Doe"
          backgroundColor="bg-blue-800"
          textColor="#ffffff"
        />
      );

      const initials = screen.getByText("JD");
      expect(initials).toHaveStyle({ color: "rgb(255, 255, 255)" });
      expect(initials.parentElement).toHaveClass("bg-blue-800");
    });
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<Avatar name="John Doe" size="xs" />);
    expect(screen.getByTestId("avatar")).toHaveClass("w-6", "h-6");

    rerender(<Avatar name="John Doe" size="xl" />);
    expect(screen.getByTestId("avatar")).toHaveClass("w-16", "h-16");
  });

  it("applies circle shape by default", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByTestId("avatar")).toHaveClass("rounded-full");
  });

  it("applies square shape when specified", () => {
    render(<Avatar name="John Doe" shape="square" />);
    expect(screen.getByTestId("avatar")).toHaveClass("rounded-lg");
  });

  it("applies border when bordered prop is true", () => {
    render(<Avatar name="John Doe" bordered />);
    expect(screen.getByTestId("avatar")).toHaveClass(
      "border-2",
      "ring-2"
    );
  });

  it("renders status indicator when status is provided", () => {
    render(<Avatar name="John Doe" status="online" />);
    expect(screen.getByTestId("avatar-status")).toHaveClass("bg-green-500");
  });

  it("applies custom background color when provided", () => {
    render(<Avatar name="John Doe" backgroundColor="bg-custom-500" />);
    expect(screen.getByTestId("avatar")).toHaveClass("bg-custom-500");
  });

  it("generates consistent background color for same name", () => {
    const { rerender } = render(<Avatar name="John Doe" />);
    const firstColor = screen.getByTestId("avatar")?.className;

    rerender(<Avatar name="John Doe" />);
    const secondColor = screen.getByTestId("avatar")?.className;

    expect(firstColor).toBe(secondColor);
  });

  it("applies custom text color when provided", () => {
    render(<Avatar name="John Doe" textColor="red" />);
    expect(screen.getByText("JD")).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("applies custom className", () => {
    render(<Avatar name="John Doe" className="custom-class" />);
    expect(screen.getByTestId("avatar")).toHaveClass("custom-class");
  });

  it("generates correct initials for different name formats", () => {
    const { rerender } = render(<Avatar name="John" />);
    expect(screen.getByText("JO")).toBeInTheDocument();

    rerender(<Avatar name="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();

    rerender(<Avatar name="John Middle Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });
});

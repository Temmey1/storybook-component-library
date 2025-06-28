import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "./Dropdown";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const defaultOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3", disabled: true },
];

describe("Dropdown", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  it("renders correctly with placeholder", () => {
    render(<Dropdown options={defaultOptions} placeholder="Select" />);
    expect(screen.getByText("Select")).toBeInTheDocument();
  });

  it("opens and closes on click", () => {
    render(<Dropdown options={defaultOptions} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects an option on click", () => {
    render(<Dropdown options={defaultOptions} onChange={mockOnChange} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Option 2"));
    expect(mockOnChange).toHaveBeenCalledWith("2");
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("does not select disabled options", () => {
    render(<Dropdown options={defaultOptions} onChange={mockOnChange} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Option 3"));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("handles keyboard navigation", () => {
    render(<Dropdown options={defaultOptions} onChange={mockOnChange} />);
    const button = screen.getByRole("button");

    fireEvent.keyDown(button, { key: "Enter" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    
    fireEvent.keyDown(button, { key: "ArrowDown" });
    fireEvent.keyDown(button, { key: "ArrowDown" });
    fireEvent.keyDown(button, { key: "Enter" });

    expect(mockOnChange).toHaveBeenCalledWith("2");
  });

  it("applies custom width and className", () => {
    render(<Dropdown options={defaultOptions} width={300} className="custom-class" />);
    const container = screen.getByTestId("dropdown-container");
    expect(container).toHaveClass("custom-class");
    expect(container).toHaveStyle({ width: "300px" });
  });

  it("displays an error message", () => {
    render(<Dropdown options={defaultOptions} error="Error message" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-red-700");
    expect(screen.getByText("Error message")).toHaveClass("text-red-700");
  });

  it("renders a label and required indicator", () => {
    render(<Dropdown options={defaultOptions} label="My Label" required />);
    expect(screen.getByText("My Label")).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveClass("text-red-700");
  });

  it("filters options with search", () => {
    render(<Dropdown options={defaultOptions} searchable />);
    fireEvent.click(screen.getByRole("button"));
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Option 1" } });
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  it("shows no options message when search fails", () => {
    render(<Dropdown options={defaultOptions} searchable noOptionsMessage="Not found" />);
    fireEvent.click(screen.getByRole("button"));
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "xyz" } });
    expect(screen.getByText("Not found")).toBeInTheDocument();
  });

  it("renders in dropUp mode", () => {
    render(<Dropdown options={defaultOptions} dropUp />);
    fireEvent.click(screen.getByRole("button"));
    const menu = screen.getByRole("listbox").parentElement;
    expect(menu).toHaveClass("bottom-full");
  });

  it("closes on Escape key", () => {
    render(<Dropdown options={defaultOptions} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.keyDown(button, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("clears search on close", () => {
    render(<Dropdown options={defaultOptions} searchable />);
    fireEvent.click(screen.getByRole("button"));
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Option 1" } });
    fireEvent.mouseDown(document.body); // Use mouseDown to trigger outside click handler
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button")); // Re-open
    expect(screen.getByPlaceholderText("Search...")).toHaveValue("");
  });

  it("shows selected value when provided", () => {
    render(
      <Dropdown
        options={defaultOptions}
        value="1"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("shows options when clicked", () => {
    render(
      <Dropdown
        options={defaultOptions}
        placeholder="Select option"
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("calls onChange when option is selected", () => {
    render(
      <Dropdown
        options={defaultOptions}
        placeholder="Select option"
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Option 1"));

    expect(mockOnChange).toHaveBeenCalledWith("1");
  });

  it("closes dropdown after selection", async () => {
    render(
      <Dropdown
        options={defaultOptions}
        placeholder="Select option"
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Option 1"));

    await waitFor(() => {
      expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    });
  });

  it("shows error message when provided", () => {
    render(
      <Dropdown
        options={defaultOptions}
        placeholder="Select option"
        onChange={mockOnChange}
        error="This field is required"
      />
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("shows helper text when provided", () => {
    render(
      <Dropdown
        options={defaultOptions}
        placeholder="Select option"
        onChange={mockOnChange}
        helperText="Please select an option"
      />
    );

    expect(screen.getByText("Please select an option")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <Dropdown
        options={defaultOptions}
        placeholder="Select option"
        onChange={mockOnChange}
        disabled
      />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  it("filters options when searchable and search term is entered", async () => {
    render(
      <Dropdown
        options={defaultOptions}
        placeholder="Select option"
        onChange={mockOnChange}
        searchable
      />
    );

    fireEvent.click(screen.getByRole("button"));

    const searchInput = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "1");

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  it("shows no options message when search has no results", async () => {
    render(
      <Dropdown
        options={defaultOptions}
        placeholder="Select option"
        onChange={mockOnChange}
        searchable
        noOptionsMessage="No matching options"
      />
    );

    fireEvent.click(screen.getByRole("button"));
    const searchInput = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "xyz");

    expect(screen.getByText("No matching options")).toBeInTheDocument();
  });

  it("shows description when provided", () => {
    const optionsWithDescription = [
      {
        value: "1",
        label: "Option 1",
        description: "Description for Option 1",
      },
    ];

    render(
      <Dropdown
        options={optionsWithDescription}
        placeholder="Select option"
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Description for Option 1")).toBeInTheDocument();
  });

  it("shows icon when provided", () => {
    const optionsWithIcon = [
      {
        value: "1",
        label: "Option 1",
        icon: <span data-testid="test-icon">Icon</span>,
      },
    ];

    render(
      <Dropdown
        options={optionsWithIcon}
        placeholder="Select option"
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(
      <Dropdown
        options={defaultOptions}
        placeholder="Select option"
        onChange={mockOnChange}
        size="sm"
      />
    );

    expect(screen.getByRole("button")).toHaveClass("h-8");

    rerender(
      <Dropdown
        options={defaultOptions}
        placeholder="Select option"
        onChange={mockOnChange}
        size="lg"
      />
    );

    expect(screen.getByRole("button")).toHaveClass("h-12");
  });

  describe("accessibility and styling", () => {
    it("renders required field indicator with proper contrast", () => {
      render(
        <Dropdown
          options={[{ value: "1", label: "Option 1" }]}
          label="Test Label"
          required
          onChange={() => {}}
        />
      );
      
      const requiredIndicator = screen.getByText("*");
      expect(requiredIndicator).toHaveClass("text-red-700");
    });

    it("renders error message with proper contrast", () => {
      render(
        <Dropdown
          options={[{ value: "1", label: "Option 1" }]}
          error="Error message"
          onChange={() => {}}
        />
      );
      
      const errorMessage = screen.getByText("Error message");
      expect(errorMessage).toHaveClass("text-red-700");
    });

    it("applies proper error state styles to dropdown button", () => {
      render(
        <Dropdown
          options={[{ value: "1", label: "Option 1" }]}
          error="Error message"
          onChange={() => {}}
        />
      );
      
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-red-700", "text-red-900");
    });

    it("renders placeholder text with proper contrast", () => {
      render(
        <Dropdown
          options={[{ value: "1", label: "Option 1" }]}
          onChange={() => {}}
        />
      );
      
      const placeholder = screen.getByText("Select an option");
      expect(placeholder).toHaveClass("text-gray-500");
    });

    it("renders disabled options with proper contrast", () => {
      render(
        <Dropdown
          options={[{ value: "1", label: "Option 1", disabled: true }]}
          onChange={() => {}}
        />
      );
      
      const button = screen.getByRole("button");
      fireEvent.click(button);
      
      const option = screen.getByText("Option 1");
      expect(option.closest("li")).toHaveClass("text-gray-500", "bg-gray-50");
    });
  });

  describe("Accessibility Features", () => {
    it("provides proper ARIA attributes", () => {
      render(
        <Dropdown
          options={defaultOptions}
          placeholder="Select option"
          onChange={mockOnChange}
          label="Test Label"
          required
        />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-haspopup", "listbox");
      expect(button).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
      
      const options = screen.getAllByRole("option");
      expect(options[0]).toHaveAttribute("aria-selected", "false");
    });

    it("handles keyboard focus management", () => {
      render(
        <Dropdown
          options={defaultOptions}
          value="1"
          onChange={mockOnChange}
        />
      );

      const button = screen.getByRole("button");
      button.focus();
      expect(document.activeElement).toBe(button);

      fireEvent.keyDown(button, { key: "ArrowDown" }); // Highlight the first option
      const options = screen.getAllByRole("option");
      expect(options[0]).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Style Variations", () => {
    it("applies size classes correctly", () => {
      const { rerender } = render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          size="sm"
        />
      );
      
      expect(screen.getByRole("button")).toHaveClass("h-8", "text-sm");

      rerender(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          size="lg"
        />
      );
      
      expect(screen.getByRole("button")).toHaveClass("h-12", "text-lg");
    });

    it("applies error styles", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          error="Error message"
        />
      );

      expect(screen.getByRole("button")).toHaveClass("border-red-700", "text-red-900");
      expect(screen.getByText("Error message")).toHaveClass("text-red-700");
    });

    it("applies custom width and className", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          width="300px"
          className="custom-class"
        />
      );

      const container = screen.getByTestId("dropdown-container");
      expect(container).toHaveClass("custom-class");
      expect(container).toHaveStyle({ width: "300px" });
    });
  });

  describe("Search Functionality", () => {
    it("focuses search input when dropdown opens", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveFocus();
    });

    it("clears search term on close", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      await userEvent.type(searchInput, "test");
      
      fireEvent.keyDown(searchInput, { key: "Escape" });
      fireEvent.click(screen.getByRole("button"));
      
      // Re-query for the input and check its value
      expect(screen.getByPlaceholderText("Search...")).toHaveValue("");
    });

    it("handles case-insensitive search", async () => {
      render(
        <Dropdown
          options={[
            { value: "1", label: "Apple" },
            { value: "2", label: "Banana" },
          ]}
          onChange={mockOnChange}
          searchable
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      
      await userEvent.type(searchInput, "app");
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.queryByText("Banana")).not.toBeInTheDocument();

      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, "APP");
      expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    it("maintains focus on search input while typing", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      
      await userEvent.type(searchInput, "Option");
      expect(searchInput).toHaveFocus();
      
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      expect(searchInput).toHaveFocus();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty options array", () => {
      render(
        <Dropdown
          options={[]}
          onChange={mockOnChange}
          noOptionsMessage="No options available"
        />
      );

      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByText("No options available")).toBeInTheDocument();
    });

    it("handles option with empty label", () => {
      const optionsWithEmpty = [
        { value: "1", label: "" },
        ...defaultOptions
      ];

      render(
        <Dropdown
          options={optionsWithEmpty}
          onChange={mockOnChange}
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(4);
    });

    it("handles rapid opening/closing", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(screen.queryByRole("listbox")).toBeInTheDocument();
    });
  });

  describe("Dropdown Position", () => {
    it("renders dropup when specified", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          dropUp
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const dropdown = screen.getByRole("listbox").parentElement;
      expect(dropdown).toHaveClass("bottom-full");
    });

    it("respects maxHeight prop", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          maxHeight={100}
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const optionsContainer = screen.getByRole("listbox");
      expect(optionsContainer).toHaveStyle({ maxHeight: "100px" });
    });
  });

  describe("Complex Keyboard Navigation", () => {
    it("cycles through options with keyboard", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "Enter" }); // Open dropdown
      fireEvent.keyDown(button, { key: "ArrowDown" }); // First option
      fireEvent.keyDown(button, { key: "ArrowDown" }); // Second option
      fireEvent.keyDown(button, { key: "ArrowUp" }); // Back to first
      fireEvent.keyDown(button, { key: "Enter" }); // Select first option

      expect(mockOnChange).toHaveBeenCalledWith("1");
    });

    it("skips disabled options in keyboard navigation", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "Enter" });
      fireEvent.keyDown(button, { key: "ArrowDown" });
      fireEvent.keyDown(button, { key: "ArrowDown" });
      fireEvent.keyDown(button, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith("2");
    });

    it("resets search term and highlighted index when closing", async () => {
      render(
        <Dropdown options={defaultOptions} searchable />
      );

      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      fireEvent.change(searchInput, { target: { value: "Option" } });
      
      fireEvent.keyDown(searchInput, { key: "Escape" });
      fireEvent.click(screen.getByRole("button"));
      
      // Re-query the input field to get the fresh reference
      const freshSearchInput = screen.getByPlaceholderText("Search...");
      expect(freshSearchInput).toHaveValue("");
    });
  });

  it("applies custom maxHeight to dropdown menu", () => {
    render(<Dropdown options={defaultOptions} maxHeight={200} />);
    fireEvent.click(screen.getByRole("button"));
    const menu = screen.getByRole("listbox").parentElement;
    expect(menu).toHaveStyle({ maxHeight: "200px" });
  });

  it("applies custom width to dropdown container", () => {
    render(<Dropdown options={defaultOptions} width={200} />);
    const container = screen.getByTestId("dropdown-container");
    expect(container).toHaveStyle({ width: "200px" });
  });

  it("positions dropdown above when dropUp is true", () => {
    render(<Dropdown options={defaultOptions} dropUp />);
    fireEvent.click(screen.getByRole("button"));
    const menu = screen.getByRole("listbox").parentElement;
    expect(menu).toHaveClass("bottom-full");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(
      <Dropdown
        options={defaultOptions}
        onChange={mockOnChange}
        size="sm"
      />
    );

    expect(screen.getByRole("button")).toHaveClass("h-8", "text-sm");

    rerender(
      <Dropdown
        options={defaultOptions}
        onChange={mockOnChange}
        size="lg"
      />
    );

    expect(screen.getByRole("button")).toHaveClass("h-12", "text-lg");
  });

  it("closes dropdown when clicking outside", () => {
    render(
      <Dropdown
        options={defaultOptions}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("handles keyboard navigation with disabled options", () => {
    render(
      <Dropdown
        options={[
          { value: "1", label: "Option 1", disabled: true },
          { value: "2", label: "Option 2" }
        ]}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.keyDown(button, { key: "Enter" });
    fireEvent.keyDown(button, { key: "ArrowDown" });
    fireEvent.keyDown(button, { key: "Enter" });
    
    // Should skip disabled option and select Option 2
    expect(mockOnChange).toHaveBeenCalledWith("2");
  });

  it("focuses search input when dropdown opens", () => {
    render(
      <Dropdown
        options={defaultOptions}
        onChange={mockOnChange}
        searchable
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByPlaceholderText("Search...")).toHaveFocus();
  });

  it("propagates custom className to container", () => {
    render(<Dropdown options={defaultOptions} className="custom-class" />);
    const container = screen.getByTestId("dropdown-container");
    expect(container).toHaveClass("custom-class");
  });

  describe("Keyboard Navigation", () => {
    it("wraps around when navigating past last option", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );
      const button = screen.getByRole("button");
      fireEvent.click(button);
      
      // Navigate to the last enabled option (Option 2)
      fireEvent.keyDown(button, { key: "ArrowDown" });
      fireEvent.keyDown(button, { key: "ArrowDown" });
      
      // Wrap around to the first enabled option
      fireEvent.keyDown(button, { key: "ArrowDown" });
      fireEvent.keyDown(button, { key: "Enter" });
      
      expect(mockOnChange).toHaveBeenCalledWith(defaultOptions[0].value);
    });

    it("handles rapid arrow key presses", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      fireEvent.click(screen.getByRole("button"));
      
      // Rapidly press arrow down multiple times
      Array.from({ length: 10 }).forEach(() => {
        fireEvent.keyDown(screen.getByRole("button"), { key: "ArrowDown" });
      });
      
      fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe("Click Handling", () => {
    it("prevents event propagation when clicking search input", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      fireEvent.click(screen.getByRole("button"));
      fireEvent.click(screen.getByPlaceholderText("Search..."));
      // Instead of checking for spy, check that dropdown remains open
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("maintains dropdown open state when clicking search input", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      fireEvent.click(screen.getByRole("button"));
      fireEvent.click(screen.getByPlaceholderText("Search..."));
      
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
  });

  describe("State Management", () => {
    it("handles multiple rapid state changes", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      // Rapidly toggle dropdown
      fireEvent.click(screen.getByRole("button"));
      fireEvent.keyDown(screen.getByRole("button"), { key: "Escape" });
      fireEvent.click(screen.getByRole("button"));
      
      // Rapidly type and clear search
      const searchInput = screen.getByPlaceholderText("Search...");
      await userEvent.type(searchInput, "Option");
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, "1");
      
      // Verify state is consistent
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    });

    it("resets state when closing and reopening", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      // Open, search, and close
      fireEvent.click(screen.getByRole("button"));
      await userEvent.type(screen.getByPlaceholderText("Search..."), "Option 1");
      fireEvent.keyDown(screen.getByRole("button"), { key: "Escape" });
      
      // Reopen and verify state is reset
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByPlaceholderText("Search...")).toHaveValue("");
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
  });

  describe("Advanced Keyboard Navigation", () => {
    it("handles ArrowUp at first item", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );
      const button = screen.getByRole("button");
      fireEvent.click(button);
      // Go to first item
      fireEvent.keyDown(button, { key: "ArrowDown" });
      // Pressing up should not move
      fireEvent.keyDown(button, { key: "ArrowUp" });
      fireEvent.keyDown(button, { key: "Enter" });
      
      // Should stay at first item
      expect(mockOnChange).toHaveBeenCalledWith("1");
    });

    it("handles combined keyboard and mouse interactions", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByRole("button");
      
      // Open with keyboard, select with mouse
      fireEvent.keyDown(button, { key: "Enter" });
      fireEvent.click(screen.getByText("Option 1"));
      expect(mockOnChange).toHaveBeenCalledWith("1");

      // Reopen with mouse, select with keyboard
      fireEvent.click(button);
      fireEvent.keyDown(button, { key: "ArrowDown" });
      fireEvent.keyDown(button, { key: "Enter" });
      expect(mockOnChange).toHaveBeenCalledWith("1");
    });
  });

  describe("Ref Behavior", () => {
    it("maintains search input ref through rerenders", async () => {
      const { rerender } = render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      expect(searchInput).toHaveFocus();

      // Rerender with new props
      rerender(
        <Dropdown
          options={[...defaultOptions, { value: "4", label: "Option 4" }]}
          onChange={mockOnChange}
          searchable
        />
      );

      // Input should maintain focus
      expect(searchInput).toHaveFocus();
    });

    it("focuses search input after option selection", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      
      // Select option with mouse
      fireEvent.click(screen.getByText("Option 1"));
      
      // Reopen and check focus
      fireEvent.click(screen.getByRole("button"));
      expect(searchInput).toHaveFocus();
    });
  });

  describe("Option Styling", () => {
    it("applies custom className to options", () => {
      const optionsWithClass = [
        { 
          value: "1", 
          label: "Option 1",
          className: "custom-option"
        }
      ];

      render(
        <Dropdown
          options={optionsWithClass}
          onChange={mockOnChange}
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const option = screen.getByText("Option 1").closest("li");
      expect(option).toHaveClass("custom-option");
    });

    it("combines custom className with default styles", () => {
      const optionsWithClass = [
        { 
          value: "1", 
          label: "Option 1",
          className: "custom-option",
          disabled: true
        }
      ];

      render(
        <Dropdown
          options={optionsWithClass}
          onChange={mockOnChange}
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const option = screen.getByText("Option 1").closest("li");
      expect(option).toHaveClass("custom-option", "text-gray-500", "bg-gray-50");
    });
  });

  describe("Search Input Behavior", () => {
    it("handles search input blur", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      
      // Blur should not close dropdown
      fireEvent.blur(searchInput);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("maintains highlighted index while searching", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      
      // Navigate to second option
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      
      // Type search term
      await userEvent.type(searchInput, "2");
      
      // Enter should select the highlighted option
      fireEvent.keyDown(searchInput, { key: "Enter" });
      expect(mockOnChange).toHaveBeenCalledWith("2");
    });
  });

  describe("Function Coverage Tests", () => {
    it("calls handleOptionSelect when option is clicked", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      fireEvent.click(screen.getByRole("button"));
      fireEvent.click(screen.getByText("Option 1"));
      expect(mockOnChange).toHaveBeenCalledWith("1");

      // Verify dropdown closes after selection
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("calls handleKeyDown for all keyboard interactions", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByRole("button");
      
      // Test all key handlers
      fireEvent.keyDown(button, { key: "Enter" }); // Opens dropdown
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      
      fireEvent.keyDown(button, { key: "ArrowDown" }); // Highlights first option
      fireEvent.keyDown(button, { key: "Enter" }); // Selects first option
      expect(mockOnChange).toHaveBeenCalledWith("1");
      
      fireEvent.click(button); // Reopen
      fireEvent.keyDown(button, { key: "ArrowUp" }); // Should stay at first option
      fireEvent.keyDown(button, { key: "Enter" }); // Selects first option
      expect(mockOnChange).toHaveBeenCalledWith("1");
      
      fireEvent.click(button); // Reopen
      fireEvent.keyDown(button, { key: "Escape" }); // Closes dropdown
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("handles click outside to close dropdown", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      // Open dropdown
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      // Click outside
      fireEvent.mouseDown(document.body);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("handles search input interactions", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      // Open dropdown
      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");

      // Test search functionality
      await userEvent.type(searchInput, "Option 1");
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.queryByText("Option 2")).not.toBeInTheDocument();

      // Test keyboard navigation in search results
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      fireEvent.keyDown(searchInput, { key: "Enter" });
      expect(mockOnChange).toHaveBeenCalledWith("1");
    });

    it("handles disabled state interactions", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          disabled
        />
      );

      const button = screen.getByRole("button");
      
      // Test click handling
      fireEvent.click(button);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      
      // Test keyboard handling
      fireEvent.keyDown(button, { key: "Enter" });
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      
      fireEvent.keyDown(button, { key: "ArrowDown" });
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("handles rapid state changes", async () => {
      const { rerender } = render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      // Open and search
      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      await userEvent.type(searchInput, "Option");

      // Change options prop while dropdown is open
      rerender(
        <Dropdown
          options={[...defaultOptions, { value: "4", label: "Option 4" }]}
          onChange={mockOnChange}
          searchable
        />
      );

      // Continue interaction
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      fireEvent.keyDown(searchInput, { key: "Enter" });
      expect(mockOnChange).toHaveBeenCalled();
    });

    it("handles all option selection methods", () => {
      render(
        <Dropdown
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2", disabled: true },
            { value: "3", label: "Option 3" }
          ]}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByRole("button");
      
      // Click selection
      fireEvent.click(button);
      fireEvent.click(screen.getByText("Option 1"));
      expect(mockOnChange).toHaveBeenCalledWith("1");

      // Keyboard selection
      fireEvent.click(button);
      fireEvent.keyDown(button, { key: "ArrowDown" });
      fireEvent.keyDown(button, { key: "ArrowDown" }); // Skip disabled option
      fireEvent.keyDown(button, { key: "Enter" });
      expect(mockOnChange).toHaveBeenCalledWith("3");

      // Try to select disabled option
      fireEvent.click(button);
      fireEvent.click(screen.getByText("Option 2"));
      expect(mockOnChange).not.toHaveBeenCalledWith("2");
    });

    it("handles filtered options navigation", () => {
      render(
        <Dropdown
          options={[
            { value: "1", label: "Apple" },
            { value: "2", label: "Banana" },
            { value: "3", label: "Cherry" }
          ]}
          onChange={mockOnChange}
          searchable
        />
      );

      // Open and filter
      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      fireEvent.change(searchInput, { target: { value: "a" } });

      // Navigate filtered options
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      fireEvent.keyDown(searchInput, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith("2"); // Should select Banana
    });

    it("handles search input focus and blur", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      // Open dropdown
      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");

      // Focus should be on search input
      expect(searchInput).toHaveFocus();

      // Blur should keep dropdown open
      fireEvent.blur(searchInput);
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      // Click outside should close
      fireEvent.mouseDown(document.body);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("handles highlighted index updates", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      // Navigate down
      fireEvent.keyDown(button, { key: "ArrowDown" });
      fireEvent.keyDown(button, { key: "ArrowDown" });
      
      // Navigate up
      fireEvent.keyDown(button, { key: "ArrowUp" });
      fireEvent.keyDown(button, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith("1");
    });

    it("handles search term updates with empty results", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
          noOptionsMessage="Nothing found"
        />
      );

      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");

      // Type non-matching search term
      await userEvent.type(searchInput, "xyz");
      expect(screen.getByText("Nothing found")).toBeInTheDocument();

      // Clear search
      await userEvent.clear(searchInput);
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    it("handles effect cleanup on unmount", () => {
      const { unmount } = render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      // Open dropdown
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      // Unmount should clean up listeners
      unmount();

      // Click outside should not error
      fireEvent.mouseDown(document.body);
    });
  });

  describe("Direct Function Coverage", () => {
    it("handles direct state updates", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      // Test isOpen state
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      // Test searchTerm state
      const searchInput = screen.getByPlaceholderText("Search...");
      fireEvent.change(searchInput, { target: { value: "test" } });

      // Test highlightedIndex state
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      fireEvent.keyDown(searchInput, { key: "Enter" });
      expect(mockOnChange).toHaveBeenCalled();
    });

    it("handles direct option selection", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
        />
      );

      // Open dropdown
      fireEvent.click(screen.getByRole("button"));

      // Select option directly
      const option = screen.getByText("Option 1");
      fireEvent.click(option);

      // Verify state updates
      expect(mockOnChange).toHaveBeenCalledWith("1");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("handles keyboard events in sequence", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      // Open dropdown
      const button = screen.getByRole("button");
      fireEvent.click(button);
      const searchInput = screen.getByPlaceholderText("Search...");

      // Test key sequence
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      fireEvent.keyDown(searchInput, { key: "ArrowUp" });
      fireEvent.keyDown(searchInput, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith("1");
    });

    it("handles search and filter updates", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      // Open and get search input
      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");

      // Type and filter
      await userEvent.type(searchInput, "1");
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.queryByText("Option 2")).not.toBeInTheDocument();

      // Clear and check reset
      await userEvent.clear(searchInput);
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("handles click outside during search", () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      // Open and search
      fireEvent.click(screen.getByRole("button"));
      const searchInput = screen.getByPlaceholderText("Search...");
      fireEvent.change(searchInput, { target: { value: "test" } });

      // Click outside
      fireEvent.mouseDown(document.body);
      
      // Reopen and verify reset
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByPlaceholderText("Search...")).toHaveValue("");
    });

    it("handles multiple state updates in rapid succession", async () => {
      render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      const button = screen.getByRole("button");

      // Rapid open/close
      fireEvent.click(button);
      fireEvent.mouseDown(document.body);
      fireEvent.click(button);

      // Rapid search changes
      const searchInput = screen.getByPlaceholderText("Search...");
      await userEvent.type(searchInput, "1");
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, "2");

      // Rapid navigation
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      fireEvent.keyDown(searchInput, { key: "ArrowDown" });
      fireEvent.keyDown(searchInput, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith("2");
    });

    it("handles all dropdown states", () => {
      const { rerender } = render(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
        />
      );

      // Test initial state
      const button = screen.getByRole("button");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

      // Test open state
      fireEvent.click(button);
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      // Test disabled state
      rerender(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
          disabled
        />
      );
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

      // Test error state
      rerender(
        <Dropdown
          options={defaultOptions}
          onChange={mockOnChange}
          searchable
          error="Error message"
        />
      );
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });
  });
});

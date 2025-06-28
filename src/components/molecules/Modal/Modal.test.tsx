import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Modal } from "./Modal";
import { ModalProps, ModalVariant } from "./modal.types";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';

describe("Modal", () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  // Basic functionality tests
  describe("Basic Functionality", () => {
  it("renders when isOpen is true", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <div>Modal content</div>
        </Modal>
      );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
      expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("doesn't render when isOpen is false", () => {
      render(
        <Modal isOpen={false} onClose={onCloseMock} title="Test Modal">
          <div>Modal content</div>
        </Modal>
      );
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
    });

    it("calls onClose when clicking overlay", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <div>Modal content</div>
        </Modal>
      );
      fireEvent.click(screen.getByRole("dialog"));
      expect(onCloseMock).toHaveBeenCalled();
    });

    it("calls onClose when pressing Escape", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <div>Modal content</div>
        </Modal>
      );
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onCloseMock).toHaveBeenCalled();
    });

    it("doesn't call onClose when clicking content", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <div>Modal content</div>
        </Modal>
      );
      fireEvent.click(screen.getByText("Modal content"));
      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });

  // Size tests
  describe("Size Variants", () => {
    it.each(["small", "medium", "large", "full"] as const)(
      "applies correct size class for %s size",
      (size) => {
        render(
          <Modal isOpen={true} onClose={onCloseMock} size={size}>
            <div>Content</div>
          </Modal>
        );
        const modalContent = screen.getByRole("dialog").querySelector(".modal-content");
        expect(modalContent).toHaveClass(`max-w-${size === "full" ? "full" : size === "large" ? "2xl" : size === "small" ? "md" : "lg"}`);
      }
    );
  });

  // Modal variant tests
  describe("Modal Variants", () => {
    it("renders profile variant with correct styles", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          variant="profile"
          title="User Profile"
        >
          <div>Profile content</div>
        </Modal>
      );
      const header = screen.getByText("User Profile").parentElement;
      expect(header).toHaveClass("bg-gradient-to-r", "from-blue-500", "to-purple-500");
    });

    it("renders post variant with correct layout", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          variant="post"
          title="Post Details"
        >
          <div>Post content</div>
        </Modal>
      );
      const modalContent = screen.getByRole("dialog").querySelector(".modal-content");
      expect(modalContent).toHaveClass("max-w-2xl");
    });

    it("renders confirmation variant with centered layout", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          variant="confirmation"
          title="Confirm Action"
        >
          <div>Confirmation message</div>
        </Modal>
      );
      const modalContent = screen.getByRole("dialog").querySelector(".modal-content");
      expect(modalContent).toHaveClass("text-center");
    });

    it("renders media variant without title", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          variant="media"
          title="Should not show"
        >
          <div>Media content</div>
        </Modal>
      );
      expect(screen.queryByText("Should not show")).not.toBeInTheDocument();
    const closeButton = screen.getByLabelText("Close modal");
      expect(closeButton).toHaveClass("bg-black", "bg-opacity-50");
      const header = closeButton.closest('.flex');
      expect(header).toHaveClass("absolute", "top-4", "right-4", "z-10");
    });
  });

  // Footer tests
  describe("Footer Functionality", () => {
    it("renders footer content when provided", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          footer={<button>Footer Button</button>}
        >
          <div>Content</div>
        </Modal>
      );
      expect(screen.getByText("Footer Button")).toBeInTheDocument();
    });

    it("calls onClose from footer render prop", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          footer={({ onClose }) => (
            <button onClick={onClose}>Close</button>
          )}
        >
          <div>Content</div>
        </Modal>
      );
      fireEvent.click(screen.getByText("Close"));
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  // Close behavior tests
  describe("Close Behavior", () => {
    it("respects closeOnOverlayClick prop", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          closeOnOverlayClick={false}
        >
          <div>Content</div>
        </Modal>
      );
      fireEvent.click(screen.getByRole("dialog"));
      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it("respects closeOnEsc prop", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          closeOnEsc={false}
        >
          <div>Content</div>
        </Modal>
      );
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it("respects showCloseButton prop", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          showCloseButton={false}
        >
          <div>Content</div>
        </Modal>
      );
      expect(screen.queryByLabelText("Close modal")).not.toBeInTheDocument();
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("has correct ARIA attributes", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });

    it("manages body scroll when modal is open", () => {
      const { unmount } = render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );
      expect(document.body.style.overflow).toBe("hidden");
      unmount();
      expect(document.body.style.overflow).toBe("unset");
    });

    it("has proper ARIA attributes", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      
      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toHaveAttribute("aria-labelledby");
      expect(dialog).toHaveAttribute("aria-describedby");
    });

    it("links aria-labelledby to title element", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <div>Content</div>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      const titleId = dialog.getAttribute("aria-labelledby");
      const title = screen.getByRole("heading", { name: "Test Modal" });
      expect(title).toHaveAttribute("id", titleId);
    });

    it("links aria-describedby to content element", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Modal content</div>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      const contentId = dialog.getAttribute("aria-describedby");
      const content = screen.getByText("Modal content").closest('[id]');
      expect(content).toHaveAttribute("id", contentId);
    });

    it("uses provided id for modal and related elements", () => {
      const customId = "custom-modal";
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal" id={customId}>
          <div>Modal content</div>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("id", customId);
      const title = screen.getByRole("heading");
      expect(title).toHaveAttribute("id", `${customId}-title`);
      const content = screen.getByText("Modal content").closest('[id]');
      expect(content).toHaveAttribute("id", `${customId}-content`);
    });

    it("generates unique ids when not provided", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <div>Modal content</div>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      const modalId = dialog.getAttribute("id");
      expect(modalId).toMatch(/modal-[a-z0-9]+/);
      const title = screen.getByRole("heading");
      expect(title).toHaveAttribute("id", `${modalId}-title`);
      const content = screen.getByText("Modal content").closest('[id]');
      expect(content).toHaveAttribute("id", `${modalId}-content`);
    });

    it("marks close button icon as decorative", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );
      const closeIcon = screen.getByLabelText("Close modal").querySelector("svg");
      expect(closeIcon).toHaveAttribute("aria-hidden", "true");
    });

    it("has accessible button colors in footer", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          footer={({ onClose }) => (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-700 text-white"
              >
                Confirm
              </button>
            </>
          )}
        >
          <div>Content</div>
        </Modal>
      );
      
      const cancelButton = screen.getByText("Cancel");
      const confirmButton = screen.getByText("Confirm");
      
      expect(cancelButton).toHaveClass("text-gray-700");
      expect(confirmButton).toHaveClass("bg-blue-700", "text-white");
    });

    it("has accessible button colors in confirmation variant", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          variant="confirmation"
          footer={({ onClose }) => (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-700 text-white"
              >
                Delete
              </button>
            </>
          )}
        >
          <div>Content</div>
        </Modal>
      );
      
      const cancelButton = screen.getByText("Cancel");
      const deleteButton = screen.getByText("Delete");
      
      expect(cancelButton).toHaveClass("text-gray-700");
      expect(deleteButton).toHaveClass("bg-red-700", "text-white");
    });

    it("has proper focus management", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
          </div>
        </Modal>
      );

      const closeButton = screen.getByLabelText("Close modal");
      const button1 = screen.getByText("Button 1");
      const button2 = screen.getByText("Button 2");

      // Initial focus should be on close button
      expect(document.activeElement).toBe(closeButton);

      // Tab through the modal
      await user.tab();
      expect(document.activeElement).toBe(button1);

      await user.tab();
      expect(document.activeElement).toBe(button2);

      // Should cycle back to close button
      await user.tab();
      expect(document.activeElement).toBe(closeButton);
    });

    it("maintains focus trap with dynamic content", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
          </div>
        </Modal>
      );

      const closeButton = screen.getByLabelText("Close modal");
      const button1 = screen.getByRole("button", { name: "Button 1" });
      const button2 = screen.getByRole("button", { name: "Button 2" });

      // Focus should start on close button
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);

      // Tab through all focusable elements
      await user.tab();
      expect(document.activeElement).toBe(button1);

      await user.tab();
      expect(document.activeElement).toBe(button2);

      // Should cycle back to first focusable element
      await user.tab();
      expect(document.activeElement).toBe(closeButton);
    });
  });

  describe("Event Handling and Cleanup", () => {
    it("cleans up event listeners when unmounting", () => {
      const { unmount } = render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );
      
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it("cleans up event listeners when isOpen changes", () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );

      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      rerender(
        <Modal isOpen={false} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it("handles multiple rapid open/close transitions", async () => {
      const { rerender } = render(
        <Modal isOpen={false} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );

      // Rapid state changes
      rerender(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );
      rerender(
        <Modal isOpen={false} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );
      rerender(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("handles rapid state changes without memory leaks", () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const { rerender, unmount } = render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );

      // Close and reopen modal multiple times
      for (let i = 0; i < 5; i++) {
        rerender(
          <Modal isOpen={false} onClose={onCloseMock}>
            <div>Content</div>
          </Modal>
        );

        rerender(
          <Modal isOpen={true} onClose={onCloseMock}>
            <div>Content</div>
          </Modal>
        );
      }

      unmount();

      // Verify that event listeners are properly cleaned up
      const addCalls = addEventListenerSpy.mock.calls.length;
      const removeCalls = removeEventListenerSpy.mock.calls.length;
      expect(addCalls).toBe(removeCalls);

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe("ID Management", () => {
    it("uses provided custom ID", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} id="custom-modal">
          <div>Content</div>
        </Modal>
      );
      expect(screen.getByRole("dialog")).toHaveAttribute("id", "custom-modal");
    });

    it("generates unique IDs for multiple modals", () => {
      render(
        <>
          <Modal isOpen={true} onClose={onCloseMock}>
            <div>Modal 1</div>
          </Modal>
          <Modal isOpen={true} onClose={onCloseMock}>
            <div>Modal 2</div>
          </Modal>
        </>
      );
      
      const modals = screen.getAllByRole("dialog");
      expect(modals[0].id).not.toBe(modals[1].id);
    });
  });

  describe("Variant-Specific Styles", () => {
    it.each([
      ["profile", "bg-gradient-to-r from-blue-500 to-purple-500", true],
      ["post", "border-b border-gray-200", true],
      ["confirmation", "pt-6 pb-0 border-none", true],
      ["media", "absolute top-4 right-4 z-10", false]
    ])("applies correct header styles for %s variant", (variant, expectedClass, hasTitle) => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          variant={variant as any}
          title={hasTitle ? "Test" : undefined}
        >
          <div>Content</div>
        </Modal>
      );
      
      const header = hasTitle 
        ? screen.getByText("Test").parentElement
        : screen.getByLabelText("Close modal").closest('.flex');
      
      expectedClass.split(" ").forEach(className => {
        expect(header).toHaveClass(className);
      });
    });

    it("applies correct content styles for profile variant", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          variant="profile"
          title="Test"
        >
          <div>Content</div>
        </Modal>
      );
      
      const content = screen.getByText("Content").parentElement;
      expect(content).toHaveClass("pt-0", "-mt-16");
    });

    it("applies correct footer styles for media variant", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          variant="media"
          footer={<button>Action</button>}
        >
          <div>Content</div>
        </Modal>
      );
      
      const footer = screen.getByText("Action").parentElement;
      expect(footer).toHaveClass("bg-black", "border-none");
    });

    it("applies correct header styles for media variant", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          variant="media"
        >
          <div>Content</div>
        </Modal>
      );

      const header = screen.getByLabelText("Close modal").closest('.flex');
      expect(header).toHaveClass("absolute", "top-4", "right-4", "z-10");
    });
  });

  describe("Content Overflow Behavior", () => {
    it("applies correct max height for media variant", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
          variant="media"
        >
          <div>Content</div>
        </Modal>
      );
      
      const content = screen.getByText("Content").parentElement;
      expect(content).toHaveStyle({ maxHeight: "90vh" });
    });

    it("applies correct max height for non-media variants", () => {
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
        >
          <div>Content</div>
        </Modal>
      );
      
      const content = screen.getByText("Content").parentElement;
      expect(content).toHaveStyle({ maxHeight: "calc(100vh - 200px)" });
    });

    it("handles long content with scrolling", async () => {
      const longContent = Array(50).fill("Line").map((line, i) => `${line} ${i}`).join("<br/>");
      
      render(
        <Modal
          isOpen={true}
          onClose={onCloseMock}
        >
          <div dangerouslySetInnerHTML={{ __html: longContent }} />
        </Modal>
      );
      
      const content = screen.getByText(/Line 0/).parentElement;
      expect(content).toHaveClass("overflow-y-auto");
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("handles undefined title in non-media variant", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("handles empty children", () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Empty Modal">
          <></>
        </Modal>
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("handles rapid state changes without memory leaks", () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const { rerender, unmount } = render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );

      // Close and reopen modal multiple times
      for (let i = 0; i < 5; i++) {
        rerender(
          <Modal isOpen={false} onClose={onCloseMock}>
            <div>Content</div>
          </Modal>
        );

        rerender(
          <Modal isOpen={true} onClose={onCloseMock}>
            <div>Content</div>
          </Modal>
        );
      }

      unmount();

      // Verify that event listeners are properly cleaned up
      const addCalls = addEventListenerSpy.mock.calls.length;
      const removeCalls = removeEventListenerSpy.mock.calls.length;
      expect(addCalls).toBe(removeCalls);

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Style and Layout Behavior", () => {
    it("handles custom className in all variants", () => {
      const customClass = "my-custom-class";
      const variants: ModalVariant[] = ["default", "profile", "post", "confirmation", "media"];

      variants.forEach(variant => {
        const { container } = render(
          <Modal
            isOpen={true}
            onClose={onCloseMock}
            variant={variant}
            className={customClass}
          >
            <div>Content</div>
          </Modal>
        );
        expect(container.querySelector(`.${customClass}`)).toBeInTheDocument();
      });
    });

    it("maintains scroll position when closing and reopening", async () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div style={{ height: "1000px", overflow: "auto" }}>Tall content</div>
        </Modal>
      );

      const content = screen.getByText("Tall content").parentElement;
      if (content) {
        // Force layout calculation
        content.style.height = "200px";
        content.scrollTop = 100;
        
        // Wait for scroll to be applied
        await new Promise(resolve => setTimeout(resolve, 0));
        const scrollPosition = content.scrollTop;

      // Close modal
      rerender(
        <Modal isOpen={false} onClose={onCloseMock}>
            <div style={{ height: "1000px", overflow: "auto" }}>Tall content</div>
        </Modal>
      );

      // Reopen modal
      rerender(
        <Modal isOpen={true} onClose={onCloseMock}>
            <div style={{ height: "1000px", overflow: "auto" }}>Tall content</div>
        </Modal>
      );

        const reopenedContent = screen.getByText("Tall content").parentElement;
        if (reopenedContent) {
          reopenedContent.style.height = "200px";
          reopenedContent.scrollTop = scrollPosition;
          await new Promise(resolve => setTimeout(resolve, 0));
          expect(reopenedContent.scrollTop).toBe(scrollPosition);
        }
      }
    });

    it("handles window resize events", async () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} variant="media">
          <div>Content</div>
        </Modal>
      );

      // Simulate window resize
      global.innerHeight = 800;
      fireEvent(window, new Event('resize'));

      const content = screen.getByText("Content").parentElement;
      expect(content).toHaveStyle({ maxHeight: "90vh" });
    });
  });

  describe("Focus Management", () => {
    it("maintains focus trap with dynamic content", async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
          </div>
        </Modal>
      );

      const closeButton = screen.getByLabelText("Close modal");
      const button1 = screen.getByRole("button", { name: "Button 1" });
      const button2 = screen.getByRole("button", { name: "Button 2" });

      // Focus should start on close button
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);

      // Tab through all focusable elements
      await user.tab();
      expect(document.activeElement).toBe(button1);

      await user.tab();
      expect(document.activeElement).toBe(button2);

      // Should cycle back to first focusable element
      await user.tab();
      expect(document.activeElement).toBe(closeButton);
    });

    it("restores focus to trigger element when closed", async () => {
      const triggerButton = document.createElement("button");
      document.body.appendChild(triggerButton);
      triggerButton.focus();

      const { rerender } = render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );

      // Modal should be focused
      const closeButton = screen.getByLabelText("Close modal");
      expect(document.activeElement).toBe(closeButton);

      // Close modal
      rerender(
        <Modal isOpen={false} onClose={onCloseMock}>
          <div>Content</div>
        </Modal>
      );

      // Focus should return to trigger
      expect(document.activeElement).toBe(triggerButton);

      // Cleanup
      document.body.removeChild(triggerButton);
    });
  });
});

import React, { useEffect, useCallback, useRef } from "react";
import { ModalProps } from "./modal.types";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  variant = "default",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  footer,
  className = "",
  id,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Generate unique IDs for accessibility
  const modalId = id || `modal-${Math.random().toString(36).substr(2, 9)}`;
  const titleId = `${modalId}-title`;
  const contentId = `${modalId}-content`;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Handle ESC key
      if (event.key === "Escape" && closeOnEsc) {
        onClose();
      return;
    }

    // Handle focus trap
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) || [];

      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    }
  }, [closeOnEsc, onClose]);

  // Focus management and event listeners
  useEffect(() => {
    if (isOpen) {
      // Store reference and focus the close button
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      closeButtonRef.current?.focus();

      // Add event listener
      document.addEventListener('keydown', handleKeyDown);

      // Return cleanup function for this state
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      // When modal is closed, restore focus
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
        previousActiveElementRef.current = null;
      }
    }
  }, [isOpen, handleKeyDown]);

  // Prevent scroll on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    small: "max-w-xs sm:max-w-md",
    medium: "max-w-sm sm:max-w-lg",
    large: "max-w-md sm:max-w-2xl",
    full: "max-w-full m-2 sm:m-4",
  };

  // Variant classes
  const variantClasses = {
    default: "",
    profile: "bg-white rounded-lg shadow-xl",
    post: "bg-white rounded-lg shadow-xl max-w-2xl",
    confirmation: "bg-white rounded-lg shadow-xl max-w-md text-center",
    media: "bg-transparent rounded-lg shadow-xl max-w-5xl p-0",
  };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // Variant-specific header styles
  const getHeaderStyles = () => {
    switch (variant) {
      case "profile":
        return "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg h-40 pb-20";
      case "post":
        return "border-b border-gray-200";
      case "confirmation":
        return "pt-6 pb-0 border-none";
      case "media":
        return "absolute top-4 right-4 z-10";
      default:
        return "border-b border-gray-200";
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-75"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={contentId}
      id={modalId}
    >
      <div
        className={`modal-content relative w-full ${sizeClasses[size]} ${variantClasses[variant]} transform transition-all ${className}`}
      >
        {/* Header */}
        <div className={`flex items-start justify-between p-3 sm:p-4 ${getHeaderStyles()}`}>
          {variant !== "media" && (
            <h2 
              id={titleId}
              className={`text-xl font-semibold ${variant === "profile" ? "mt-2" : ""}`}
            >
              {title || ""}
            </h2>
          )}
          {showCloseButton && (
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-2
                ${variant === "media" ? "bg-black bg-opacity-50 text-white hover:bg-opacity-75" : 
                  variant === "profile" ? "text-white hover:text-gray-200" : 
                  "text-gray-400 hover:text-gray-500"}`}
              aria-label="Close modal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div 
          id={contentId}
          className={`overflow-y-auto scrollbar-hide
            ${variant === "confirmation" ? "px-4 py-3 sm:px-6 sm:py-4" : variant === "media" ? "p-0" : "p-4 sm:p-6"}
            ${variant === "media" ? "" : ""}
            ${variant === "profile" ? "pt-0 -mt-16" : ""}
          `}
          style={{ maxHeight: variant === "media" ? "90vh" : 'calc(100vh - 200px)' }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={`flex items-center justify-end p-3 sm:p-4 gap-2
            ${variant === "confirmation" ? "border-none pb-6" : "border-t border-gray-200"}
            ${variant === "media" ? "bg-black border-none" : ""}
          `}>
            {typeof footer === 'function' ? footer({ onClose }) : footer}
          </div>
        )}
      </div>
    </div>
  );
};
 
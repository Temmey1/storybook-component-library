import { ReactNode } from "react";

export type ModalSize = "small" | "medium" | "large" | "full";
export type ModalVariant = "default" | "profile" | "post" | "confirmation" | "media";

export interface ModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  
  /** Callback when the modal should close */
  onClose: () => void;
  
  /** Modal title. Not displayed in media variant */
  title?: string;
  
  /** Modal content */
  children: ReactNode;
  
  /** Size variant affecting modal width. Defaults to "medium" */
  size?: ModalSize;
  
  /** Visual variant affecting layout and styling. Defaults to "default" */
  variant?: ModalVariant;
  
  /** Whether to show the close button. Defaults to true */
  showCloseButton?: boolean;
  
  /** Whether clicking the overlay closes the modal. Defaults to true */
  closeOnOverlayClick?: boolean;
  
  /** Whether pressing Escape closes the modal. Defaults to true */
  closeOnEsc?: boolean;
  
  /** 
   * Footer content. Can be:
   * - ReactNode: Static content
   * - Function: Receives { onClose } prop for custom close handling
   */
  footer?: ReactNode | (({ onClose }: { onClose: () => void }) => ReactNode);
  
  /** Additional CSS classes for the modal container */
  className?: string;
  
  /** 
   * Custom ID for the modal. If not provided, a unique ID is generated.
   * Used for ARIA attributes and DOM identification.
   */
  id?: string;
} 
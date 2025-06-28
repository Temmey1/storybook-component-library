import type { ReactNode } from "react";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface ToastAction {
  /** The label text for the action button */
  label: string;
  /** Callback function when action button is clicked */
  onClick: () => void;
}

export interface ToastProps {
  /** The type of toast message */
  type?: ToastType;
  /** The title text displayed at the top of the toast */
  title: string;
  /** The main message content of the toast */
  message: string;
  /** Duration in milliseconds before the toast auto-dismisses. Set to 0 to disable auto-dismiss */
  duration?: number;
  /** Whether the toast can be manually dismissed via close button */
  dismissible?: boolean;
  /** Custom icon to override the default icon for the toast type */
  icon?: ReactNode;
  /** Position where the toast will appear */
  position?: ToastPosition;
  /** Callback function when toast is closed */
  onClose?: () => void;
  /** Additional CSS classes to apply to the toast */
  className?: string;
  /** Whether to show the progress bar */
  showProgress?: boolean;
  /** Configuration for an action button in the toast */
  action?: ToastAction;
}

export interface ToastContainerProps {
  /** Position where toasts will be rendered */
  position?: ToastPosition;
  /** Toast elements to render */
  children?: ReactNode;
}

export interface ToastContextValue {
  /** Function to show a new toast message */
  showToast: (props: Omit<ToastProps, "onClose">) => void;
}

export interface ToastProviderProps {
  /** React children elements */
  children: ReactNode;
  /** Default position for all toasts in this provider */
  position?: ToastPosition;
} 
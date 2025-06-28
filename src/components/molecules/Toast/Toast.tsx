import React, {
  useEffect,
  useCallback,
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";
import type { ReactElement } from "react";
import {
  ToastProps,
  ToastContextValue,
  ToastType,
  ToastContainerProps,
  ToastPosition,
} from "./toast.types";

// Create context for managing toasts
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Toast icons for different types
const ToastIcons: Record<ToastType, ReactElement> = {
  success: (
    <svg
      className="w-6 h-6 text-green-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  error: (
    <svg
      className="w-6 h-6 text-red-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  warning: (
    <svg
      className="w-6 h-6 text-yellow-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-6 h-6 text-blue-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

// Toast colors for different types
const toastColors: Record<ToastType, { bg: string; border: string }> = {
  success: { bg: "bg-success-50", border: "border-success-200" },
  error: { bg: "bg-error-50", border: "border-error-200" },
  warning: { bg: "bg-warning-50", border: "border-warning-200" },
  info: { bg: "bg-info-50", border: "border-info-200" },
};

const Toast: React.FC<ToastProps & { id: string }> = ({
  id,
  type = "info",
  title,
  message,
  duration = 5000,
  dismissible = true,
  icon,
  showProgress = true,
  action,
  onClose,
}) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  // Handle auto-dismiss
  useEffect(() => {
    if (!duration) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;

      if (newProgress <= 0) {
        handleClose();
      } else {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [duration]);

  // Handle close animation
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // Match this with CSS transition duration
  }, [onClose]);

  const colors = toastColors[type];

  return (
    <div
      role="alert"
      className={`
        ${colors.bg} border ${colors.border} rounded-lg shadow-lg
        transform transition-all duration-300 ease-in-out
        pointer-events-auto relative overflow-hidden
        min-w-[200px] max-w-full sm:min-w-[320px] sm:max-w-md
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
      data-testid={`toast-${type}`}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{icon || ToastIcons[type]}</div>
          <div className="ml-2 sm:ml-3 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">{message}</p>
            {action && (
              <div className="mt-2 sm:mt-3">
                <button
                  type="button"
                  onClick={action.onClick}
                  className="toast-action-button text-white focus:ring-2"
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>
          {dismissible && (
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="toast-close-button text-white focus:ring-2"
                onClick={handleClose}
                data-testid="toast-close-button"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        {showProgress && duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full transition-all duration-300 ease-linear"
              style={{
                width: `${progress}%`,
                backgroundColor: type === 'success' ? '#10B981' :
                  type === 'error' ? '#EF4444' :
                  type === 'warning' ? '#F59E0B' : '#3B82F6'
              }}
              data-testid="toast-progress"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Toast Container component
const ToastContainer: React.FC<ToastContainerProps> = ({
  position = "top-right",
  children,
}) => {
  const positionClasses: Record<ToastPosition, string> = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={`fixed z-50 p-4 flex gap-4 pointer-events-none ${positionClasses[position]}`}
      aria-live="assertive"
    >
      {children}
    </div>
  );
};

// Toast Provider component
interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastProps["position"];
}

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
}) => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const showToast = useCallback((props: Omit<ToastProps, "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((currentToasts) => [...currentToasts, { ...props, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  const contextValue = useMemo<ToastContextValue>(
    () => ({
    showToast,
    }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer position={position}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Export everything in a single export statement
export {
  Toast,
  ToastContainer,
  ToastProvider,
  useToast,
};

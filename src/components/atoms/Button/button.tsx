import React from 'react';
import { ButtonProps } from './button.types';
import '../../../styles/components/Button/button.css';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    small: 'text-xs sm:text-sm px-2.5 py-1.5 sm:px-3 sm:py-1.5',
    medium: 'text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2',
    large: 'text-base sm:text-lg px-4 py-2.5 sm:px-6 sm:py-3'
  };

  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    disabled ? 'btn-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {isLoading && (
        <svg
          data-testid="loading-spinner"
          className="animate-spin ml-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
    </button>
  );
}; 
import React, { useState } from "react";
import { InputProps } from "./input.types";
import classNames from 'classnames';
import '../../../styles/components/Input/input.css';

export const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  helperText,
  error,
  icon,
  iconPosition = "left",
  showPasswordToggle = true,
  isLoading = false,
  className = "",
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Password toggle icon
  const PasswordToggleIcon = () => (
    <button
      type="button"
      className="input-password-toggle-button"
      onClick={togglePasswordVisibility}
      aria-label={showPassword ? "Hide password" : "Show password"}
      aria-pressed={showPassword}
    >
      {showPassword ? (
        // Hide password icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="input-icon-size"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      ) : (
        // Show password icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="input-icon-size"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )}
    </button>
  );

  // Loading spinner
  const LoadingSpinner = () => (
    <div data-testid="loading-spinner">
      <svg
        className="input-spinner"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
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
    </div>
  );

  // Combine classes
  const inputWrapperClasses = classNames(
    'input-wrapper',
    {
      'input-has-error': error,
      'input-has-left-icon': leftIcon,
      'input-has-right-icon': rightIcon,
    },
    className
  );

  const inputClasses = classNames('input', {
    'input-error': error,
    'pl-10': leftIcon,
    'pr-10': rightIcon,
    'input-normal': !error,
    'input-disabled': disabled || isLoading,
    'input-password-toggle': type === "password" && showPasswordToggle && !isLoading,
    'text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3 sm:py-2': true,
  });

  return (
    <div className={inputWrapperClasses}>
      {label && (
        <label className="input-label" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-testid="test-icon">
            {React.cloneElement(leftIcon, { "aria-hidden": "true" })}
          </div>
        )}
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          disabled={disabled || isLoading}
          className={inputClasses}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            (error || helperText) && (props.id || props.name)
              ? `${props.id || props.name}-help`
              : undefined
          }
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" data-testid="test-icon">
            {React.cloneElement(rightIcon, { "aria-hidden": "true" })}
          </div>
        )}
        {type === "password" && showPasswordToggle && !isLoading && (
          <PasswordToggleIcon />
        )}
        {isLoading && <LoadingSpinner />}
      </div>
      {(helperText || error) && (
        <p
          className={`input-helper-text ${
            error ? "input-helper-text-error" : "input-helper-text-normal"
          }`}
          id={`${props.id || props.name}-help`}
          role={error ? "alert" : "status"}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

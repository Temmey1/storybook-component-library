export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * The type of input field
   * @default 'text'
   */
  type?: InputType;

  /**
   * Label for the input field
   * Will be connected to the input via htmlFor/id for accessibility
   */
  label?: string;

  /**
   * Helper text to be displayed below the input
   * Will be announced by screen readers via aria-describedby
   */
  helperText?: string;

  /**
   * Error message to be displayed
   * Will be announced by screen readers via aria-describedby and role="alert"
   */
  error?: string;

  /**
   * Icon to be displayed inside the input
   * Will be marked as aria-hidden="true" as it's decorative
   */
  icon?: React.ReactNode;

  /**
   * Whether to show password toggle button (only for password type)
   * Button will have proper aria-label and aria-pressed states
   * @default true
   */
  showPasswordToggle?: boolean;

  /**
   * The position of the icon
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';

  /**
   * Whether the input is in a loading state
   * Will disable the input and show a loading spinner
   * @default false
   */
  isLoading?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} 
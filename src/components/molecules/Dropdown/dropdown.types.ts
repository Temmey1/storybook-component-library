import { ReactNode } from "react";

export type DropdownSize = "sm" | "md" | "lg";

export interface DropdownOption {
  /** Unique value for the option */
  value: string;
  /** Display text for the option */
  label: string;
  /** Optional description text shown below the label */
  description?: string;
  /** Optional icon component to display before the label */
  icon?: ReactNode;
  /** Whether the option is disabled/unselectable */
  disabled?: boolean;
  /** Optional CSS classes to apply to the option */
  className?: string;
}

export interface DropdownProps {
  /** Array of options to display in the dropdown */
  options: DropdownOption[];
  /** Currently selected value */
  value?: string;
  /** 
   * Callback fired when selection changes.
   * @param value The selected option value
   */
  onChange: (value: string) => void;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Label text displayed above the dropdown */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the dropdown */
  helperText?: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Size variant of the dropdown */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to enable search functionality */
  searchable?: boolean;
  /** Maximum height of the dropdown menu in pixels */
  maxHeight?: number;
  /** Custom width of the dropdown */
  width?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to position the dropdown above the button */
  dropUp?: boolean;
  /** Message to show when no options match the search */
  noOptionsMessage?: string;
} 
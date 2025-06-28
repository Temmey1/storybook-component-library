export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: ButtonSize;
  
  /**
   * Whether the button should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Optional icon to be displayed before the button text
   */
  icon?: React.ReactNode;
  
  /**
   * The content of the button
   */
  children: React.ReactNode;
} 
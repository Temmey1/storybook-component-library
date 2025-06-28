export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarData {
  /** URL of the avatar image */
  src?: string;
  /** Alternative text for the avatar image */
  alt?: string;
  /** User's name - used to generate initials */
  name: string;
  /** Status indicator */
  status?: AvatarStatus;
}

export interface AvatarProps {
  /** URL of the avatar image */
  src?: string;
  /** Alternative text for the avatar image - required for accessibility */
  alt?: string;
  /** User's name - used to generate initials and background color if no image */
  name?: string;
  /** Size of the avatar component */
  size?: AvatarSize;
  /** Shape of the avatar */
  shape?: AvatarShape;
  /** Custom background color class (e.g. "bg-blue-800") - must meet WCAG AA contrast requirements */
  backgroundColor?: string;
  /** Whether the avatar has a border */
  bordered?: boolean;
  /** Status indicator */
  status?: AvatarStatus;
  /** Additional CSS classes */
  className?: string;
  /** Error handler for image load failures */
  onError?: () => void;
  /** Text color for initials - defaults to #ffffff for WCAG AA compliance */
  textColor?: string;
  /** Array of avatars for group display */
  group?: AvatarData[];
  /** Maximum number of avatars to show in group */
  maxGroupSize?: number;
  /** Overlap amount for grouped avatars in pixels */
  groupOverlap?: number;
} 
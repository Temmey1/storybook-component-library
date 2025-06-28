import { ReactNode } from "react";

export interface CardProps {
  /** Enable hover effect on the card */
  hoverable?: boolean;
  /** Add border to the card */
  bordered?: boolean;
  /** Add shadow to the card */
  shadowed?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Card content */
  children: ReactNode;
}

export interface CardHeaderProps {
  /** Background image URL */
  image?: string;
  /** Alt text for background image */
  imageAlt?: string;
  /** Add border to the header */
  bordered?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Header content */
  children: ReactNode;
}

export interface CardBodyProps {
  /** Additional CSS classes */
  className?: string;
  /** Body content */
  children: ReactNode;
}

export interface CardFooterProps {
  /** Add border to the footer */
  bordered?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Footer content */
  children: ReactNode;
}

export interface MilestoneItem {
  /** Name of the milestone */
  name: string;
  /** Date of the milestone */
  date: string;
  /** Status of the milestone */
  status: "Completed" | "In Progress" | "Pending";
}

export interface MetricCardProps extends Omit<CardProps, 'children'> {
  /** Title of the metric */
  title: string;
  /** Current value */
  value: number | string;
  /** Previous value for comparison */
  previousValue?: number | string;
  /** Target value */
  target?: number | string;
  /** Progress percentage */
  progress?: number;
  /** Icon element */
  icon?: ReactNode;
  /** Optional children */
  children?: ReactNode;
}

export interface FeatureCardProps extends Omit<CardProps, 'children'> {
  /** Title of the feature */
  title: string;
  /** Feature description */
  description: string;
  /** List of features */
  features: string[];
  /** Icon element */
  icon?: ReactNode;
  /** Call to action text */
  ctaText?: string;
  /** Call to action handler */
  onCtaClick?: () => void;
  /** Optional children */
  children?: ReactNode;
} 
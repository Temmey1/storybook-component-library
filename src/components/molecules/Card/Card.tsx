import React, { forwardRef } from "react";
import classNames from "classnames";
import {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  MetricCardProps,
  FeatureCardProps,
} from "./card.types";

interface CardComponent
  extends React.ForwardRefExoticComponent<
    CardProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: React.ForwardRefExoticComponent<
    CardHeaderProps & React.RefAttributes<HTMLDivElement>
  >;
  Body: React.ForwardRefExoticComponent<
    CardBodyProps & React.RefAttributes<HTMLDivElement>
  >;
  Footer: React.ForwardRefExoticComponent<
    CardFooterProps & React.RefAttributes<HTMLDivElement>
  >;
  Metric: React.ForwardRefExoticComponent<
    MetricCardProps & React.RefAttributes<HTMLDivElement>
  >;
  Feature: React.ForwardRefExoticComponent<
    FeatureCardProps & React.RefAttributes<HTMLDivElement>
  >;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  hoverable = false,
  bordered = false,
  shadowed = true,
  className,
  children,
  ...props
}, ref) => {
  const cardClasses = classNames(
    "bg-white rounded-lg overflow-hidden",
    {
      "hover:shadow-lg transition-shadow duration-200": hoverable,
      "border border-gray-200": bordered,
      "shadow-md": shadowed,
      "w-full max-w-full sm:max-w-md md:max-w-lg mx-auto": true,
    },
    className
  );

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {children}
    </div>
  );
}) as CardComponent;

const Header = forwardRef<HTMLDivElement, CardHeaderProps>(({
  image,
  imageAlt,
  bordered,
  className,
  children,
  ...props
}, ref) => {
  const headerClasses = classNames(
    "relative",
    {
      "border-b border-gray-200": bordered,
      "p-4 sm:p-6": !image,
      "p-4 sm:p-6 min-h-[120px] sm:min-h-[200px] flex flex-col justify-end bg-cover bg-center": image,
    },
    className
  );

  return (
    <div
      ref={ref}
      className={headerClasses}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
      role={image ? "img" : undefined}
      aria-label={imageAlt}
      {...props}
    >
      {image && <div className="absolute inset-0 bg-black/40" />}
      <div className={image ? "relative z-10" : undefined}>{children}</div>
    </div>
  );
});

const Body = forwardRef<HTMLDivElement, CardBodyProps>(({
  className,
  children,
  ...props
}, ref) => {
  const bodyClasses = classNames("p-4 sm:p-6", className);

  return (
    <div ref={ref} className={bodyClasses} {...props}>
      {children}
    </div>
  );
});

const Footer = forwardRef<HTMLDivElement, CardFooterProps>(({
  bordered,
  className,
  children,
  ...props
}, ref) => {
  const footerClasses = classNames(
    "p-4 sm:p-6",
    {
      "border-t border-gray-200": bordered,
    },
    className
  );

  return (
    <div ref={ref} className={footerClasses} {...props}>
      {children}
    </div>
  );
});

// Metric Card Component
const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(({
  title,
  value,
  previousValue,
  target,
  progress,
  icon,
  ...cardProps
}, ref) => {
  return (
    <Card {...cardProps} ref={ref}>
      <Body>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {icon && <div className="p-2 bg-indigo-100 rounded-lg">{icon}</div>}
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            {previousValue && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {previousValue}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {target && (
                <p className="ml-2 text-sm font-medium text-gray-500">
                  vs target: {target}
                </p>
              )}
            </div>
            {progress !== undefined && (
              <div className="mt-4">
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-indigo-600 rounded-full"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-label={`${title} progress`}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Body>
    </Card>
  );
});

// Feature Card Component
const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(({
  title,
  description,
  features,
  icon,
  ctaText,
  onCtaClick,
  ...cardProps
}, ref) => {
  return (
    <Card {...cardProps} ref={ref}>
      <Body>
        <div className="space-y-4">
          {icon && (
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-base text-gray-600">{description}</p>
          </div>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Body>
      {(ctaText || onCtaClick) && (
        <Footer bordered>
          <div className="flex justify-end">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {ctaText}
            </button>
          </div>
        </Footer>
      )}
    </Card>
  );
});

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
Card.Metric = MetricCard;
Card.Feature = FeatureCard;

export { Card };

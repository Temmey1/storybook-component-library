import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./Card";
import { describe, it, expect, vi } from 'vitest';

describe("Card", () => {
  describe("Basic Card", () => {
    it("renders children correctly", () => {
      render(
        <Card>
          <Card.Body>Test Content</Card.Body>
        </Card>
      );
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies hover effect when hoverable is true", () => {
      const { container } = render(
        <Card hoverable>
          <Card.Body>Hover Card</Card.Body>
        </Card>
      );
      expect(container.firstChild).toHaveClass("hover:shadow-lg");
    });

    it("applies border when bordered is true", () => {
      const { container } = render(
        <Card bordered>
          <Card.Body>Bordered Card</Card.Body>
        </Card>
      );
      expect(container.firstChild).toHaveClass("border", "border-gray-200");
    });

    it("applies shadow when shadowed is true", () => {
      const { container } = render(
        <Card shadowed>
          <Card.Body>Shadowed Card</Card.Body>
        </Card>
      );
      expect(container.firstChild).toHaveClass("shadow-md");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card ref={ref}>
          <Card.Body>Ref Test</Card.Body>
        </Card>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("applies custom className correctly", () => {
      const { container } = render(
        <Card className="custom-class">
          <Card.Body>Custom Class</Card.Body>
        </Card>
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("combines multiple props correctly", () => {
      const { container } = render(
        <Card hoverable bordered shadowed className="custom-class">
          <Card.Body>Combined Props</Card.Body>
        </Card>
      );
      expect(container.firstChild).toHaveClass(
        "hover:shadow-lg",
        "border",
        "border-gray-200",
        "shadow-md",
        "custom-class"
      );
    });
  });

  describe("Card.Body", () => {
    it("renders with default padding", () => {
      const { container } = render(
        <Card.Body>Body Content</Card.Body>
      );
      expect(container.firstChild).toHaveClass("p-6");
    });

    it("applies custom className to body", () => {
      const { container } = render(
        <Card.Body className="custom-body">Body Content</Card.Body>
      );
      expect(container.firstChild).toHaveClass("custom-body", "p-6");
    });

    it("renders nested content correctly", () => {
      render(
        <Card.Body>
          <div data-testid="nested">
            <span>Nested Content</span>
          </div>
        </Card.Body>
      );
      expect(screen.getByTestId("nested")).toBeInTheDocument();
      expect(screen.getByText("Nested Content")).toBeInTheDocument();
    });
  });

  describe("Card.Header", () => {
    it("renders with image background", () => {
      render(
        <Card>
          <Card.Header
            image="test-image.jpg"
            imageAlt="Test background"
          >
          Header Content
        </Card.Header>
        </Card>
      );
      const header = screen.getByRole("img");
      expect(header).toHaveStyle({ backgroundImage: 'url(test-image.jpg)' });
      expect(header).toHaveAttribute("aria-label", "Test background");
    });

    it("renders with border when bordered prop is true", () => {
      const { container } = render(
        <Card>
          <Card.Header bordered>Header Content</Card.Header>
        </Card>
      );
      const header = container.querySelector(".border-b");
      expect(header).toBeInTheDocument();
    });

    it("applies correct classes for image header", () => {
      const { container } = render(
        <Card>
          <Card.Header
            image="test-image.jpg"
            imageAlt="Test"
            className="custom-header"
          >
            Content
          </Card.Header>
        </Card>
      );
      expect(container.firstChild).toHaveClass(
        "min-h-[200px]",
        "flex",
        "flex-col",
        "justify-end",
        "bg-cover",
        "bg-center",
        "custom-header"
      );
    });

    it("renders overlay for image header", () => {
      const { container } = render(
        <Card>
          <Card.Header image="test-image.jpg" imageAlt="Test">
            Content
          </Card.Header>
        </Card>
      );
      expect(container.querySelector(".bg-black\\/40")).toBeInTheDocument();
    });

    it("renders without image correctly", () => {
      render(
        <Card>
          <Card.Header>
            <h2>Simple Header</h2>
          </Card.Header>
        </Card>
      );
      expect(screen.getByText("Simple Header")).toBeInTheDocument();
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("handles undefined image and imageAlt", () => {
      render(
        <Card>
          <Card.Header image={undefined} imageAlt={undefined}>
            Content
          </Card.Header>
        </Card>
      );
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("renders children with proper z-index when image is present", () => {
      render(
        <Card>
          <Card.Header image="test.jpg" imageAlt="test">
            <div data-testid="content">Content</div>
          </Card.Header>
        </Card>
      );
      expect(screen.getByTestId("content").parentElement).toHaveClass("relative z-10");
    });
  });

  describe("Card.Metric", () => {
    const mockMetricProps = {
      title: "Test Metric",
      value: "85%",
      previousValue: "+5%",
      target: "90%",
      progress: 85,
    };

    it("renders metric card with all props and proper accessibility attributes", () => {
      render(<Card.Metric {...mockMetricProps} />);
      
      expect(screen.getByText("Test Metric")).toBeInTheDocument();
      expect(screen.getByText("85%")).toBeInTheDocument();
      expect(screen.getByText("+5%")).toBeInTheDocument();
      
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "85");
      expect(progressBar).toHaveAttribute("aria-valuemin", "0");
      expect(progressBar).toHaveAttribute("aria-valuemax", "100");
      expect(progressBar).toHaveAttribute("aria-label", "Test Metric progress");
      expect(progressBar).toHaveStyle({ width: "85%" });
    });

    it("renders metric card without optional props", () => {
      render(<Card.Metric title="Simple Metric" value="100" />);
      
      expect(screen.getByText("Simple Metric")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    it("renders with icon correctly", () => {
      const icon = <svg data-testid="test-icon" />;
      render(
        <Card.Metric
          title="Icon Metric"
          value="100"
          icon={icon}
        />
      );
      
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByTestId("test-icon").parentElement).toHaveClass("bg-indigo-100");
    });

    it("handles zero progress value correctly", () => {
      render(
        <Card.Metric
          title="Zero Progress"
          value="0%"
          progress={0}
        />
      );
      
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveStyle({ width: "0%" });
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");
    });

    it("handles undefined progress correctly", () => {
      render(
        <Card.Metric
          title="No Progress"
          value="100"
          progress={undefined}
        />
      );
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    it("renders target value correctly", () => {
      render(
        <Card.Metric
          title="With Target"
          value="75"
          target="100"
        />
      );
      expect(screen.getByText("vs target: 100")).toBeInTheDocument();
    });

    it("spreads additional card props correctly", () => {
      const { container } = render(
        <Card.Metric
          title="Custom Card"
          value="100"
          hoverable
          bordered
          className="custom-metric"
        />
      );
      expect(container.firstChild).toHaveClass(
        "hover:shadow-lg",
        "border",
        "border-gray-200",
        "custom-metric"
      );
    });

    it("renders previous value with correct styles", () => {
      render(
        <Card.Metric
          title="Growth"
          value="100"
          previousValue="+20%"
        />
      );
      const badge = screen.getByText("+20%");
      expect(badge).toHaveClass(
        "bg-green-100",
        "text-green-800",
        "rounded-full"
      );
    });
  });

  describe("Card.Feature", () => {
    const mockFeatureProps = {
      title: "Test Feature",
      description: "Feature description",
      features: ["Feature 1", "Feature 2"],
      ctaText: "Get Started",
      onCtaClick: vi.fn(),
    };

    it("renders feature card with all props", () => {
      render(<Card.Feature {...mockFeatureProps} />);
      
      expect(screen.getByText("Test Feature")).toBeInTheDocument();
      expect(screen.getByText("Feature description")).toBeInTheDocument();
      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 2")).toBeInTheDocument();
      
      const button = screen.getByText("Get Started");
      fireEvent.click(button);
      expect(mockFeatureProps.onCtaClick).toHaveBeenCalled();
    });

    it("renders feature card without CTA", () => {
      const { ctaText, onCtaClick, ...props } = mockFeatureProps;
      render(<Card.Feature {...props} />);
      
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders with icon correctly", () => {
      const icon = <svg data-testid="feature-icon" />;
      render(
        <Card.Feature
          {...mockFeatureProps}
          icon={icon}
        />
      );
      
      expect(screen.getByTestId("feature-icon")).toBeInTheDocument();
      expect(screen.getByTestId("feature-icon").parentElement).toHaveClass(
        "bg-gradient-to-br",
        "from-purple-100",
        "to-indigo-100"
      );
    });

    it("renders feature list with check icons", () => {
      render(<Card.Feature {...mockFeatureProps} />);
      
      const checkIcons = document.querySelectorAll(".text-green-700");
      expect(checkIcons).toHaveLength(mockFeatureProps.features.length);
    });

    it("handles empty features array", () => {
      render(
        <Card.Feature
          {...mockFeatureProps}
          features={[]}
        />
      );
      
      expect(screen.queryByRole("list")).toBeInTheDocument();
      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    });

    it("applies proper button styles and accessibility", () => {
      render(<Card.Feature {...mockFeatureProps} />);
      
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "focus:outline-none",
        "focus:ring-2"
      );
    });

    it("spreads additional card props correctly", () => {
      const { container } = render(
        <Card.Feature
          title="Custom Feature"
          description="Description"
          features={["Feature 1"]}
          hoverable
          bordered
          className="custom-feature"
        />
      );
      expect(container.firstChild).toHaveClass(
        "hover:shadow-lg",
        "border",
        "border-gray-200",
        "custom-feature"
      );
    });

    it("renders description with correct styles", () => {
      render(
        <Card.Feature
          title="Test"
          description="Test Description"
          features={[]}
        />
      );
      const description = screen.getByText("Test Description");
      expect(description).toHaveClass("text-base", "text-gray-600");
    });

    it("renders title with correct styles", () => {
      render(
        <Card.Feature
          title="Test Title"
          description="Description"
          features={[]}
        />
      );
      const title = screen.getByText("Test Title");
      expect(title).toHaveClass("text-xl", "font-semibold", "text-gray-900");
    });

    it("handles CTA button without onCtaClick", () => {
      render(
        <Card.Feature
          title="Test"
          description="Description"
          features={[]}
          ctaText="Click Me"
        />
      );
      const button = screen.getByText("Click Me");
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "focus:ring-2"
      );
    });

    it("handles onCtaClick without ctaText", () => {
      const onCtaClick = vi.fn();
      render(
        <Card.Feature
          title="Test"
          description="Description"
          features={[]}
          onCtaClick={onCtaClick}
        />
      );
      expect(screen.queryByRole("button")).toBeInTheDocument();
    });
  });

  describe("Card.Footer", () => {
    it("renders with default padding", () => {
      const { container } = render(
        <Card.Footer>Footer Content</Card.Footer>
      );
      expect(container.firstChild).toHaveClass("p-6");
    });

    it("applies border when bordered prop is true", () => {
      const { container } = render(
        <Card.Footer bordered>Footer Content</Card.Footer>
      );
      expect(container.firstChild).toHaveClass("border-t", "border-gray-200");
    });

    it("applies custom className to footer", () => {
      const { container } = render(
        <Card.Footer className="custom-footer">Footer Content</Card.Footer>
      );
      expect(container.firstChild).toHaveClass("custom-footer", "p-6");
    });

    it("renders nested content correctly", () => {
      render(
        <Card.Footer>
          <div data-testid="nested">
            <span>Nested Footer Content</span>
          </div>
        </Card.Footer>
      );
      expect(screen.getByTestId("nested")).toBeInTheDocument();
      expect(screen.getByText("Nested Footer Content")).toBeInTheDocument();
    });
  });

  describe("Card.Metric Additional Tests", () => {
    it("handles negative previous value with red styling", () => {
      render(
        <Card.Metric
          title="Negative Growth"
          value="80%"
          previousValue="-10%"
        />
      );
      const badge = screen.getByText("-10%");
      expect(badge).toHaveClass(
        "bg-red-100",
        "text-red-800",
        "rounded-full"
      );
    });

    it("handles zero previous value with neutral styling", () => {
      render(
        <Card.Metric
          title="No Growth"
          value="100"
          previousValue="0%"
        />
      );
      const badge = screen.getByText("0%");
      expect(badge).toHaveClass(
        "bg-gray-100",
        "text-gray-800",
        "rounded-full"
      );
    });
  });

  describe("Card.Feature Keyboard Navigation", () => {
    it("handles keyboard navigation on CTA button", () => {
      const onCtaClick = vi.fn();
      render(
        <Card.Feature
          title="Keyboard Nav"
          description="Test keyboard navigation"
          features={["Feature 1"]}
          ctaText="Click Me"
          onCtaClick={onCtaClick}
        />
      );
      
      const button = screen.getByRole("button");
      button.focus();
      expect(document.activeElement).toBe(button);
      
      fireEvent.keyDown(button, { key: "Enter" });
      expect(onCtaClick).toHaveBeenCalled();
      
      fireEvent.keyDown(button, { key: " " });
      expect(onCtaClick).toHaveBeenCalledTimes(2);
    });

    it("maintains focus ring on keyboard navigation", () => {
      render(
        <Card.Feature
          title="Focus Test"
          description="Test focus styles"
          features={["Feature 1"]}
          ctaText="Click Me"
        />
      );
      
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveClass("focus:ring-2", "focus:ring-offset-2");
    });
  });

  describe("Milestone Rendering", () => {
    const mockMilestones = [
      { name: "Planning", date: "2024-03-01", status: "Completed" as const },
      { name: "Development", date: "2024-03-15", status: "In Progress" as const },
      { name: "Testing", date: "2024-03-30", status: "Pending" as const }
    ];

    it("renders milestone items with correct status indicators", () => {
      render(
        <Card>
          <Card.Body>
            <div className="space-y-4">
              {mockMilestones.map((milestone) => (
                <div key={milestone.name} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <svg
                      className={`w-5 h-5 ${
                        milestone.status === "Completed"
                          ? "text-green-700"
                          : milestone.status === "In Progress"
                          ? "text-blue-700"
                          : "text-gray-500"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {milestone.status === "Completed" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      )}
                      {milestone.status === "In Progress" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                      {milestone.status === "Pending" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      )}
                    </svg>
                    <span className="text-gray-900">{milestone.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{milestone.date}</span>
                    <span
                      className={`text-sm ${
                        milestone.status === "Completed"
                          ? "text-green-700"
                          : milestone.status === "In Progress"
                          ? "text-blue-700"
                          : "text-gray-500"
                      }`}
                    >
                      {milestone.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      );

      // Verify milestone rendering
      mockMilestones.forEach((milestone) => {
        expect(screen.getByText(milestone.name)).toBeInTheDocument();
        expect(screen.getByText(milestone.date)).toBeInTheDocument();
        expect(screen.getByText(milestone.status)).toBeInTheDocument();
      });

      // Verify status colors
      const completedStatus = screen.getByText("Completed");
      const inProgressStatus = screen.getByText("In Progress");
      const pendingStatus = screen.getByText("Pending");

      expect(completedStatus).toHaveClass("text-green-700");
      expect(inProgressStatus).toHaveClass("text-blue-700");
      expect(pendingStatus).toHaveClass("text-gray-500");
    });

    it("handles empty milestone list", () => {
      render(
        <Card>
          <Card.Body>
            <div className="space-y-4">
              {([] as Array<{ name: string }>).map((milestone) => (
                <div key={milestone.name}>Milestone</div>
              ))}
            </div>
          </Card.Body>
        </Card>
      );
      
      const body = screen.getByRole("generic");
      expect(body).toBeEmptyDOMElement();
    });
  });

  describe("Props Spreading", () => {
    it("spreads additional props to Card root element", () => {
      render(
        <Card data-testid="custom-card" aria-label="Custom Card">
          <Card.Body>Content</Card.Body>
        </Card>
      );
      const card = screen.getByTestId("custom-card");
      expect(card).toHaveAttribute("aria-label", "Custom Card");
    });

    it("spreads additional props to Card.Body", () => {
      render(
        <Card.Body data-testid="custom-body" aria-label="Custom Body">
          Content
        </Card.Body>
      );
      const body = screen.getByTestId("custom-body");
      expect(body).toHaveAttribute("aria-label", "Custom Body");
    });

    it("spreads additional props to Card.Footer", () => {
      render(
        <Card.Footer data-testid="custom-footer" aria-label="Custom Footer">
          Content
        </Card.Footer>
      );
      const footer = screen.getByTestId("custom-footer");
      expect(footer).toHaveAttribute("aria-label", "Custom Footer");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children in all components", () => {
      const { container } = render(
        <Card>
          <Card.Header>{null}</Card.Header>
          <Card.Body>{null}</Card.Body>
          <Card.Footer>{null}</Card.Footer>
        </Card>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles boolean false children", () => {
      render(
        <Card>
          {false}
          <Card.Body>Content</Card.Body>
        </Card>
      );
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("handles null children", () => {
      render(
        <Card>
          {null}
          <Card.Body>Content</Card.Body>
        </Card>
      );
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Optional Children", () => {
    it("renders MetricCard with optional children", () => {
      render(
        <Card.Metric
          title="Test"
          value="100"
        >
          <div data-testid="custom-content">Custom Content</div>
        </Card.Metric>
      );
      expect(screen.getByTestId("custom-content")).toBeInTheDocument();
    });

    it("renders FeatureCard with optional children", () => {
      render(
        <Card.Feature
          title="Test"
          description="Description"
          features={["Feature 1"]}
        >
          <div data-testid="custom-content">Custom Content</div>
        </Card.Feature>
      );
      expect(screen.getByTestId("custom-content")).toBeInTheDocument();
    });
  });

  describe("Type Combinations", () => {
    it("handles all MetricCard prop combinations", () => {
      const { container } = render(
        <Card.Metric
          title="Full Props"
          value={100}
          previousValue={90}
          target={110}
          progress={75}
          icon={<div data-testid="metric-icon" />}
          hoverable
          bordered
          shadowed
          className="custom-class"
        >
          <div>Extra Content</div>
        </Card.Metric>
      );

      expect(screen.getByTestId("metric-icon")).toBeInTheDocument();
      expect(screen.getByText("Full Props")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("90")).toBeInTheDocument();
      expect(screen.getByText("vs target: 110")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toHaveStyle({ width: "75%" });
      expect(container.firstChild).toHaveClass(
        "hover:shadow-lg",
        "border",
        "border-gray-200",
        "shadow-md",
        "custom-class"
      );
    });

    it("handles all FeatureCard prop combinations", () => {
      const onCtaClick = vi.fn();
      const { container } = render(
        <Card.Feature
          title="Full Feature"
          description="Complete description"
          features={["Feature 1", "Feature 2"]}
          icon={<div data-testid="feature-icon" />}
          ctaText="Click Me"
          onCtaClick={onCtaClick}
          hoverable
          bordered
          shadowed
          className="custom-class"
        >
          <div>Extra Content</div>
        </Card.Feature>
      );

      expect(screen.getByTestId("feature-icon")).toBeInTheDocument();
      expect(screen.getByText("Full Feature")).toBeInTheDocument();
      expect(screen.getByText("Complete description")).toBeInTheDocument();
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
      expect(screen.getByText("Click Me")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass(
        "hover:shadow-lg",
        "border",
        "border-gray-200",
        "shadow-md",
        "custom-class"
      );

      fireEvent.click(screen.getByText("Click Me"));
      expect(onCtaClick).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("provides proper ARIA attributes for MetricCard progress", () => {
      render(
        <Card.Metric
          title="Accessible Metric"
          value="75%"
          progress={75}
        />
      );
      
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-label", "Accessible Metric progress");
      expect(progressBar).toHaveAttribute("aria-valuenow", "75");
      expect(progressBar).toHaveAttribute("aria-valuemin", "0");
      expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    });

    it("ensures proper heading hierarchy", () => {
      render(
        <Card.Feature
          title="Accessible Feature"
          description="Description"
          features={["Feature 1"]}
        />
      );
      
      const heading = screen.getByText("Accessible Feature");
      expect(heading.tagName).toBe("H3");
      expect(heading).toHaveClass("text-xl", "font-semibold");
    });

    it("provides proper button accessibility", () => {
      render(
        <Card.Feature
          title="Test"
          description="Description"
          features={[]}
          ctaText="Accessible Button"
        />
      );
      
      const button = screen.getByRole("button", { name: "Accessible Button" });
      expect(button).toHaveClass(
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to MetricCard root element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card.Metric
          ref={ref}
          title="Test Metric"
          value="100"
        />
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass("bg-white", "rounded-lg");
    });

    it("forwards ref to FeatureCard root element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card.Feature
          ref={ref}
          title="Test Feature"
          description="Description"
          features={["Feature 1"]}
        />
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass("bg-white", "rounded-lg");
    });
  });

  describe("Advanced Props and Edge Cases", () => {
    it("handles dynamic class names based on props", () => {
      const { container, rerender } = render(
        <Card hoverable={false} bordered={false} shadowed={false}>
          <Card.Body>Content</Card.Body>
        </Card>
      );
      expect(container.firstChild).not.toHaveClass(
        "hover:shadow-lg",
        "border",
        "border-gray-200",
        "shadow-md"
      );

      rerender(
        <Card hoverable bordered shadowed>
          <Card.Body>Content</Card.Body>
        </Card>
      );
      expect(container.firstChild).toHaveClass(
        "hover:shadow-lg",
        "border",
        "border-gray-200",
        "shadow-md"
      );
    });

    it("handles undefined className prop", () => {
      const { container } = render(
        <Card className={undefined}>
          <Card.Body>Content</Card.Body>
        </Card>
      );
      expect(container.firstChild).toHaveClass("bg-white", "rounded-lg", "overflow-hidden");
    });

    it("preserves data-* attributes on all components", () => {
      render(
        <Card data-testid="root" data-custom="value">
          <Card.Header data-header="test">Header</Card.Header>
          <Card.Body data-body="test">Body</Card.Body>
          <Card.Footer data-footer="test">Footer</Card.Footer>
        </Card>
      );

      expect(screen.getByTestId("root")).toHaveAttribute("data-custom", "value");
      expect(screen.getByText("Header")).toHaveAttribute("data-header", "test");
      expect(screen.getByText("Body")).toHaveAttribute("data-body", "test");
      expect(screen.getByText("Footer")).toHaveAttribute("data-footer", "test");
    });
  });

  describe("MetricCard Advanced Tests", () => {
    it("handles children prop with progress bar", () => {
      render(
        <Card.Metric
          title="Test"
          value="100"
          progress={50}
        >
          <div data-testid="custom-child">Custom Child</div>
        </Card.Metric>
      );
      
      expect(screen.getByTestId("custom-child")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("applies correct styles for different previousValue types", () => {
      const { rerender } = render(
        <Card.Metric
          title="Test"
          value="100"
          previousValue={10}
        />
      );
      expect(screen.getByText("10")).toHaveClass("bg-green-100", "text-green-800");

      rerender(
        <Card.Metric
          title="Test"
          value="100"
          previousValue="-10"
        />
      );
      expect(screen.getByText("-10")).toHaveClass("bg-red-100", "text-red-800");
    });

    it("handles non-numeric progress values", () => {
      render(
        <Card.Metric
          title="Test"
          value="100"
          progress={NaN}
        />
      );
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  describe("FeatureCard Advanced Tests", () => {
    it("handles feature items with special characters", () => {
      render(
        <Card.Feature
          title="Test"
          description="Description"
          features={["Feature & Special", "Feature < >", "Feature & quot"]}
        />
      );
      
      expect(screen.getByText("Feature & Special")).toBeInTheDocument();
      expect(screen.getByText("Feature < >")).toBeInTheDocument();
      expect(screen.getByText("Feature & quot")).toBeInTheDocument();
    });

    it("applies correct styles to CTA button states", () => {
      const { container } = render(
        <Card.Feature
          title="Test"
          description="Description"
          features={["Feature 1"]}
          ctaText="Click Me"
        />
      );
      
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-indigo-500"
      );
    });

    it("handles empty strings in features array", () => {
      render(
        <Card.Feature
          title="Test"
          description="Description"
          features={["", " ", "\n", "\t"]}
        />
      );
      
      const items = screen.getAllByRole("listitem");
      expect(items).toHaveLength(4);
      items.forEach(item => {
        expect(item.textContent?.trim()).toBe("");
        expect(item.querySelector("svg")).toBeInTheDocument();
      });
    });
  });

  describe("Nested Component Combinations", () => {
    it("renders deeply nested card structure", () => {
      render(
        <Card>
          <Card.Header>
            <Card>
              <Card.Body>Nested Card</Card.Body>
            </Card>
          </Card.Header>
          <Card.Body>
            <Card.Metric
              title="Nested Metric"
              value="100"
            />
          </Card.Body>
          <Card.Footer>
            <Card.Feature
              title="Nested Feature"
              description="Description"
              features={["Feature 1"]}
            />
          </Card.Footer>
        </Card>
      );

      expect(screen.getByText("Nested Card")).toBeInTheDocument();
      expect(screen.getByText("Nested Metric")).toBeInTheDocument();
      expect(screen.getByText("Nested Feature")).toBeInTheDocument();
    });

    it("handles multiple header, body, footer combinations", () => {
      render(
        <Card>
          <Card.Header>Header 1</Card.Header>
          <Card.Header>Header 2</Card.Header>
          <Card.Body>Body 1</Card.Body>
          <Card.Body>Body 2</Card.Body>
          <Card.Footer>Footer 1</Card.Footer>
          <Card.Footer>Footer 2</Card.Footer>
        </Card>
      );

      expect(screen.getByText("Header 1")).toBeInTheDocument();
      expect(screen.getByText("Header 2")).toBeInTheDocument();
      expect(screen.getByText("Body 1")).toBeInTheDocument();
      expect(screen.getByText("Body 2")).toBeInTheDocument();
      expect(screen.getByText("Footer 1")).toBeInTheDocument();
      expect(screen.getByText("Footer 2")).toBeInTheDocument();
    });
  });

  describe("MetricCard Edge Cases and Styling", () => {
    it("applies different styles based on previousValue sign", () => {
      const { rerender } = render(
        <Card.Metric
          title="Growth"
          value="100"
          previousValue="+15%"
        />
      );
      expect(screen.getByText("+15%")).toHaveClass("bg-green-100", "text-green-800");

      rerender(
        <Card.Metric
          title="Growth"
          value="100"
          previousValue="-15%"
        />
      );
      expect(screen.getByText("-15%")).toHaveClass("bg-red-100", "text-red-800");

      rerender(
        <Card.Metric
          title="Growth"
          value="100"
          previousValue="0%"
        />
      );
      expect(screen.getByText("0%")).toHaveClass("bg-gray-100", "text-gray-800");
    });

    it("handles edge cases for progress values", () => {
      const { rerender } = render(
        <Card.Metric
          title="Progress"
          value="100"
          progress={-10}
        />
      );
      expect(screen.getByRole("progressbar")).toHaveStyle({ width: "0%" });

      rerender(
        <Card.Metric
          title="Progress"
          value="100"
          progress={150}
        />
      );
      expect(screen.getByRole("progressbar")).toHaveStyle({ width: "100%" });
    });

    it("renders all optional elements together", () => {
      const icon = <svg data-testid="metric-icon" />;
      render(
        <Card.Metric
          title="Complete"
          value="75"
          previousValue="+5%"
          target="80"
          progress={75}
          icon={icon}
          hoverable
          bordered
          className="custom-class"
        />
      );

      expect(screen.getByTestId("metric-icon")).toBeInTheDocument();
      expect(screen.getByText("+5%")).toBeInTheDocument();
      expect(screen.getByText("vs target: 80")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      const card = screen.getByRole("progressbar").closest(".bg-white");
      expect(card).toHaveClass("hover:shadow-lg", "border", "border-gray-200", "custom-class");
    });
  });

  describe("FeatureCard Edge Cases", () => {
    it("handles features with HTML content", () => {
      render(
        <Card.Feature
          title="HTML Features"
          description="Description"
          features={[
            "<strong>Bold</strong> text",
            "Text with <em>emphasis</em>",
            "Text with <span class='custom'>span</span>"
          ]}
        />
      );

      const items = screen.getAllByRole("listitem");
      expect(items).toHaveLength(3);
      items.forEach(item => {
        expect(item).toHaveClass("text-gray-600");
        expect(item.querySelector("svg")).toHaveClass("text-green-700");
      });
    });

    it("handles CTA button with onClick but no text", () => {
      const onCtaClick = vi.fn();
      render(
        <Card.Feature
          title="CTA Test"
          description="Description"
          features={["Feature 1"]}
          onCtaClick={onCtaClick}
        />
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(onCtaClick).toHaveBeenCalled();
    });

    it("renders with all styling variations", () => {
      const { container } = render(
        <Card.Feature
          title="Style Test"
          description="Description"
          features={["Feature 1"]}
          icon={<div data-testid="feature-icon" />}
          ctaText="Click Me"
          hoverable
          bordered
          shadowed
          className="custom-class"
        />
      );

      expect(screen.getByTestId("feature-icon").parentElement).toHaveClass(
        "bg-gradient-to-br",
        "from-purple-100",
        "to-indigo-100"
      );
      expect(container.firstChild).toHaveClass(
        "hover:shadow-lg",
        "border",
        "border-gray-200",
        "shadow-md",
        "custom-class"
      );
      expect(screen.getByRole("button")).toHaveClass(
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "focus:ring-2"
      );
    });

    it("handles empty and whitespace-only features", () => {
      render(
        <Card.Feature
          title="Empty Features"
          description="Description"
          features={["", " ", "\n", "\t"]}
        />
      );

      const items = screen.getAllByRole("listitem");
      expect(items).toHaveLength(4);
      items.forEach(item => {
        expect(item.textContent?.trim()).toBe("");
        expect(item.querySelector("svg")).toBeInTheDocument();
      });
    });
  });

  describe("Component Integration", () => {
    it("handles nested MetricCard and FeatureCard", () => {
      render(
        <Card>
          <Card.Header>
            <Card.Metric
              title="Nested Metric"
              value="100"
              progress={50}
            />
          </Card.Header>
          <Card.Body>
            <Card.Feature
              title="Nested Feature"
              description="Description"
              features={["Feature 1"]}
              ctaText="Click Me"
            />
          </Card.Body>
        </Card>
      );

      expect(screen.getByText("Nested Metric")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      expect(screen.getByText("Nested Feature")).toBeInTheDocument();
      expect(screen.getByText("Click Me")).toBeInTheDocument();
    });

    it("handles complex conditional rendering", () => {
      const { rerender } = render(
        <Card>
          <Card.Header image="test.jpg" imageAlt="test">
            {false && <div>Hidden</div>}
            {null}
            {undefined}
            <div>Visible</div>
          </Card.Header>
          <Card.Body>
            {true && <div>Conditional</div>}
          </Card.Body>
          <Card.Footer>
            {[].length > 0 && <div>Empty Array</div>}
          </Card.Footer>
        </Card>
      );

      expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
      expect(screen.getByText("Visible")).toBeInTheDocument();
      expect(screen.getByText("Conditional")).toBeInTheDocument();
      expect(screen.queryByText("Empty Array")).not.toBeInTheDocument();

      rerender(
        <Card>
          {false}
          {null}
          {undefined}
          <Card.Body>Still Visible</Card.Body>
        </Card>
      );

      expect(screen.getByText("Still Visible")).toBeInTheDocument();
    });
  });

  describe("Error Handling and Edge Cases", () => {
    it("handles empty features array in FeatureCard", () => {
      render(
        <Card.Feature
          title="Test"
          description="Description"
          features={[]}
        />
      );
      expect(screen.queryByRole("list")).toBeInTheDocument();
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("handles single empty feature in FeatureCard", () => {
      render(
        <Card.Feature
          title="Test"
          description="Description"
          features={[""]}
        />
      );
      const items = screen.getAllByRole("listitem");
      expect(items).toHaveLength(1);
      expect(items[0].textContent?.trim()).toBe("");
    });
  });

  describe("Style Variations", () => {
    it("combines Header styles with all props", () => {
      const { container } = render(
        <Card.Header
          image="test.jpg"
          imageAlt="test"
          bordered
          className="custom-class"
          data-testid="header"
        >
          Content
        </Card.Header>
      );
      
      const header = screen.getByTestId("header");
      expect(header).toHaveClass(
        "relative",
        "border-b",
        "border-gray-200",
        "min-h-[200px]",
        "flex",
        "flex-col",
        "justify-end",
        "bg-cover",
        "bg-center",
        "custom-class"
      );
      expect(header).toHaveStyle({
        backgroundImage: 'url(test.jpg)'
      });
    });

    it("spreads additional props to Body and Footer", () => {
      render(
        <Card>
          <Card.Body
            data-testid="body"
            className="custom-body"
            aria-label="body"
          >
            Body
          </Card.Body>
          <Card.Footer
            data-testid="footer"
            className="custom-footer"
            aria-label="footer"
          >
            Footer
          </Card.Footer>
        </Card>
      );

      const body = screen.getByTestId("body");
      const footer = screen.getByTestId("footer");

      expect(body).toHaveClass("custom-body", "p-6");
      expect(body).toHaveAttribute("aria-label", "body");

      expect(footer).toHaveClass("custom-footer", "p-6");
      expect(footer).toHaveAttribute("aria-label", "footer");
    });
  });

  describe("Interactive Features", () => {
    it("handles FeatureCard CTA click with keyboard", () => {
      const onCtaClick = vi.fn();
      render(
        <Card.Feature
          title="Test"
          description="Description"
          features={["Feature 1"]}
          ctaText="Click Me"
          onCtaClick={onCtaClick}
        />
      );

      const button = screen.getByRole("button");
      button.focus();
      fireEvent.keyDown(button, { key: "Enter" });
      expect(onCtaClick).toHaveBeenCalled();

      fireEvent.keyDown(button, { key: " " });
      expect(onCtaClick).toHaveBeenCalledTimes(2);
    });
  });
});

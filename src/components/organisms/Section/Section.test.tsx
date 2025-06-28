import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Section } from './Section';
import { Button } from '../../atoms/Button/button';

describe('Section Component', () => {
  const defaultProps = {
    children: <div>Test Content</div>,
  };

  it('renders basic section with title and content', () => {
    render(
      <Section {...defaultProps} title="Test Title">
        <div>Test Content</div>
      </Section>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders section with subtitle', () => {
    render(
      <Section {...defaultProps} title="Test Title" subtitle="Test Subtitle">
        <div>Test Content</div>
      </Section>
    );

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders section with custom header content', () => {
    const headerContent = <div>Custom Header</div>;
    render(
      <Section {...defaultProps} headerContent={headerContent}>
        <div>Test Content</div>
      </Section>
    );

    expect(screen.getByText('Custom Header')).toBeInTheDocument();
  });

  it('renders section with footer', () => {
    const footer = <div>Footer Content</div>;
    render(
      <Section {...defaultProps} footer={footer}>
        <div>Test Content</div>
      </Section>
    );

    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { container } = render(
      <Section {...defaultProps} variant="bordered">
        <div>Test Content</div>
      </Section>
    );

    expect(container.firstChild).toHaveClass('section-bordered');
  });

  it('applies correct background classes', () => {
    const { container } = render(
      <Section {...defaultProps} background="gray">
        <div>Test Content</div>
      </Section>
    );

    expect(container.firstChild).toHaveClass('section-bg-gray');
  });

  it('applies correct size classes', () => {
    const { container } = render(
      <Section {...defaultProps} size="lg">
        <div>Test Content</div>
      </Section>
    );

    expect(container.firstChild).toHaveClass('section-lg');
  });

  it('shows header divider when specified', () => {
    const { container } = render(
      <Section {...defaultProps} title="Test" showHeaderDivider>
        <div>Test Content</div>
      </Section>
    );

    expect(container.querySelector('.section-header')).toHaveClass('section-header-with-divider');
  });

  it('shows footer divider when specified', () => {
    const { container } = render(
      <Section {...defaultProps} footer={<div>Footer</div>} showFooterDivider>
        <div>Test Content</div>
      </Section>
    );

    expect(container.querySelector('.section-footer')).toHaveClass('section-footer-with-divider');
  });

  it('renders custom actions in header', () => {
    render(
      <Section {...defaultProps} actions={<Button>Action</Button>}>
        <div>Test Content</div>
      </Section>
    );

    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  describe('Collapsible Behavior', () => {
    it('toggles content when collapsible header is clicked', () => {
      const onCollapseChange = vi.fn();
      const { container } = render(
        <Section {...defaultProps} title="Test" collapsible onCollapseChange={onCollapseChange}>
          <div>Test Content</div>
        </Section>
      );

      const collapseButton = screen.getByRole('button', { name: /collapse section/i });
      fireEvent.click(collapseButton);

      expect(container.querySelector('.section-content')).toHaveClass('section-content-collapsed');
      expect(onCollapseChange).toHaveBeenCalledWith(true);
    });

    it('renders collapsed by default when defaultCollapsed is true', () => {
      const { container } = render(
        <Section {...defaultProps} title="Test" collapsible defaultCollapsed>
          <div>Test Content</div>
        </Section>
      );

      expect(container.querySelector('.section-content')).toHaveClass('section-content-collapsed');
    });

    it('does not toggle when disabled', () => {
      const { container } = render(
        <Section {...defaultProps} title="Test" collapsible disabled>
          <div>Test Content</div>
        </Section>
      );

      const collapseButton = screen.getByRole('button', { name: /collapse section/i });
      expect(collapseButton).toBeDisabled();

      fireEvent.click(collapseButton);
      expect(container.querySelector('.section-content')).not.toHaveClass('section-content-collapsed');
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading is true', () => {
      render(
        <Section {...defaultProps} loading>
          <div>Test Content</div>
        </Section>
      );

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('uses accessible text colors for loading text', () => {
      render(
        <Section {...defaultProps} loading>
          <div>Test Content</div>
        </Section>
      );

      const loadingText = screen.getByText('Loading...');
      expect(loadingText).toHaveClass('text-gray-900');
    });

    it('hides content when loading', () => {
      render(
        <Section {...defaultProps} loading>
          <div>Test Content</div>
        </Section>
      );

      expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('applies disabled class when disabled', () => {
      const { container } = render(
        <Section {...defaultProps} disabled>
          <div>Test Content</div>
        </Section>
      );

      expect(container.firstChild).toHaveClass('section-disabled');
    });

    it('disables collapse button when disabled', () => {
      render(
        <Section {...defaultProps} title="Test" collapsible disabled>
          <div>Test Content</div>
        </Section>
      );

      const collapseButton = screen.getByRole('button', { name: /collapse section/i });
      expect(collapseButton).toBeDisabled();
    });
  });
}); 
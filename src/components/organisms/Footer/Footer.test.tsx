import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders all sections correctly', () => {
    render(
      <Footer
        left={<span>Left Content</span>}
        center={<span>Center Content</span>}
        right={<span>Right Content</span>}
      />
    );

    expect(screen.getByText('Left Content')).toBeInTheDocument();
    expect(screen.getByText('Center Content')).toBeInTheDocument();
    expect(screen.getByText('Right Content')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Footer variant="light" />);
    expect(screen.getByRole('contentinfo')).toHaveClass('bg-white');

    rerender(<Footer variant="dark" />);
    expect(screen.getByRole('contentinfo')).toHaveClass('bg-gray-900');

    rerender(<Footer variant="transparent" />);
    expect(screen.getByRole('contentinfo')).toHaveClass('bg-transparent');
  });

  it('applies custom className', () => {
    render(<Footer className="custom-class" />);
    expect(screen.getByRole('contentinfo')).toHaveClass('custom-class');
  });

  it('renders without any content', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
}); 
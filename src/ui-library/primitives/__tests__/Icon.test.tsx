import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';

describe('Icon Component', () => {
  it('renders with default props', () => {
    render(<Icon name="star" />);
    const icon = screen.getByText('★');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('inline-block', 'w-5', 'h-5', 'text-gray-600');
  });

  it('renders different icon names correctly', () => {
    const { rerender } = render(<Icon name="heart" />);
    expect(screen.getByText('♥')).toBeInTheDocument();

    rerender(<Icon name="check" />);
    expect(screen.getByText('✓')).toBeInTheDocument();

    rerender(<Icon name="close" />);
    expect(screen.getByText('×')).toBeInTheDocument();

    rerender(<Icon name="arrow-right" />);
    expect(screen.getByText('→')).toBeInTheDocument();

    rerender(<Icon name="arrow-left" />);
    expect(screen.getByText('←')).toBeInTheDocument();

    rerender(<Icon name="info" />);
    expect(screen.getByText('ℹ')).toBeInTheDocument();

    rerender(<Icon name="warning" />);
    expect(screen.getByText('⚠')).toBeInTheDocument();

    rerender(<Icon name="error" />);
    expect(screen.getByText('⚡')).toBeInTheDocument();

    rerender(<Icon name="success" />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Icon name="star" size="xs" />);
    expect(screen.getByText('★')).toHaveClass('w-3', 'h-3');

    rerender(<Icon name="star" size="sm" />);
    expect(screen.getByText('★')).toHaveClass('w-4', 'h-4');

    rerender(<Icon name="star" size="lg" />);
    expect(screen.getByText('★')).toHaveClass('w-6', 'h-6');

    rerender(<Icon name="star" size="xl" />);
    expect(screen.getByText('★')).toHaveClass('w-8', 'h-8');
  });

  it('renders different colors correctly', () => {
    const { rerender } = render(<Icon name="star" color="primary" />);
    expect(screen.getByText('★')).toHaveClass('text-blue-600');

    rerender(<Icon name="star" color="secondary" />);
    expect(screen.getByText('★')).toHaveClass('text-gray-600');

    rerender(<Icon name="star" color="success" />);
    expect(screen.getByText('★')).toHaveClass('text-green-600');

    rerender(<Icon name="star" color="danger" />);
    expect(screen.getByText('★')).toHaveClass('text-red-600');

    rerender(<Icon name="star" color="warning" />);
    expect(screen.getByText('★')).toHaveClass('text-yellow-600');

    rerender(<Icon name="star" color="muted" />);
    expect(screen.getByText('★')).toHaveClass('text-gray-400');
  });

  it('handles unknown icon names with fallback', () => {
    render(<Icon name="unknown-icon" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Icon name="star" className="custom-class" />);
    expect(screen.getByText('★')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Icon name="star" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('renders as different element when as prop is provided', () => {
    render(<Icon name="star" as="div" />);
    const icon = screen.getByText('★');
    expect(icon.tagName).toBe('DIV');
  });

  it('has proper accessibility attributes', () => {
    render(<Icon name="star" />);
    const icon = screen.getByText('★');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});

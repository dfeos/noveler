import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card Component', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-white', 'border', 'border-gray-200', 'rounded-lg', 'p-4');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated')).toHaveClass('shadow-lg', 'border-0');

    rerender(<Card variant="outlined">Outlined</Card>);
    expect(screen.getByText('Outlined')).toHaveClass('border-2', 'border-gray-300', 'shadow-none');
  });

  it('renders different padding sizes correctly', () => {
    const { rerender } = render(<Card padding="none">No padding</Card>);
    expect(screen.getByText('No padding')).toHaveClass('p-0');

    rerender(<Card padding="sm">Small padding</Card>);
    expect(screen.getByText('Small padding')).toHaveClass('p-2');

    rerender(<Card padding="lg">Large padding</Card>);
    expect(screen.getByText('Large padding')).toHaveClass('p-6');

    rerender(<Card padding="xl">Extra large padding</Card>);
    expect(screen.getByText('Extra large padding')).toHaveClass('p-8');
  });

  it('shows hover effect when hoverable is true', () => {
    render(<Card hoverable>Hoverable card</Card>);
    expect(screen.getByText('Hoverable card')).toHaveClass('hover:shadow-md', 'transition-shadow');
  });

  it('applies custom shadow', () => {
    render(<Card shadow="xl">Shadow XL</Card>);
    expect(screen.getByText('Shadow XL')).toHaveClass('shadow-xl');
  });

  it('renders with rounded corners', () => {
    const { rerender } = render(<Card rounded="none">No rounded</Card>);
    expect(screen.getByText('No rounded')).toHaveClass('rounded-none');

    rerender(<Card rounded="sm">Small rounded</Card>);
    expect(screen.getByText('Small rounded')).toHaveClass('rounded-sm');

    rerender(<Card rounded="xl">XL rounded</Card>);
    expect(screen.getByText('XL rounded')).toHaveClass('rounded-xl');

    rerender(<Card rounded="full">Full rounded</Card>);
    expect(screen.getByText('Full rounded')).toHaveClass('rounded-full');
  });

  it('applies custom border', () => {
    render(<Card border="none">No border</Card>);
    expect(screen.getByText('No border')).toHaveClass('border-0');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>With Ref</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom</Card>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('renders as different element when as prop is provided', () => {
    render(<Card as="section">Section card</Card>);
    const card = screen.getByText('Section card');
    expect(card.tagName).toBe('SECTION');
  });
});

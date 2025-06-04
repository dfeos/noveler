import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from '../Label';

describe('Label Component', () => {
  it('renders with default props', () => {
    render(<Label>Default label</Label>);
    const label = screen.getByText('Default label');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-gray-700');
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Label size="xs">Extra small</Label>);
    expect(screen.getByText('Extra small')).toHaveClass('text-xs');

    rerender(<Label size="sm">Small</Label>);
    expect(screen.getByText('Small')).toHaveClass('text-sm');

    rerender(<Label size="lg">Large</Label>);
    expect(screen.getByText('Large')).toHaveClass('text-lg');
  });

  it('shows required indicator when required is true', () => {
    render(<Label required>Required label</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  it('applies disabled styles when disabled is true', () => {
    render(<Label disabled>Disabled label</Label>);
    expect(screen.getByText('Disabled label')).toHaveClass('text-gray-400');
  });

  it('renders as inline when inline is true', () => {
    render(<Label inline>Inline label</Label>);
    expect(screen.getByText('Inline label')).toHaveClass('inline-block');
  });

  it('associates with form control when htmlFor is provided', () => {
    render(<Label htmlFor="test-input">Label for input</Label>);
    const label = screen.getByText('Label for input');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Custom label</Label>);
    expect(screen.getByText('Custom label')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>With ref</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('renders as different element when as prop is provided', () => {
    render(<Label as="span">Span label</Label>);
    const label = screen.getByText('Span label');
    expect(label.tagName).toBe('SPAN');
  });

  it('combines multiple props correctly', () => {
    render(
      <Label required disabled size="lg" htmlFor="complex-input">
        Complex label
      </Label>
    );
    const label = screen.getByText('Complex label');
    expect(label).toHaveClass('text-lg', 'text-gray-400');
    expect(label).toHaveAttribute('for', 'complex-input');
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <Label>
        <span>Label with</span> <strong>mixed content</strong>
      </Label>
    );
    expect(screen.getByText('Label with')).toBeInTheDocument();
    expect(screen.getByText('mixed content')).toBeInTheDocument();
  });
});

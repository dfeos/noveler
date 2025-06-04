import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Banner } from '../Banner';

describe('Banner Component', () => {
  it('renders with default props', () => {
    render(<Banner>Default banner</Banner>);
    const banner = screen.getByText('Default banner');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('bg-blue-50', 'border-blue-200', 'text-blue-800');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Banner variant="success">Success message</Banner>);
    expect(screen.getByText('Success message')).toHaveClass('bg-green-50', 'border-green-200', 'text-green-800');

    rerender(<Banner variant="warning">Warning message</Banner>);
    expect(screen.getByText('Warning message')).toHaveClass('bg-yellow-50', 'border-yellow-200', 'text-yellow-800');

    rerender(<Banner variant="error">Error message</Banner>);
    expect(screen.getByText('Error message')).toHaveClass('bg-red-50', 'border-red-200', 'text-red-800');
  });

  it('shows icon when icon prop is provided', () => {
    render(<Banner icon="info">With icon</Banner>);
    expect(screen.getByText('ℹ')).toBeInTheDocument();
  });

  it('renders as dismissible when onDismiss is provided', () => {
    const handleDismiss = jest.fn();
    render(<Banner onDismiss={handleDismiss}>Dismissible banner</Banner>);
    
    const dismissButton = screen.getByRole('button', { name: '×' });
    expect(dismissButton).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const handleDismiss = jest.fn();
    render(<Banner onDismiss={handleDismiss}>Dismissible banner</Banner>);
    
    const dismissButton = screen.getByRole('button', { name: '×' });
    await user.click(dismissButton);
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders with title when provided', () => {
    render(<Banner title="Banner Title">Banner content</Banner>);
    expect(screen.getByText('Banner Title')).toBeInTheDocument();
    expect(screen.getByText('Banner Title')).toHaveClass('font-medium');
  });

  it('renders without border when border is none', () => {
    render(<Banner border="none">No border</Banner>);
    expect(screen.getByText('No border')).toHaveClass('border-transparent');
  });

  it('renders with full width', () => {
    render(<Banner>Full width banner</Banner>);
    expect(screen.getByText('Full width banner')).toHaveClass('w-full');
  });

  it('applies custom className', () => {
    render(<Banner className="custom-class">Custom banner</Banner>);
    expect(screen.getByText('Custom banner')).toHaveClass('custom-class');
  });

  it('renders as different element when as prop is provided', () => {
    render(<Banner as="section">Section banner</Banner>);
    const banner = screen.getByText('Section banner');
    expect(banner.tagName).toBe('SECTION');
  });

  it('renders with proper ARIA attributes for different variants', () => {
    const { rerender } = render(<Banner variant="info">Info message</Banner>);
    expect(screen.getByText('Info message')).toHaveAttribute('role', 'alert');

    rerender(<Banner variant="success">Success message</Banner>);
    expect(screen.getByText('Success message')).toHaveAttribute('role', 'alert');

    rerender(<Banner variant="warning">Warning message</Banner>);
    expect(screen.getByText('Warning message')).toHaveAttribute('role', 'alert');

    rerender(<Banner variant="error">Error message</Banner>);
    expect(screen.getByText('Error message')).toHaveAttribute('role', 'alert');
  });
});

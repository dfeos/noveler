import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text } from '../Text';

describe('Text Component', () => {
  it('renders with default props', () => {
    render(<Text>Default text</Text>);
    const text = screen.getByText('Default text');
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('P');
    expect(text).toHaveClass('text-base', 'text-gray-900');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Text variant="h1">Heading 1</Text>);
    let text = screen.getByText('Heading 1');
    expect(text.tagName).toBe('H1');
    expect(text).toHaveClass('text-4xl', 'font-bold');

    rerender(<Text variant="h2">Heading 2</Text>);
    text = screen.getByText('Heading 2');
    expect(text.tagName).toBe('H2');
    expect(text).toHaveClass('text-3xl', 'font-bold');

    rerender(<Text variant="h3">Heading 3</Text>);
    text = screen.getByText('Heading 3');
    expect(text.tagName).toBe('H3');
    expect(text).toHaveClass('text-2xl', 'font-semibold');

    rerender(<Text variant="body">Body text</Text>);
    text = screen.getByText('Body text');
    expect(text.tagName).toBe('P');
    expect(text).toHaveClass('text-base');

    rerender(<Text variant="caption">Caption text</Text>);
    text = screen.getByText('Caption text');
    expect(text.tagName).toBe('SPAN');
    expect(text).toHaveClass('text-sm', 'text-gray-600');
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Text size="xs">Extra Small</Text>);
    expect(screen.getByText('Extra Small')).toHaveClass('text-xs');

    rerender(<Text size="sm">Small</Text>);
    expect(screen.getByText('Small')).toHaveClass('text-sm');

    rerender(<Text size="lg">Large</Text>);
    expect(screen.getByText('Large')).toHaveClass('text-lg');

    rerender(<Text size="xl">Extra Large</Text>);
    expect(screen.getByText('Extra Large')).toHaveClass('text-xl');
  });

  it('renders different colors correctly', () => {
    const { rerender } = render(<Text color="primary">Primary</Text>);
    expect(screen.getByText('Primary')).toHaveClass('text-blue-600');

    rerender(<Text color="secondary">Secondary</Text>);
    expect(screen.getByText('Secondary')).toHaveClass('text-gray-600');

    rerender(<Text color="success">Success</Text>);
    expect(screen.getByText('Success')).toHaveClass('text-green-600');

    rerender(<Text color="danger">Danger</Text>);
    expect(screen.getByText('Danger')).toHaveClass('text-red-600');

    rerender(<Text color="warning">Warning</Text>);
    expect(screen.getByText('Warning')).toHaveClass('text-yellow-600');

    rerender(<Text color="muted">Muted</Text>);
    expect(screen.getByText('Muted')).toHaveClass('text-gray-500');
  });

  it('renders different weights correctly', () => {
    const { rerender } = render(<Text weight="light">Light</Text>);
    expect(screen.getByText('Light')).toHaveClass('font-light');

    rerender(<Text weight="normal">Normal</Text>);
    expect(screen.getByText('Normal')).toHaveClass('font-normal');

    rerender(<Text weight="medium">Medium</Text>);
    expect(screen.getByText('Medium')).toHaveClass('font-medium');

    rerender(<Text weight="semibold">Semibold</Text>);
    expect(screen.getByText('Semibold')).toHaveClass('font-semibold');

    rerender(<Text weight="bold">Bold</Text>);
    expect(screen.getByText('Bold')).toHaveClass('font-bold');
  });

  it('renders different alignments correctly', () => {
    const { rerender } = render(<Text align="left">Left</Text>);
    expect(screen.getByText('Left')).toHaveClass('text-left');

    rerender(<Text align="center">Center</Text>);
    expect(screen.getByText('Center')).toHaveClass('text-center');

    rerender(<Text align="right">Right</Text>);
    expect(screen.getByText('Right')).toHaveClass('text-right');

    rerender(<Text align="justify">Justify</Text>);
    expect(screen.getByText('Justify')).toHaveClass('text-justify');
  });

  it('renders truncated text correctly', () => {
    render(<Text truncate>Very long text that should be truncated</Text>);
    expect(screen.getByText('Very long text that should be truncated')).toHaveClass('truncate');
  });

  it('renders custom element when as prop is provided', () => {
    render(<Text as="span">Span text</Text>);
    const text = screen.getByText('Span text');
    expect(text.tagName).toBe('SPAN');
  });

  it('applies custom className', () => {
    render(<Text className="custom-class">Custom</Text>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });
});

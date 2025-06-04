import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container } from '../Container';

describe('Container Component', () => {
  it('renders with default props', () => {
    render(<Container>Container content</Container>);
    const container = screen.getByText('Container content');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('max-w-7xl', 'mx-auto', 'px-4');
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Container size="sm">Small container</Container>);
    expect(screen.getByText('Small container')).toHaveClass('max-w-3xl');

    rerender(<Container size="md">Medium container</Container>);
    expect(screen.getByText('Medium container')).toHaveClass('max-w-5xl');

    rerender(<Container size="lg">Large container</Container>);
    expect(screen.getByText('Large container')).toHaveClass('max-w-7xl');

    rerender(<Container size="xl">Extra large</Container>);
    expect(screen.getByText('Extra large')).toHaveClass('max-w-full');
  });

  it('renders different padding correctly', () => {
    const { rerender } = render(<Container padding="none">No padding</Container>);
    expect(screen.getByText('No padding')).toHaveClass('px-0');

    rerender(<Container padding="sm">Small padding</Container>);
    expect(screen.getByText('Small padding')).toHaveClass('px-2');

    rerender(<Container padding="lg">Large padding</Container>);
    expect(screen.getByText('Large padding')).toHaveClass('px-6');

    rerender(<Container padding="xl">Extra large padding</Container>);
    expect(screen.getByText('Extra large padding')).toHaveClass('px-8');
  });

  it('centers content when centered is true', () => {
    render(<Container centered>Centered content</Container>);
    expect(screen.getByText('Centered content')).toHaveClass('text-center');
  });

  it('applies fluid width when fluid is true', () => {
    render(<Container fluid>Fluid container</Container>);
    expect(screen.getByText('Fluid container')).toHaveClass('max-w-full');
  });

  it('applies custom className', () => {
    render(<Container className="custom-class">Custom container</Container>);
    expect(screen.getByText('Custom container')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Container ref={ref}>With ref</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders as different element when as prop is provided', () => {
    render(<Container as="section">Section container</Container>);
    const container = screen.getByText('Section container');
    expect(container.tagName).toBe('SECTION');
  });

  it('combines multiple props correctly', () => {
    render(
      <Container size="sm" padding="lg" centered>
        Complex container
      </Container>
    );
    const container = screen.getByText('Complex container');
    expect(container).toHaveClass('max-w-3xl', 'px-6', 'text-center', 'mx-auto');
  });
});

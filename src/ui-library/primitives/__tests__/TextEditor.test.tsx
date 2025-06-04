import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextEditor } from '../TextEditor';

describe('TextEditor Component', () => {
  it('renders with default props', () => {
    render(<TextEditor />);
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
    expect(editor).toHaveAttribute('contentEditable', 'true');
  });

  it('shows placeholder when empty', () => {
    render(<TextEditor placeholder="Start writing..." />);
    expect(screen.getByText('Start writing...')).toBeInTheDocument();
    expect(screen.getByText('Start writing...')).toHaveClass('pointer-events-none');
  });

  it('hides placeholder when content is present', () => {
    render(<TextEditor placeholder="Start writing..." value="Some content" />);
    expect(screen.queryByText('Start writing...')).not.toBeInTheDocument();
  });

  it('renders different font sizes correctly', () => {
    const { rerender } = render(<TextEditor fontSize="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('text-sm');

    rerender(<TextEditor fontSize="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('text-lg');

    rerender(<TextEditor fontSize="xl" />);
    expect(screen.getByRole('textbox')).toHaveClass('text-xl');
  });

  it('renders different line heights correctly', () => {
    const { rerender } = render(<TextEditor lineHeight="tight" />);
    expect(screen.getByRole('textbox')).toHaveClass('leading-tight');

    rerender(<TextEditor lineHeight="relaxed" />);
    expect(screen.getByRole('textbox')).toHaveClass('leading-relaxed');

    rerender(<TextEditor lineHeight="loose" />);
    expect(screen.getByRole('textbox')).toHaveClass('leading-loose');
  });

  it('calls onChange when content changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<TextEditor onChange={handleChange} />);
    
    const editor = screen.getByRole('textbox');
    await user.type(editor, 'Hello world');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<TextEditor disabled />);
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute('contentEditable', 'false');
    expect(editor).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('is read-only when readOnly prop is true', () => {
    render(<TextEditor readOnly />);
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute('contentEditable', 'false');
    expect(editor).toHaveClass('cursor-default');
  });

  it('enables spell check when spellCheck is true', () => {
    render(<TextEditor spellCheck />);
    expect(screen.getByRole('textbox')).toHaveAttribute('spellcheck', 'true');
  });

  it('disables spell check when spellCheck is false', () => {
    render(<TextEditor spellCheck={false} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('spellcheck', 'false');
  });

  it('auto-focuses when autoFocus is true', () => {
    render(<TextEditor autoFocus />);
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveFocus();
  });

  it('applies custom className', () => {
    render(<TextEditor className="custom-editor" />);
    expect(screen.getByRole('textbox').parentElement).toHaveClass('custom-editor');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TextEditor ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('handles paste events', () => {
    const handlePaste = jest.fn();
    render(<TextEditor onPaste={handlePaste} />);
    
    const editor = screen.getByRole('textbox');
    fireEvent.paste(editor);
    expect(handlePaste).toHaveBeenCalledTimes(1);
  });

  it('handles key events', () => {
    const handleKeyDown = jest.fn();
    render(<TextEditor onKeyDown={handleKeyDown} />);
    
    const editor = screen.getByRole('textbox');
    fireEvent.keyDown(editor, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('sets min and max height when provided', () => {
    render(<TextEditor minHeight="100px" maxHeight="300px" />);
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveStyle('min-height: 100px');
    expect(editor).toHaveStyle('max-height: 300px');
  });

  it('has proper ARIA attributes', () => {
    render(<TextEditor aria-label="Rich text editor" />);
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute('aria-label', 'Rich text editor');
    expect(editor).toHaveAttribute('role', 'textbox');
  });
});

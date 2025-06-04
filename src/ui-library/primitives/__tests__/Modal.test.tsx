import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal';

describe('Modal Component', () => {
  it('renders when open is true', () => {
    render(
      <Modal open onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    render(
      <Modal open onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    );
    
    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when escape key is pressed', () => {
    const handleClose = jest.fn();
    render(
      <Modal open onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when overlay is clicked if closeOnOverlayClick is false', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    render(
      <Modal open onClose={handleClose} closeOnOverlayClick={false}>
        <div>Modal content</div>
      </Modal>
    );
    
    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('does not close when escape key is pressed if closeOnEsc is false', () => {
    const handleClose = jest.fn();
    render(
      <Modal open onClose={handleClose} closeOnEsc={false}>
        <div>Modal content</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(
      <Modal open onClose={() => {}} size="sm">
        <div>Small modal</div>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-md');

    rerender(
      <Modal open onClose={() => {}} size="lg">
        <div>Large modal</div>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-4xl');

    rerender(
      <Modal open onClose={() => {}} size="xl">
        <div>Extra large modal</div>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-6xl');

    rerender(
      <Modal open onClose={() => {}} size="full">
        <div>Full modal</div>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-full', 'h-full');
  });

  it('renders with header when provided', () => {
    render(
      <Modal open onClose={() => {}} header="Modal Title">
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Title')).toHaveClass('text-lg', 'font-semibold');
  });

  it('renders with footer when provided', () => {
    render(
      <Modal open onClose={() => {}} footer={<button>Footer Button</button>}>
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.getByRole('button', { name: 'Footer Button' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Modal open onClose={() => {}} className="custom-modal">
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-modal');
  });

  it('applies custom overlay className', () => {
    render(
      <Modal open onClose={() => {}} overlayClassName="custom-overlay">
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.getByTestId('modal-overlay')).toHaveClass('custom-overlay');
  });

  it('prevents content click from closing modal', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    render(
      <Modal open onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    );
    
    await user.click(screen.getByText('Modal content'));
    expect(handleClose).not.toHaveBeenCalled();
  });
});

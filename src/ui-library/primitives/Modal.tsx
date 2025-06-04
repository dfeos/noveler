import React, { useEffect } from 'react';
import { ModalProps } from '../types';
import { cn, modalVariants } from '../utils';

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    children, 
    isOpen, 
    open,
    onClose, 
    size = 'md', 
    closeOnOverlayClick = true,
    closeOnEscape = true,
    closeOnEsc,
    title,
    header,
    footer,
    overlayClassName,
    className, 
    ...props 
  }, ref) => {
    
    // Handle both isOpen and open props
    const modalOpen = isOpen !== undefined ? isOpen : (open || false);
    
    // Handle both closeOnEscape and closeOnEsc props
    const shouldCloseOnEscape = closeOnEsc !== undefined ? closeOnEsc : closeOnEscape;
    
    useEffect(() => {
      if (!shouldCloseOnEscape) return;
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && modalOpen) {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [modalOpen, onClose, shouldCloseOnEscape]);

    useEffect(() => {
      if (modalOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [modalOpen]);

    if (!modalOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div 
        className={cn(modalVariants.overlay, overlayClassName)} 
        onClick={handleOverlayClick}
        data-testid="modal-overlay"
      >
        <div
          ref={ref}
          className={cn(
            modalVariants.base,
            modalVariants.sizes[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {(title || header) && (
            <div className={modalVariants.header}>
              {header ? (
                <div className="text-lg font-semibold">{header}</div>
              ) : (
                <h2 className={cn(modalVariants.title, "text-lg font-semibold")}>{title}</h2>
              )}
              <button
                onClick={onClose}
                className={modalVariants.closeButton}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
          )}
          <div className={modalVariants.content}>
            {children}
          </div>
          {footer && (
            <div className={modalVariants.footer}>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };

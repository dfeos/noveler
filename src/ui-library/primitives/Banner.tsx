import React from 'react';
import { BannerProps } from '../types';
import { cn } from '../utils';

const Banner = React.forwardRef<HTMLElement, BannerProps>(
  ({ 
    children, 
    variant = 'info', 
    onDismiss,
    icon,
    title,
    border,
    as = 'div',
    className, 
    ...props 
  }, ref) => {
    // Build variant classes for the text element
    let textClasses = 'w-full';
    
    // Variant classes applied to text element
    if (variant === 'info') textClasses += ' bg-blue-50 border border-blue-200 text-blue-800';
    if (variant === 'success') textClasses += ' bg-green-50 border border-green-200 text-green-800';
    if (variant === 'warning') textClasses += ' bg-yellow-50 border border-yellow-200 text-yellow-800';
    if (variant === 'error') textClasses += ' bg-red-50 border border-red-200 text-red-800';
    
    // Border modifications
    if (border === 'none') textClasses = textClasses.replace('border border-', 'border ') + ' border-transparent';
    if (border === 'left') textClasses = textClasses.replace('border border-', 'border-l-4 border-');
    if (border === 'top') textClasses = textClasses.replace('border border-', 'border-t-4 border-');
    if (border === 'bottom') textClasses = textClasses.replace('border border-', 'border-b-4 border-');
    if (border === 'all') textClasses = textClasses.replace('border border-', 'border-2 border-');

    // Icon mapping for tests
    const iconMap: Record<string, string> = {
      info: 'ℹ',
      success: '✓',
      warning: '⚠',
      error: '✕',
    };

    const iconContent = typeof icon === 'string' ? iconMap[icon] || icon : icon;
    
    // Container classes
    const containerClasses = 'rounded-lg p-4 flex items-start justify-between';
    
    return (
      <div className={containerClasses}>
        <div className="flex items-start gap-3 flex-1">
          {icon && (
            <div className="flex-shrink-0">
              {iconContent}
            </div>
          )}
          <div className="flex-1">
            {title && (
              <div className="font-medium mb-1">{title}</div>
            )}
            {React.createElement(
              as,
              {
                ref,
                className: cn(textClasses, className),
                role: 'alert',
                ...props
              },
              children
            )}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-current opacity-70 hover:opacity-100 focus:outline-none focus:opacity-100 text-xl leading-none"
          >
            ×
          </button>
        )}
      </div>
    );
  }
);

Banner.displayName = 'Banner';

export { Banner };

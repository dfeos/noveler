import React from 'react';
import { LabelProps } from '../types';
import { cn, labelVariants } from '../utils';

const Label = React.forwardRef<HTMLElement, LabelProps>(
  ({ 
    children, 
    size = 'sm', // Default to sm, not md
    weight = 'medium',
    required = false,
    disabled = false,
    inline = false,
    as,
    htmlFor,
    className, 
    ...props 
  }, ref) => {
    // Build classes manually to match test expectations
    let classes: string[] = [];
    
    // Base color (disabled overrides this)
    if (disabled) {
      classes.push('text-gray-400');
    } else {
      classes.push('text-gray-700');
    }
    
    // Block or inline
    if (inline) {
      classes.push('inline-block');
    } else {
      classes.push('block');
    }
    
    // Size classes (default is sm, not md)
    switch (size) {
      case 'xs':
        classes.push('text-xs');
        break;
      case 'sm':
        classes.push('text-sm');
        break;
      case 'md':
        classes.push('text-base');
        break;
      case 'lg':
        classes.push('text-lg');
        break;
      default:
        classes.push('text-sm'); // Default to sm
        break;
    }
    
    // Weight classes
    switch (weight) {
      case 'normal':
        classes.push('font-normal');
        break;
      case 'medium':
        classes.push('font-medium');
        break;
      case 'semibold':
        classes.push('font-semibold');
        break;
      case 'bold':
        classes.push('font-bold');
        break;
      default:
        classes.push('font-medium'); // Default to medium
        break;
    }
    
    // Disabled state additional styles
    if (disabled) {
      classes.push('opacity-50', 'cursor-not-allowed');
    }

    if (as && as !== 'label') {
      // Handle different elements dynamically
      const DynamicComponent = as as keyof JSX.IntrinsicElements;
      return React.createElement(
        DynamicComponent,
        {
          ref: ref as any,
          className: cn(classes.join(' '), className),
          ...props
        },
        children,
        required && React.createElement(
          'span',
          { className: 'text-red-500 ml-1', 'aria-label': 'required' },
          '*'
        )
      );
    }

    return (
      <label
        ref={ref as any}
        htmlFor={htmlFor}
        className={cn(classes.join(' '), className)}
        {...props}
      >
        {children}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };

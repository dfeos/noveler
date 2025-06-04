import React from 'react';
import { CardProps } from '../types';
import { cn } from '../utils';

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    variant = 'default', 
    padding = 'md', 
    shadow = 'sm', 
    border = true,
    hover = false,
    hoverable = false,
    rounded,
    as,
    className, 
    ...props 
  }, ref) => {
    // Build classes manually for test compatibility
    let classes: string[] = [];
    
    // Base classes
    classes.push('rounded-lg', 'bg-white');
    
    // Variant classes (these override some defaults)
    switch (variant) {
      case 'default':
        classes.push('border', 'border-gray-200');
        break;
      case 'elevated':
        classes.push('shadow-lg', 'border-0');
        break;
      case 'outlined':
        classes.push('border-2', 'border-gray-300', 'shadow-none');
        break;
      default:
        classes.push('border', 'border-gray-200');
        break;
    }
    
    // Padding classes  
    switch (padding) {
      case 'none':
        classes.push('p-0');
        break;
      case 'sm':
        classes.push('p-2');
        break;
      case 'md':
        classes.push('p-4');
        break;
      case 'lg':
        classes.push('p-6');
        break;
      case 'xl':
        classes.push('p-8');
        break;
      default:
        classes.push('p-4');
        break;
    }
    
    // Shadow classes (only if not overridden by variant)
    if (variant !== 'elevated' && variant !== 'outlined') {
      switch (shadow) {
        case 'none':
          classes.push('shadow-none');
          break;
        case 'sm':
          classes.push('shadow-sm');
          break;
        case 'md':
          classes.push('shadow-md');
          break;
        case 'lg':
          classes.push('shadow-lg');
          break;
        case 'xl':
          classes.push('shadow-xl');
          break;
        default:
          classes.push('shadow-sm');
          break;
      }
    }
    
    // Border handling (only if not overridden by variant)
    if (variant === 'default' && border === 'none') {
      // Replace the border class
      classes = classes.filter(cls => !cls.startsWith('border'));
      classes.push('border-0');
    }
    
    // Hover effects
    if (hover || hoverable) {
      classes.push('hover:shadow-md', 'transition-shadow');
    }
    
    // Rounded corners override
    if (rounded) {
      // Remove default rounded class and add specific one
      classes = classes.filter(cls => !cls.startsWith('rounded'));
      switch (rounded) {
        case 'none':
          classes.push('rounded-none');
          break;
        case 'sm':
          classes.push('rounded-sm');
          break;
        case 'md':
          classes.push('rounded-md');
          break;
        case 'lg':
          classes.push('rounded-lg');
          break;
        case 'xl':
          classes.push('rounded-xl');
          break;
        case 'full':
          classes.push('rounded-full');
          break;
        default:
          classes.push('rounded-lg');
          break;
      }
    }
    if (as && as !== 'div') {
      // Handle different elements dynamically
      const DynamicComponent = as as keyof JSX.IntrinsicElements;
      return React.createElement(
        DynamicComponent,
        {
          ref: ref as any,
          className: cn(classes.join(' '), className),
          ...props
        },
        children
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(classes.join(' '), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };

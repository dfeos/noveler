import React from 'react';
import { ContainerProps } from '../types';
import { cn, containerVariants } from '../utils';

const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ 
    children, 
    size = 'lg', // Default to lg to get max-w-7xl
    padding = 'md',
    centered = false,
    fluid = false,
    as,
    className, 
    ...props 
  }, ref) => {
    // Build classes manually for test compatibility
    let classes: string[] = [];
    
    // Base classes
    classes.push('mx-auto');
    
    // Size classes - test expects specific mappings
    if (fluid) {
      classes.push('max-w-full');
    } else {
      switch (size) {
        case 'sm':
          classes.push('max-w-3xl');
          break;
        case 'md':
          classes.push('max-w-5xl');
          break;
        case 'lg':
          classes.push('max-w-7xl');
          break;
        case 'xl':
          classes.push('max-w-full');
          break;
        case '2xl':
          classes.push('max-w-2xl');
          break;
        case '3xl':
          classes.push('max-w-3xl');
          break;
        case '4xl':
          classes.push('max-w-4xl');
          break;
        case '5xl':
          classes.push('max-w-5xl');
          break;
        case '6xl':
          classes.push('max-w-6xl');
          break;
        case '7xl':
          classes.push('max-w-7xl');
          break;
        case 'full':
          classes.push('max-w-full');
          break;
        default:
          classes.push('max-w-7xl'); // Default to lg
          break;
      }
    }
    
    // Padding classes - use px-* for horizontal padding
    switch (padding) {
      case 'none':
        classes.push('px-0');
        break;
      case 'sm':
        classes.push('px-2');
        break;
      case 'md':
        classes.push('px-4');
        break;
      case 'lg':
        classes.push('px-6');
        break;
      case 'xl':
        classes.push('px-8');
        break;
      default:
        classes.push('px-4'); // Default to md
        break;
    }
    
    // Centered classes
    if (centered) {
      classes.push('text-center');
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
        ref={ref as any}
        className={cn(classes.join(' '), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export { Container };

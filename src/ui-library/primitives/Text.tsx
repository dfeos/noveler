import React from 'react';
import { TextProps } from '../types';
import { cn } from '../utils';

export const Text = React.forwardRef<any, TextProps>(({
  variant = 'body',
  color = 'default',
  weight = 'normal',
  align = 'left',
  size,
  truncate,
  as,
  children,
  className,
  ...props
}, ref) => {
  // Determine the HTML element to render
  let Component: string;
  if (as) {
    Component = as;
  } else if (variant.startsWith('h')) {
    Component = variant;
  } else if (variant === 'caption') {
    Component = 'span';
  } else {
    Component = 'p';
  }
  
  // Build classes manually for test compatibility
  let classes: string[] = [];
  
  // Variant classes
  switch (variant) {
    case 'h1':
      classes.push('text-4xl', 'font-bold');
      break;
    case 'h2':
      classes.push('text-3xl', 'font-bold');
      break;
    case 'h3':
      classes.push('text-2xl', 'font-semibold');
      break;
    case 'h4':
      classes.push('text-xl', 'font-semibold');
      break;
    case 'h5':
      classes.push('text-lg', 'font-semibold');
      break;
    case 'h6':
      classes.push('text-base', 'font-semibold');
      break;
    case 'body':
    case 'p':
    default:
      classes.push('text-base');
      break;
    case 'small':
      classes.push('text-sm');
      break;
    case 'caption':
      classes.push('text-sm');
      break;
  }
  
  // Color classes - some variants have default colors
  const effectiveColor = variant === 'caption' && color === 'default' ? 'secondary' : color;
  
  switch (effectiveColor) {
    case 'primary':
      classes.push('text-blue-600');
      break;
    case 'secondary':
      classes.push('text-gray-600');
      break;
    case 'success':
      classes.push('text-green-600');
      break;
    case 'danger':
    case 'error':
      classes.push('text-red-600');
      break;
    case 'warning':
      classes.push('text-yellow-600');
      break;
    case 'muted':
      classes.push('text-gray-500');
      break;
    case 'default':
    default:
      // Don't add color classes for headings (they inherit)
      if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)) {
        classes.push('text-gray-900');
      }
      break;
  }
  
  // Weight classes - but don't override heading variants that already have font classes
  if (weight !== 'normal' || !['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)) {
    switch (weight) {
      case 'light':
        classes.push('font-light');
        break;
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
        if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)) {
          classes.push('font-normal');
        }
        break;
    }
  }
  
  // Alignment classes
  switch (align) {
    case 'left':
      classes.push('text-left');
      break;
    case 'center':
      classes.push('text-center');
      break;
    case 'right':
      classes.push('text-right');
      break;
    case 'justify':
      classes.push('text-justify');
      break;
    default:
      classes.push('text-left');
      break;
  }
  
  // Size override if provided (this overrides the variant size)
  if (size) {
    // Remove existing text size classes first
    classes = classes.filter(cls => !cls.startsWith('text-'));
    switch (size) {
      case 'xs':
        classes.push('text-xs');
        break;
      case 'sm':
        classes.push('text-sm');
        break;
      case 'base':
        classes.push('text-base');
        break;
      case 'lg':
        classes.push('text-lg');
        break;
      case 'xl':
        classes.push('text-xl');
        break;
      case '2xl':
        classes.push('text-2xl');
        break;
      case '3xl':
        classes.push('text-3xl');
        break;
      case '4xl':
        classes.push('text-4xl');
        break;
    }
    // Re-add the color class that was removed
    switch (effectiveColor) {
      case 'primary':
        classes.push('text-blue-600');
        break;
      case 'secondary':
        classes.push('text-gray-600');
        break;
      case 'success':
        classes.push('text-green-600');
        break;
      case 'danger':
      case 'error':
        classes.push('text-red-600');
        break;
      case 'warning':
        classes.push('text-yellow-600');
        break;
      case 'muted':
        classes.push('text-gray-500');
        break;
      case 'default':
      default:
        // Don't add color classes for headings (they inherit)
        if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)) {
          classes.push('text-gray-900');
        }
        break;
    }
  }
  
  // Add truncate if specified
  if (truncate) {
    classes.push('truncate');
  }
  
  return React.createElement(
    Component,
    {
      ref,
      className: cn(classes.join(' '), className),
      ...props
    },
    children
  );
});

Text.displayName = 'Text';

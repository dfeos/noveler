import React from 'react';
import { ButtonProps } from '../types';
import { cn } from '../utils';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  className,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  // Build classes manually for test compatibility
  let classes: string[] = [];
  
  // Base classes
  classes.push(
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'border',
    'font-medium',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2'
  );
  
  // Disabled classes
  if (disabled || loading) {
    classes.push('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
  }
  
  // Variant classes
  switch (variant) {
    case 'primary':
      classes.push(
        'bg-blue-600',
        'hover:bg-blue-700',
        'text-white',
        'border-transparent',
        'focus:ring-blue-500'
      );
      break;
    case 'secondary':
      classes.push(
        'bg-gray-200',
        'hover:bg-gray-300',
        'text-gray-900',
        'border-transparent',
        'focus:ring-gray-500'
      );
      break;
    case 'danger':
      classes.push(
        'bg-red-600',
        'hover:bg-red-700',
        'text-white',
        'border-transparent',
        'focus:ring-red-500'
      );
      break;
    case 'ghost':
      classes.push(
        'bg-transparent',
        'hover:bg-gray-100',
        'text-gray-700',
        'border-transparent',
        'focus:ring-gray-500'
      );
      break;
    case 'outline':
      classes.push(
        'border-gray-300',
        'bg-transparent',
        'hover:bg-gray-50',
        'text-gray-700',
        'focus:ring-gray-500'
      );
      break;
    default:
      classes.push(
        'bg-blue-600',
        'hover:bg-blue-700',
        'text-white',
        'border-transparent',
        'focus:ring-blue-500'
      );
      break;
  }
  
  // Size classes
  switch (size) {
    case 'xs':
      classes.push('h-6', 'px-2', 'text-xs');
      break;
    case 'sm':
      classes.push('h-8', 'px-3', 'text-sm');
      break;
    case 'md':
      classes.push('h-10', 'px-4', 'text-base');
      break;
    case 'lg':
      classes.push('h-12', 'px-6', 'text-lg');
      break;
    case 'xl':
      classes.push('h-14', 'px-8', 'text-xl');
      break;
    default:
      classes.push('h-10', 'px-4', 'text-base');
      break;
  }
  
  // Full width
  if (fullWidth) {
    classes.push('w-full');
  }
  
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(classes.join(' '), className)}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {loading ? `${children}...` : children}
    </button>
  );
});

Button.displayName = 'Button';

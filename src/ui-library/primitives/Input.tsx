import React from 'react';
import { InputProps } from '../types';
import { cn } from '../utils';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  readOnly = false,
  variant = 'default',
  size = 'md',
  errorMessage,
  error,
  success,
  className,
  onChange,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  // Build classes manually to match test expectations
  let classes = 'block w-full rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant classes
  if (error) {
    classes += ' border-red-500 focus:border-red-500 focus:ring-red-500';
  } else if (success) {
    classes += ' border-green-500 focus:border-green-500 focus:ring-green-500';
  } else if (variant === 'filled') {
    classes += ' bg-gray-100 border-transparent';
  } else if (variant === 'flushed') {
    classes += ' border-x-0 border-t-0 border-b-2 rounded-none';
  } else if (variant === 'unstyled') {
    classes += ' border-0 bg-transparent';
  } else {
    classes += ' border-gray-300 focus:border-blue-500 focus:ring-blue-500';
  }

  // Size classes
  if (size === 'sm') {
    classes += ' h-8 px-2 text-sm';
  } else if (size === 'lg') {
    classes += ' h-12 px-4 text-lg';
  } else {
    classes += ' px-3 py-2 text-base';
  }

  // Disabled styles
  if (disabled) {
    classes += ' opacity-50 cursor-not-allowed';
  }

  // ReadOnly styles
  if (readOnly) {
    classes += ' bg-gray-50';
  }

  return (
    <div className="space-y-1">
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(classes, className)}
        {...props}
      />
      {(error && (errorMessage || error)) && (
        <p className="text-sm text-red-600">{errorMessage || error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

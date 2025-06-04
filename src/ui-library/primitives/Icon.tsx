import React from 'react';
import { IconProps } from '../types';
import { cn } from '../utils';

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ 
    name,
    size = 'md', 
    color = 'secondary',
    as,
    className, 
    ...props 
  }, ref) => {
    // This is a simple implementation - in a real app you'd integrate with an icon library
    // like Heroicons, Lucide React, or React Icons
    const iconMap: Record<string, string> = {
      'chevron-down': '▼',
      'chevron-up': '▲',
      'chevron-left': '◀',
      'chevron-right': '▶',
      'arrow-left': '←',
      'arrow-right': '→',
      'arrow-up': '↑',
      'arrow-down': '↓',
      'x': '×',
      'close': '×',
      'check': '✓',
      'plus': '+',
      'minus': '−',
      'star': '★',
      'heart': '♥',
      'home': '🏠',
      'user': '👤',
      'settings': '⚙',
      'search': '🔍',
      'edit': '✏',
      'delete': '🗑',
      'save': '💾',
      'file': '📄',
      'folder': '📁',
      'book': '📚',
      'write': '✍',
      'info': 'ℹ',
      'warning': '⚠',
      'error': '⚡',
      'success': '✓'
    };

    // Build classes manually
    let classes = 'inline-block';
    
    // Size classes
    if (size === 'xs') classes += ' w-3 h-3 text-xs';
    if (size === 'sm') classes += ' w-4 h-4 text-sm';
    if (size === 'md') classes += ' w-5 h-5';
    if (size === 'lg') classes += ' w-6 h-6 text-lg';
    if (size === 'xl') classes += ' w-8 h-8 text-xl';
    
    // Color classes
    if (color === 'current') classes += ' text-current';
    if (color === 'primary') classes += ' text-blue-600';
    if (color === 'secondary') classes += ' text-gray-600';
    if (color === 'muted') classes += ' text-gray-400';
    if (color === 'error') classes += ' text-red-600';
    if (color === 'danger') classes += ' text-red-600';
    if (color === 'success') classes += ' text-green-600';
    if (color === 'warning') classes += ' text-yellow-600';

    if (as && as !== 'span') {
      // Handle different elements dynamically
      const DynamicComponent = as as keyof JSX.IntrinsicElements;
      return React.createElement(
        DynamicComponent,
        {
          ref: ref as any,
          className: cn(classes, className),
          role: 'img',
          'aria-label': name,
          'aria-hidden': 'true',
          ...props
        },
        iconMap[name] || '?'
      );
    }

    return (
      <span
        ref={ref}
        className={cn(classes, className)}
        role="img"
        aria-label={name}
        aria-hidden="true"
        {...props}
      >
        {iconMap[name] || '?'}
      </span>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon };

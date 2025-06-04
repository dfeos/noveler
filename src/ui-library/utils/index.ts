import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button variants
export const buttonVariants = {
  base: 'inline-flex items-center justify-center rounded-md border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  variants: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-transparent focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900 border-transparent focus:ring-gray-500',
    outline: 'bg-transparent hover:bg-gray-50 text-gray-900 border-gray-300 focus:ring-gray-500',
  },
  sizes: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  }
};

// Input variants
export const inputVariants = {
  base: 'block w-full rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500',
    filled: 'border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500',
    flushed: 'border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 focus:ring-0',
    unstyled: 'border-0 focus:border-0 focus:ring-0 p-0',
  },
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  }
};

// Text variants
export const textVariants = {
  variants: {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
    body: 'text-base',
    caption: 'text-sm text-gray-600',
    overline: 'text-xs uppercase tracking-wide text-gray-500',
  },
  colors: {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    muted: 'text-gray-500',
    error: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    default: 'text-gray-900',
  },
  weights: {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
  align: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  },
  sizes: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  }
};

// Card variants
export const cardVariants = {
  base: 'rounded-lg bg-white',
  variants: {
    default: 'border border-gray-200',
    elevated: 'border-0',
    outlined: 'border-2 border-gray-300',
  },
  padding: {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
  shadow: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },
  borders: {
    none: 'border-0',
  },
  hover: 'hover:shadow-md transition-shadow duration-200'
};

// Modal variants
export const modalVariants = {
  overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4',
  base: 'relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden flex flex-col',
  sizes: {
    sm: 'w-full max-w-md',
    md: 'w-full max-w-lg',
    lg: 'w-full max-w-4xl',
    xl: 'w-full max-w-6xl',
    '2xl': 'w-full max-w-2xl',
    '3xl': 'w-full max-w-3xl',
    full: 'w-full max-w-full h-full',
  },
  header: 'flex items-center justify-between p-4 border-b border-gray-200',
  title: 'text-lg font-semibold text-gray-900',
  closeButton: 'text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 text-2xl leading-none',
  content: 'flex-1 p-4 overflow-y-auto',
  footer: 'flex justify-end gap-2 p-4 border-t border-gray-200'
};

// Banner variants
export const bannerVariants = {
  base: 'rounded-lg p-4 flex items-start justify-between',
  variants: {
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
    success: 'bg-green-50 border border-green-200 text-green-800',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border border-red-200 text-red-800',
  },
  borders: {
    none: 'border-0',
    left: 'border-l-4 border-t-0 border-r-0 border-b-0',
    top: 'border-t-4 border-l-0 border-r-0 border-b-0',
    bottom: 'border-b-4 border-t-0 border-l-0 border-r-0',
    all: 'border-2',
  },
  content: 'flex items-start gap-3 flex-1',
  icon: 'flex-shrink-0',
  text: 'flex-1',
  title: 'font-medium mb-1',
  dismissButton: 'flex-shrink-0 text-current opacity-70 hover:opacity-100 focus:outline-none focus:opacity-100 text-xl leading-none'
};

// Icon variants
export const iconVariants = {
  base: 'inline-flex items-center justify-center',
  sizes: {
    xs: 'w-3 h-3 text-xs',
    sm: 'w-4 h-4 text-sm',
    md: 'w-5 h-5 text-base',
    lg: 'w-6 h-6 text-lg',
    xl: 'w-8 h-8 text-xl',
  },
  colors: {
    current: 'text-current',
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    muted: 'text-gray-400',
    error: 'text-red-600',
    danger: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
  }
};

// Container variants
export const containerVariants = {
  base: 'w-full mx-auto',
  sizes: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  },
  padding: {
    none: 'px-0',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
    xl: 'px-12',
  },
  centered: 'text-center'
};

// Label variants
export const labelVariants = {
  base: 'block font-medium text-gray-700',
  sizes: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  },
  weights: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
  disabled: 'opacity-50 cursor-not-allowed',
  required: 'text-red-500 ml-1'
};

// TextEditor variants
export const textEditorVariants = {
  container: 'relative border border-gray-300 rounded-md bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500',
  editor: 'w-full p-3 bg-transparent resize-none',
  placeholder: 'absolute top-3 left-3 text-gray-400 pointer-events-none',
  disabled: 'opacity-50 cursor-not-allowed bg-gray-50',
  readOnly: 'cursor-default',
  fontSize: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  },
  lineHeight: {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  }
};

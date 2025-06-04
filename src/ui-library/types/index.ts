// Common component prop types
export interface BaseProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
  'aria-label'?: string;
}

export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  variant?: 'default' | 'error' | 'success' | 'filled' | 'flushed' | 'unstyled';
  size?: 'sm' | 'md' | 'lg';
  errorMessage?: string;
  error?: string;
  success?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface TextProps extends BaseProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline' | 'p' | 'small';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning' | 'danger' | 'default';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  truncate?: boolean;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export interface CardProps extends BaseProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean | 'none';
  hoverable?: boolean;
  hover?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export interface ModalProps extends BaseProps {
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  title?: string;
  header?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  closeOnEsc?: boolean;
  overlayClassName?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export interface BannerProps extends BaseProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  title?: string;
  border?: 'none' | 'left' | 'top' | 'bottom' | 'all';
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export interface IconProps extends BaseProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'current' | 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning' | 'danger';
  as?: keyof JSX.IntrinsicElements;
}

export interface ContainerProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  fluid?: boolean;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export interface LabelProps extends BaseProps {
  htmlFor?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  inline?: boolean;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export interface TextEditorProps extends BaseProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minHeight?: string;
  maxHeight?: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
  spellCheck?: boolean;
  autoFocus?: boolean;
  onPaste?: (event: React.ClipboardEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

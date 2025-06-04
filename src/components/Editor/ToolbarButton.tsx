import React from 'react';

export interface ToolbarButtonProps {
  icon?: string;
  label?: string;
  title?: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  title,
  onClick,
  isActive = false,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`toolbar-btn ${isActive ? 'active' : ''} ${className}`}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {label && <span className="btn-label">{label}</span>}
    </button>
  );
};

export default ToolbarButton;

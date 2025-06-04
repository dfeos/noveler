import React, { useState } from 'react';

export interface KeyboardShortcut {
  keys: string;
  description: string;
  category: string;
}

export interface ShortcutsGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShortcutsGuide: React.FC<ShortcutsGuideProps> = ({ isOpen, onClose }) => {
  const shortcuts: KeyboardShortcut[] = [
    // Basic Formatting
    { keys: 'Ctrl+B', description: 'Bold text', category: 'Formatting' },
    { keys: 'Ctrl+I', description: 'Italic text', category: 'Formatting' },
    { keys: 'Ctrl+U', description: 'Underline text', category: 'Formatting' },
    
    // File Operations
    { keys: 'Ctrl+S', description: 'Save document', category: 'File' },
    { keys: 'Ctrl+Shift+N', description: 'New chapter', category: 'File' },
    { keys: 'Ctrl+F', description: 'Find and replace', category: 'File' },
    
    // View Controls
    { keys: 'Ctrl+Shift+Enter', description: 'Toggle fullscreen', category: 'View' },
    { keys: 'Escape', description: 'Exit fullscreen', category: 'View' },
    
    // Paragraph Management
    { keys: 'Ctrl+Alt+Enter', description: 'Split paragraph at cursor', category: 'Paragraph' },
    { keys: 'Alt+↑', description: 'Navigate to previous paragraph', category: 'Paragraph' },
    { keys: 'Alt+↓', description: 'Navigate to next paragraph', category: 'Paragraph' },
    { keys: 'Alt+D', description: 'Duplicate current paragraph', category: 'Paragraph' },
    { keys: 'Alt+Backspace', description: 'Delete current paragraph', category: 'Paragraph' },
    
    // Text Selection
    { keys: 'Ctrl+A', description: 'Select all text', category: 'Selection' },
    { keys: 'Ctrl+Shift+P', description: 'Select current paragraph', category: 'Selection' },
    
    // Navigation
    { keys: 'Ctrl+G', description: 'Go to line/paragraph', category: 'Navigation' },
    { keys: 'F3', description: 'Find next', category: 'Navigation' },
    { keys: 'Shift+F3', description: 'Find previous', category: 'Navigation' },
    
    // Help
    { keys: 'F1', description: 'Show keyboard shortcuts', category: 'Help' },
    { keys: 'Ctrl+/', description: 'Show keyboard shortcuts', category: 'Help' },
  ];

  const categories = Array.from(new Set(shortcuts.map(s => s.category)));

  if (!isOpen) return null;

  return (
    <div className="shortcuts-overlay">
      <div className="shortcuts-modal">
        <div className="shortcuts-header">
          <h2>Keyboard Shortcuts</h2>
          <button 
            onClick={onClose}
            className="shortcuts-close-btn"
            aria-label="Close shortcuts guide"
          >
            ×
          </button>
        </div>
        
        <div className="shortcuts-content">
          {categories.map(category => (
            <div key={category} className="shortcuts-category">
              <h3 className="shortcuts-category-title">{category}</h3>
              <div className="shortcuts-list">
                {shortcuts
                  .filter(shortcut => shortcut.category === category)
                  .map((shortcut, index) => (
                    <div key={index} className="shortcut-item">
                      <div className="shortcut-keys">
                        {shortcut.keys.split('+').map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            <kbd className="shortcut-key">{key}</kbd>
                            {keyIndex < shortcut.keys.split('+').length - 1 && (
                              <span className="shortcut-plus">+</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="shortcut-description">{shortcut.description}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="shortcuts-footer">
          <p className="shortcuts-tip">
            <strong>Tip:</strong> Most shortcuts work when the editor is focused. 
            Press <kbd>?</kbd> to toggle this guide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShortcutsGuide;

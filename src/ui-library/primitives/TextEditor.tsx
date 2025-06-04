import React, { useRef, useEffect } from 'react';
import { TextEditorProps } from '../types';
import { cn, textEditorVariants } from '../utils';

const TextEditor = React.forwardRef<HTMLDivElement, TextEditorProps>(
  ({ 
    value = '',
    onChange,
    placeholder = 'Start writing...',
    disabled = false,
    readOnly = false,
    minHeight = '200px',
    maxHeight,
    fontSize = 'md',
    lineHeight = 'relaxed',
    spellCheck = true,
    autoFocus = false,
    onPaste,
    onKeyDown,
    className, 
    ...props 
  }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const isControlled = onChange !== undefined;

    useEffect(() => {
      if (autoFocus && editorRef.current && !disabled && !readOnly) {
        editorRef.current.focus();
      }
    }, [autoFocus, disabled, readOnly]);

    useEffect(() => {
      if (isControlled && editorRef.current && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }, [value, isControlled]);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      if (onChange && !readOnly) {
        onChange(e.currentTarget.innerHTML);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      if (readOnly) {
        e.preventDefault();
        return;
      }
      
      // Call the passed-in onPaste handler if it exists
      if (onPaste) {
        onPaste(e);
      }
      
      // Allow default paste behavior for now
      // In a real implementation, you might want to clean the pasted content
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly) {
        // Allow selection keys but prevent typing
        const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'];
        if (!allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
        }
      }
      
      // Call the passed-in onKeyDown handler if it exists
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          textEditorVariants.container,
          disabled && textEditorVariants.disabled,
          className
        )}
        style={{ 
          minHeight,
          maxHeight 
        }}
        {...props}
      >
        <div
          ref={editorRef}
          contentEditable={!disabled && !readOnly}
          suppressContentEditableWarning
          onInput={handleInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          spellCheck={spellCheck}
          className={cn(
            textEditorVariants.editor,
            textEditorVariants.fontSize[fontSize],
            textEditorVariants.lineHeight[lineHeight],
            readOnly && textEditorVariants.readOnly,
            disabled && textEditorVariants.disabled
          )}
          style={{ 
            minHeight,
            maxHeight,
            outline: 'none'
          }}
          data-placeholder={placeholder}
          role="textbox"
          aria-multiline="true"
          aria-disabled={disabled}
          aria-readonly={readOnly}
          {...(props['aria-label'] && { 'aria-label': props['aria-label'] })}
        >
          {!isControlled ? undefined : value}
        </div>
        {!value && placeholder && (
          <div className={textEditorVariants.placeholder}>
            {placeholder}
          </div>
        )}
      </div>
    );
  }
);

TextEditor.displayName = 'TextEditor';

export { TextEditor };

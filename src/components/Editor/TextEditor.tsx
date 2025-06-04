import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

export interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}

export interface TextEditorRef {
  getSelection: () => { start: number; end: number; text: string } | null;
  setSelection: (start: number, end: number) => void;
  insertText: (text: string, selectInserted?: boolean) => void;
  replaceSelection: (newText: string, selectReplacement?: boolean) => void;
  focus: () => void;
  blur: () => void;
}

const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(({
  content,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  placeholder = "Start writing your story...",
  className = ""
}, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea to fit content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [content]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  // Get current selection for formatting
  const getSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea) return null;
    
    return {
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
      text: content.substring(textarea.selectionStart, textarea.selectionEnd)
    };
  };

  // Set selection/cursor position
  const setSelection = (start: number, end: number) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, end);
    }, 0);
  };

  // Insert text at cursor position
  const insertText = (text: string, selectInserted = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newContent = 
      content.substring(0, start) + 
      text + 
      content.substring(end);
    
    onChange(newContent);
    
    if (selectInserted) {
      setSelection(start, start + text.length);
    } else {
      setSelection(start + text.length, start + text.length);
    }
  };

  // Replace selected text
  const replaceSelection = (newText: string, selectReplacement = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newContent = 
      content.substring(0, start) + 
      newText + 
      content.substring(end);
    
    onChange(newContent);
    
    if (selectReplacement) {
      setSelection(start, start + newText.length);
    } else {
      setSelection(start + newText.length, start + newText.length);
    }
  };

  // Expose methods for parent components
  useImperativeHandle(ref, () => ({
    getSelection,
    setSelection,
    insertText,
    replaceSelection,
    focus: () => textareaRef.current?.focus(),
    blur: () => textareaRef.current?.blur()
  }));

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`content-textarea ${className}`}
      spellCheck={true}
    />
  );
});

export default TextEditor;

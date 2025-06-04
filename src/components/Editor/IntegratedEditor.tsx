import React, { useState, useRef, useEffect, useCallback } from 'react';
import FormattingToolbar from './FormattingToolbar';
import TextEditor, { TextEditorRef } from './TextEditor';
import ChapterManager, { Chapter } from './ChapterManager';
import { EditorFormatter, FormatAction } from './EditorFormatter';
import { ParagraphManager } from './ParagraphManager';
import ShortcutsGuide from './ShortcutsGuide';
import './editor.css';

export interface IntegratedEditorProps {
  initialChapters?: Chapter[];
  onSave?: (chapters: Chapter[]) => void;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

const IntegratedEditor: React.FC<IntegratedEditorProps> = ({
  initialChapters = [],
  onSave,
  autoSave = true,
  autoSaveDelay = 2000
}) => {
  // State management
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(
    initialChapters.length > 0 ? initialChapters[0].id : null
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [showChapterManager, setShowChapterManager] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  // References
  const textEditorRef = useRef<TextEditorRef>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();
  const paragraphManagerRef = useRef(new ParagraphManager());

  // Get current chapter
  const currentChapter = chapters.find(c => c.id === currentChapterId);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && chapters.length > 0) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      autoSaveTimeoutRef.current = setTimeout(() => {
        handleSave(true);
      }, autoSaveDelay);
    }
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [chapters, autoSave, autoSaveDelay]);

  // Initialize with default chapter if none exist
  useEffect(() => {
    if (chapters.length === 0) {
      const defaultChapter: Chapter = {
        id: generateId(),
        title: 'Chapter 1',
        content: '',
        wordCount: 0,
        lastModified: new Date().toISOString(),
        order: 0
      };
      setChapters([defaultChapter]);
      setCurrentChapterId(defaultChapter.id);
    }
  }, []);

  // Generate unique ID
  const generateId = () => `chapter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Update word count when content changes
  const calculateWordCount = (content: string): number => {
    return content.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Handle content changes
  const handleContentChange = useCallback((newContent: string) => {
    if (!currentChapterId) return;

    setChapters(prevChapters => 
      prevChapters.map(chapter => 
        chapter.id === currentChapterId 
          ? {
              ...chapter,
              content: newContent,
              wordCount: calculateWordCount(newContent),
              lastModified: new Date().toISOString()
            }
          : chapter
      )
    );
  }, [currentChapterId]);

  // Handle title changes
  const handleTitleChange = (newTitle: string) => {
    if (!currentChapterId) return;

    setChapters(prevChapters => 
      prevChapters.map(chapter => 
        chapter.id === currentChapterId 
          ? { ...chapter, title: newTitle, lastModified: new Date().toISOString() }
          : chapter
      )
    );
  };

  // Format text using EditorFormatter
  const handleFormat = (format: string, value?: string) => {
    if (!textEditorRef.current || !currentChapter) return;

    const selection = textEditorRef.current.getSelection();
    if (!selection) return;

    let action: FormatAction | null = null;

    switch (format) {
      case 'bold':
        action = { type: 'wrap', before: '**', after: '**' };
        break;
      case 'italic':
        action = { type: 'wrap', before: '*', after: '*' };
        break;
      case 'underline':
        action = { type: 'wrap', before: '<u>', after: '</u>' };
        break;
      case 'strikethrough':
        action = { type: 'wrap', before: '~~', after: '~~' };
        break;
      case 'heading1':
        action = { type: 'prefix', before: '# ' };
        break;
      case 'heading2':
        action = { type: 'prefix', before: '## ' };
        break;
      case 'heading3':
        action = { type: 'prefix', before: '### ' };
        break;
      case 'bullet-list':
        action = { type: 'prefix', before: '• ' };
        break;
      case 'numbered-list':
        action = { type: 'prefix', before: '1. ' };
        break;
      case 'blockquote':
        action = { type: 'prefix', before: '> ' };
        break;
    }

    if (action) {
      const result = EditorFormatter.applyFormat(currentChapter.content, selection, action);
      handleContentChange(result.newContent);

      // Update selection
      setTimeout(() => {
        if (textEditorRef.current) {
          textEditorRef.current.setSelection(result.newSelection.start, result.newSelection.end);
        }
      }, 0);
    }
  };

  // Handle special insertions
  const handleInsert = (type: string) => {
    if (!textEditorRef.current || !currentChapter) return;

    const selection = textEditorRef.current.getSelection();
    if (!selection) return;

    let insertText = '';

    switch (type) {
      case 'paragraph-break':
        insertText = '\n\n';
        break;
      case 'scene-break':
        insertText = '\n\n* * *\n\n';
        break;
      case 'chapter-break':
        insertText = '\n\n# Chapter\n\n';
        break;
      case 'date':
        insertText = new Date().toLocaleDateString();
        break;
      case 'note':
        insertText = '[Note: ]';
        break;
      default:
        return;
    }

    const action: FormatAction = { type: 'insert', insertText };
    const result = EditorFormatter.applyFormat(currentChapter.content, selection, action);
    handleContentChange(result.newContent);

    // Set cursor position after insertion
    setTimeout(() => {
      if (textEditorRef.current) {
        textEditorRef.current.setSelection(result.newSelection.start, result.newSelection.end);
      }
    }, 0);
  };

  // Enhanced keyboard shortcuts with paragraph management
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 's':
          event.preventDefault();
          handleSave();
          break;
        case 'b':
          event.preventDefault();
          handleFormat('bold');
          break;
        case 'i':
          event.preventDefault();
          handleFormat('italic');
          break;
        case 'u':
          event.preventDefault();
          handleFormat('underline');
          break;
        case 'Enter':
          if (event.shiftKey) {
            event.preventDefault();
            toggleFullscreen();
          } else if (event.altKey) {
            event.preventDefault();
            handleParagraphSplit();
          }
          break;
        case 'n':
          if (event.shiftKey) {
            event.preventDefault();
            handleChapterCreate();
          }
          break;
        case 'ArrowUp':
          if (event.altKey) {
            event.preventDefault();
            handleParagraphNavigate('up');
          }
          break;
        case 'ArrowDown':
          if (event.altKey) {
            event.preventDefault();
            handleParagraphNavigate('down');
          }
          break;
        case 'd':
          if (event.altKey) {
            event.preventDefault();
            handleParagraphDuplicate();
          }
          break;
        case 'Backspace':
          if (event.altKey) {
            event.preventDefault();
            handleParagraphDelete();
          }
          break;
        case '/':
          event.preventDefault();
          setShowShortcuts(true);
          break;
        case 'f':
          event.preventDefault();
          setShowFindReplace(true);
          break;
      }
    }

    // F1 to show shortcuts guide
    if (event.key === 'F1') {
      event.preventDefault();
      setShowShortcuts(true);
    }

    // Escape to exit fullscreen or close shortcuts guide
    if (event.key === 'Escape') {
      if (showShortcuts) {
        setShowShortcuts(false);
      } else if (isFullscreen) {
        setIsFullscreen(false);
        setShowToolbar(true);
      }
    }
  };

  // Save functionality
  const handleSave = (isAutoSave = false) => {
    if (onSave) {
      onSave(chapters);
    }
    console.log(isAutoSave ? 'Auto-saved' : 'Manually saved');
  };

  // Toggle functions
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setShowToolbar(false);
      setShowChapterManager(false);
    } else {
      setShowToolbar(true);
      setShowChapterManager(true);
    }
  };

  const toggleToolbar = () => {
    setShowToolbar(!showToolbar);
  };

  const toggleChapterManager = () => {
    setShowChapterManager(!showChapterManager);
  };

  // Chapter management functions
  const handleChapterSelect = (chapterId: string) => {
    setCurrentChapterId(chapterId);
  };

  const handleChapterCreate = () => {
    const newChapter: Chapter = {
      id: generateId(),
      title: `Chapter ${chapters.length + 1}`,
      content: '',
      wordCount: 0,
      lastModified: new Date().toISOString(),
      order: chapters.length
    };
    setChapters(prev => [...prev, newChapter]);
    setCurrentChapterId(newChapter.id);
  };

  const handleChapterDelete = (chapterId: string) => {
    if (chapters.length <= 1) return; // Don't delete the last chapter

    setChapters(prev => prev.filter(c => c.id !== chapterId));
    
    if (chapterId === currentChapterId) {
      const remainingChapters = chapters.filter(c => c.id !== chapterId);
      setCurrentChapterId(remainingChapters[0]?.id || null);
    }
  };

  const handleChapterRename = (chapterId: string, newTitle: string) => {
    setChapters(prev => 
      prev.map(chapter => 
        chapter.id === chapterId 
          ? { ...chapter, title: newTitle, lastModified: new Date().toISOString() }
          : chapter
      )
    );
  };

  const handleChapterReorder = (fromIndex: number, toIndex: number) => {
    setChapters(prev => {
      const newChapters = [...prev];
      const [movedChapter] = newChapters.splice(fromIndex, 1);
      newChapters.splice(toIndex, 0, movedChapter);
      
      // Update order property
      return newChapters.map((chapter, index) => ({
        ...chapter,
        order: index
      }));
    });
  };

  // Paragraph management functions
  const handleParagraphNavigate = (direction: 'up' | 'down') => {
    if (!textEditorRef.current || !currentChapter) return;

    const selection = textEditorRef.current.getSelection();
    if (!selection) return;

    const paragraphManager = paragraphManagerRef.current;
    paragraphManager.updateContent(currentChapter.content);

    let newPosition: number | null = null;
    if (direction === 'up') {
      newPosition = paragraphManager.getPreviousParagraphPosition(selection.start);
    } else {
      newPosition = paragraphManager.getNextParagraphPosition(selection.start);
    }

    if (newPosition !== null) {
      textEditorRef.current.setSelection(newPosition, newPosition);
    }
  };

  const handleParagraphSplit = () => {
    if (!textEditorRef.current || !currentChapter) return;

    const selection = textEditorRef.current.getSelection();
    if (!selection) return;

    const paragraphManager = paragraphManagerRef.current;
    paragraphManager.updateContent(currentChapter.content);

    const newContent = paragraphManager.splitParagraph(selection.start);
    handleContentChange(newContent);
  };

  const handleParagraphDelete = () => {
    if (!textEditorRef.current || !currentChapter) return;

    const selection = textEditorRef.current.getSelection();
    if (!selection) return;

    const paragraphManager = paragraphManagerRef.current;
    paragraphManager.updateContent(currentChapter.content);

    const newContent = paragraphManager.deleteParagraph(selection.start);
    handleContentChange(newContent);
  };

  const handleParagraphDuplicate = () => {
    if (!textEditorRef.current || !currentChapter) return;

    const selection = textEditorRef.current.getSelection();
    if (!selection) return;

    const paragraphManager = paragraphManagerRef.current;
    paragraphManager.updateContent(currentChapter.content);

    const result = paragraphManager.duplicateParagraph(selection.start);
    if (result) {
      handleContentChange(result.content);
      setTimeout(() => {
        if (textEditorRef.current) {
          textEditorRef.current.setSelection(result.newPosition, result.newPosition);
        }
      }, 0);
    }
  };

  const handleParagraphMove = (direction: 'up' | 'down') => {
    if (!textEditorRef.current || !currentChapter) return;

    const selection = textEditorRef.current.getSelection();
    if (!selection) return;

    const paragraphManager = paragraphManagerRef.current;
    paragraphManager.updateContent(currentChapter.content);

    let result: { content: string; newPosition: number } | null = null;
    if (direction === 'up') {
      result = paragraphManager.moveParagraphUp(selection.start);
    } else {
      result = paragraphManager.moveParagraphDown(selection.start);
    }

    if (result) {
      handleContentChange(result.content);
      setTimeout(() => {
        if (textEditorRef.current) {
          textEditorRef.current.setSelection(result.newPosition, result.newPosition);
        }
      }, 0);
    }
  };

  const handleParagraphSelect = () => {
    if (!textEditorRef.current || !currentChapter) return;

    const selection = textEditorRef.current.getSelection();
    if (!selection) return;

    const paragraphManager = paragraphManagerRef.current;
    paragraphManager.updateContent(currentChapter.content);

    const paragraphSelection = paragraphManager.selectParagraph(selection.start);
    if (paragraphSelection) {
      textEditorRef.current.setSelection(paragraphSelection.start, paragraphSelection.end);
    }
  };

  // Get paragraph statistics for the current chapter
  const getParagraphStats = () => {
    if (!currentChapter) return null;

    const paragraphManager = paragraphManagerRef.current;
    paragraphManager.updateContent(currentChapter.content);
    return paragraphManager.getParagraphStats();
  };

  // Find and Replace functionality
  const handleFind = () => {
    if (!textEditorRef.current || !currentChapter || !findText) return;
    
    const content = currentChapter.content;
    const index = content.toLowerCase().indexOf(findText.toLowerCase());
    
    if (index !== -1) {
      textEditorRef.current.setSelection(index, index + findText.length);
    }
  };

  const handleReplace = () => {
    if (!textEditorRef.current || !currentChapter || !findText) return;
    
    const selection = textEditorRef.current.getSelection();
    if (selection && selection.start !== selection.end) {
      textEditorRef.current.replaceSelection(replaceText);
    }
  };

  const handleReplaceAll = () => {
    if (!currentChapter || !findText) return;
    
    const newContent = currentChapter.content.replaceAll(findText, replaceText);
    handleContentChange(newContent);
  };

  // Calculate total word count
  const totalWordCount = chapters.reduce((sum, chapter) => sum + chapter.wordCount, 0);

  return (
    <div className={`integrated-editor ${isFullscreen ? 'fullscreen' : ''} ${isFocused ? 'focused' : ''}`}>
      {/* Chapter Manager Sidebar */}
      {showChapterManager && !isFullscreen && (
        <div className="chapter-sidebar">
          <div className="sidebar-header">
            <h3>Chapters</h3>
            <button 
              onClick={handleChapterCreate}
              className="create-chapter-btn"
              title="New Chapter (Ctrl+Shift+N)"
            >
              +
            </button>
          </div>
          <ChapterManager
            chapters={chapters}
            currentChapterId={currentChapterId}
            onChapterSelect={handleChapterSelect}
            onChapterCreate={handleChapterCreate}
            onChapterDelete={handleChapterDelete}
            onChapterRename={handleChapterRename}
            onChapterReorder={handleChapterReorder}
          />
          <div className="sidebar-footer">
            <div className="total-word-count">
              Total: {totalWordCount} words
            </div>
          </div>
        </div>
      )}

      {/* Main Editor Area */}
      <div className="editor-main-area">
        {/* Formatting Toolbar */}
        {showToolbar && (
          <FormattingToolbar
            onFormat={handleFormat}
            onInsert={handleInsert}
            wordCount={currentChapter?.wordCount || 0}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            onToggleToolbar={toggleToolbar}
            onSave={() => handleSave()}
          />
        )}

        {/* Additional Controls */}
        <div className="additional-controls">
          <button 
            onClick={() => setShowFindReplace(true)}
            className="help-btn"
            title="Find and Replace (Ctrl+F)"
          >
            🔍
          </button>
          <button 
            onClick={() => setShowShortcuts(true)}
            className="help-btn"
            title="Keyboard Shortcuts (F1 or Ctrl+/)"
          >
            ❓
          </button>
        </div>

        {/* Title Input */}
        <div className="title-section">
          <input
            type="text"
            value={currentChapter?.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Chapter Title..."
            className="chapter-title-input"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        {/* Text Editor */}
        <div className="text-editor-section">
          {currentChapter && (
            <TextEditor
              ref={textEditorRef}
              content={currentChapter.content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Once upon a time..."
              className="main-text-editor"
            />
          )}
        </div>
      </div>

      {/* Floating Controls (Minimal Mode) */}
      {!showToolbar && (
        <div className="floating-controls">
          <button 
            onClick={toggleToolbar}
            className="floating-btn"
            title="Show Toolbar"
          >
            ⚙️
          </button>
          {!showChapterManager && (
            <button 
              onClick={toggleChapterManager}
              className="floating-btn"
              title="Show Chapters"
            >
              📚
            </button>
          )}
          <div className="floating-stats">
            <span>{currentChapter?.wordCount || 0} words</span>
            <span>{chapters.length} chapters</span>
          </div>
        </div>
      )}

      {/* Shortcuts Guide Modal */}
      {showShortcuts && (
        <ShortcutsGuide 
          isOpen={showShortcuts}
          onClose={() => setShowShortcuts(false)} 
        />
      )}

      {/* Find and Replace Modal */}
      {showFindReplace && (
        <div className="modal-overlay" onClick={() => setShowFindReplace(false)}>
          <div className="find-replace-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Find and Replace</h3>
              <button 
                onClick={() => setShowFindReplace(false)}
                className="modal-close-btn"
              >
                ×
              </button>
            </div>
            <div className="find-replace-content">
              <div className="find-replace-row">
                <input
                  type="text"
                  placeholder="Find..."
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  className="find-replace-input"
                />
                <button onClick={handleFind} className="find-replace-btn">
                  Find
                </button>
              </div>
              <div className="find-replace-row">
                <input
                  type="text"
                  placeholder="Replace with..."
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  className="find-replace-input"
                />
                <button onClick={handleReplace} className="find-replace-btn">
                  Replace
                </button>
              </div>
              <div className="find-replace-actions">
                <button onClick={handleReplaceAll} className="find-replace-btn primary">
                  Replace All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegratedEditor;

import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, TextEditor, Container, Text, Icon } from '../../ui-library';
import './editor.css';

interface EditorProps {
  title?: string;
  content?: string;
  onSave?: (content: string, title: string) => void;
  autoSave?: boolean;
}

const Editor: React.FC<EditorProps> = ({ 
  title: initialTitle = '', 
  content: initialContent = '', 
  onSave,
  autoSave = true 
}) => {
    const [title, setTitle] = useState<string>(initialTitle);
    const [content, setContent] = useState<string>(initialContent);
    const [wordCount, setWordCount] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showToolbar, setShowToolbar] = useState<boolean>(true);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

    // Calculate word count
    useEffect(() => {
        const words = content.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
    }, [content]);

    // Auto-save functionality
    useEffect(() => {
        if (autoSave && (content || title)) {
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }
            autoSaveTimeoutRef.current = setTimeout(() => {
                handleSave(true);
            }, 2000); // Auto-save after 2 seconds of inactivity
        }
        return () => {
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }
        };
    }, [content, title, autoSave]);

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleSave = (isAutoSave = false) => {
        if (onSave) {
            onSave(content, title);
        }
        // Show save indicator (you can add a toast notification here)
        console.log(isAutoSave ? 'Auto-saved' : 'Manually saved');
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        if (!isFullscreen) {
            setShowToolbar(false);
        } else {
            setShowToolbar(true);
        }
    };

    const toggleDistrationFree = () => {
        setShowToolbar(!showToolbar);
    };

    const insertText = (beforeText: string, afterText: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        
        const newContent = 
            content.substring(0, start) + 
            beforeText + selectedText + afterText + 
            content.substring(end);
        
        setContent(newContent);
        
        // Restore cursor position
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + beforeText.length, 
                start + beforeText.length + selectedText.length
            );
        }, 0);
    };

    const formatText = (format: string) => {
        switch (format) {
            case 'bold':
                insertText('**', '**');
                break;
            case 'italic':
                insertText('*', '*');
                break;
            case 'heading':
                insertText('# ');
                break;
            case 'quote':
                insertText('> ');
                break;
            default:
                break;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        // Keyboard shortcuts
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case 's':
                    event.preventDefault();
                    handleSave();
                    break;
                case 'b':
                    event.preventDefault();
                    formatText('bold');
                    break;
                case 'i':
                    event.preventDefault();
                    formatText('italic');
                    break;
                case 'Enter':
                    if (event.shiftKey) {
                        event.preventDefault();
                        toggleFullscreen();
                    }
                    break;
            }
        }
        
        // Escape to exit fullscreen
        if (event.key === 'Escape' && isFullscreen) {
            setIsFullscreen(false);
            setShowToolbar(true);
        }
    };

    return (
        <Container className={`editor-container ${isFullscreen ? 'fullscreen' : ''} ${isFocused ? 'focused' : ''}`}>
            {showToolbar && (
                <Container className="editor-toolbar">
                    <Container className="toolbar-left">
                        <Button 
                            onClick={() => formatText('bold')} 
                            variant="ghost"
                            size="sm"
                            aria-label="Bold (Ctrl+B)"
                        >
                            <Text weight="bold">B</Text>
                        </Button>
                        <Button 
                            onClick={() => formatText('italic')} 
                            variant="ghost"
                            size="sm"
                            aria-label="Italic (Ctrl+I)"
                        >
                            <Text as="em">I</Text>
                        </Button>
                        <Button 
                            onClick={() => formatText('heading')} 
                            variant="ghost"
                            size="sm"
                            aria-label="Heading"
                        >
                            H1
                        </Button>
                        <Button 
                            onClick={() => formatText('quote')} 
                            variant="ghost"
                            size="sm"
                            aria-label="Quote"
                        >
                            "
                        </Button>
                        <div className="toolbar-separator"></div>
                        <Button 
                            onClick={() => handleSave()} 
                            variant="primary"
                            size="sm"
                            aria-label="Save (Ctrl+S)"
                        >
                            <Icon name="💾" /> Save
                        </Button>
                    </Container>
                    <Container className="toolbar-right">
                        <Text variant="small" color="muted">{wordCount} words</Text>
                        <Button 
                            onClick={toggleDistrationFree} 
                            variant="ghost"
                            size="sm"
                            aria-label="Toggle Toolbar"
                        >
                            <Icon name="👁️" />
                        </Button>
                        <Button 
                            onClick={toggleFullscreen} 
                            variant="ghost"
                            size="sm"
                            aria-label="Fullscreen (Ctrl+Shift+Enter)"
                        >
                            <Icon name={isFullscreen ? '⬛' : '⬜'} />
                        </Button>
                    </Container>
                </Container>
            )}
            
            <Container className="editor-main">
                <Input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Chapter Title..."
                    className="title-input"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                
                <TextEditor
                    value={content}
                    onChange={(value) => setContent(value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Once upon a time..."
                    className="content-textarea"
                    spellCheck={true}
                />
            </Container>
            
            {!showToolbar && (
                <Container className="floating-toolbar">
                    <Button 
                        onClick={toggleDistrationFree} 
                        variant="ghost"
                        size="sm"
                        aria-label="Show Toolbar"
                    >
                        <Icon name="⚙️" />
                    </Button>
                    <Text variant="small" className="floating-word-count">{wordCount}</Text>
                </Container>
            )}
        </Container>
    );
};

export default Editor;
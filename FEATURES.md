# Noveler - Feature Documentation

## Overview
Noveler is a comprehensive novel writing application built with React and TypeScript, featuring a modular architecture with advanced writing tools and a distraction-free environment.

## Core Features

### 🏗️ Integrated Editor Architecture
- **IntegratedEditor**: Unified component combining all writing tools
- **Modular Design**: Separate components for different functionalities
- **State Management**: Advanced chapter-based state management with auto-save
- **TypeScript Support**: Full type safety and IntelliSense support

### 📝 Text Editor
- **Rich Text Editing**: Professional-grade text editing with formatting support
- **Auto-Save**: Automatic saving with configurable delay (default 2 seconds)
- **Word Count**: Real-time word counting per chapter and total
- **Focus Mode**: Distraction-free writing environment

### 📚 Chapter Management
- **Multi-Chapter Support**: Create, delete, rename, and reorder chapters
- **Chapter Navigation**: Easy switching between chapters
- **Chapter Statistics**: Individual word counts and progress tracking
- **Chapter Persistence**: Auto-save to localStorage with legacy document migration

### 🎨 Formatting Toolbar
- **Text Formatting**: Bold, italic, underline support
- **Keyboard Shortcuts**: Full keyboard shortcut integration
- **Responsive Design**: Adapts to different screen sizes
- **Toggle Visibility**: Show/hide toolbar for minimal interface

### ⌨️ Advanced Keyboard Shortcuts

#### Formatting
- `Ctrl+B` - Bold text
- `Ctrl+I` - Italic text
- `Ctrl+U` - Underline text

#### File Operations
- `Ctrl+S` - Save document
- `Ctrl+Shift+N` - New chapter
- `Ctrl+F` - Find and replace

#### View Controls
- `Ctrl+Shift+Enter` - Toggle fullscreen mode
- `Escape` - Exit fullscreen or close modals

#### Paragraph Management
- `Ctrl+Alt+Enter` - Split paragraph at cursor
- `Alt+↑` - Navigate to previous paragraph
- `Alt+↓` - Navigate to next paragraph
- `Alt+D` - Duplicate current paragraph
- `Alt+Backspace` - Delete current paragraph

#### Help
- `F1` - Show keyboard shortcuts guide
- `Ctrl+/` - Show keyboard shortcuts guide

### 🔍 Find and Replace
- **Text Search**: Find text within the current chapter
- **Replace Functionality**: Replace individual instances or all occurrences
- **Modal Interface**: Clean, focused interface for search operations
- **Keyboard Shortcut**: `Ctrl+F` to open find and replace

### 📖 Paragraph Management
- **Advanced Navigation**: Move between paragraphs with keyboard shortcuts
- **Paragraph Operations**: Split, duplicate, delete paragraphs
- **Smart Selection**: Automatic paragraph detection and selection
- **Statistics**: Track paragraph count and structure

### 🎯 Fullscreen Mode
- **Distraction-Free Writing**: Hide all UI elements except the editor
- **Floating Controls**: Minimal controls available in fullscreen
- **Quick Toggle**: Easy entry/exit with keyboard shortcuts
- **Auto-Hide Toolbar**: Toolbar automatically hides in fullscreen mode

### 💾 Data Persistence
- **Auto-Save**: Automatic saving to localStorage
- **Manual Save**: `Ctrl+S` for manual saves
- **Legacy Migration**: Automatic migration from single-document format
- **Chapter-Based Storage**: Each chapter saved separately for better performance

### 🎨 User Interface
- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on different screen sizes
- **Focus Indicators**: Visual feedback for focused elements
- **Smooth Animations**: Subtle transitions and hover effects

### 🆘 Help System
- **Shortcuts Guide**: Comprehensive keyboard shortcuts reference
- **Modal Interface**: Easy-to-access help system
- **Categorized Shortcuts**: Organized by functionality (Formatting, File, View, etc.)
- **Multiple Access Methods**: F1 key or help button

## Technical Architecture

### Components Structure
```
src/components/Editor/
├── IntegratedEditor.tsx      # Main editor component
├── TextEditor.tsx           # Core text editing functionality
├── FormattingToolbar.tsx    # Formatting controls
├── ChapterManager.tsx       # Chapter management
├── ShortcutsGuide.tsx       # Help system
├── ParagraphManager.ts      # Paragraph operations utility
├── EditorFormatter.ts       # Text formatting utilities
├── ToolbarButton.tsx        # Reusable button component
└── editor.css              # Comprehensive styling
```

### Key Classes and Utilities
- **ParagraphManager**: Advanced paragraph manipulation
- **EditorFormatter**: Text formatting operations
- **Chapter Interface**: Type-safe chapter data structure
- **TextEditorRef**: React ref interface for editor methods

### State Management
- **Chapter-Based**: Each chapter maintains its own state
- **Auto-Save Integration**: Automatic persistence with debouncing
- **Legacy Support**: Migration from older document formats
- **TypeScript Types**: Full type safety throughout the application

## Usage Examples

### Basic Writing
1. Open the application
2. Start typing in the main editor
3. Use `Ctrl+Shift+N` to create new chapters
4. Switch between chapters using the sidebar

### Advanced Features
1. **Paragraph Management**: Use `Alt+D` to duplicate paragraphs
2. **Find and Replace**: Press `Ctrl+F` to search and replace text
3. **Fullscreen Mode**: Use `Ctrl+Shift+Enter` for distraction-free writing
4. **Help**: Press `F1` to see all keyboard shortcuts

### Customization
- Toggle toolbar visibility with the gear icon
- Use fullscreen mode for focused writing
- Access help system for quick reference

## Performance Features
- **Debounced Auto-Save**: Prevents excessive save operations
- **Efficient Rendering**: React optimization for large documents
- **Local Storage**: Fast persistence without server requirements
- **Modular Loading**: Components loaded as needed

## Browser Support
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
- LocalStorage support required for persistence

## Future Enhancements
- Export to PDF/DOCX formats
- Advanced statistics dashboard
- Writing goals and progress tracking
- Theme customization
- Collaboration features
- Cloud synchronization

---

*Built with React, TypeScript, and modern web technologies for professional novel writing.*

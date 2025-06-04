// Text formatting utilities for the editor

export interface Selection {
  start: number;
  end: number;
  text: string;
}

export interface FormatAction {
  type: 'wrap' | 'prefix' | 'replace' | 'insert';
  before?: string;
  after?: string;
  replacement?: string;
  insertText?: string;
}

export class EditorFormatter {
  static applyFormat(content: string, selection: Selection, action: FormatAction): {
    newContent: string;
    newSelection: { start: number; end: number };
  } {
    const { start, end, text } = selection;
    
    switch (action.type) {
      case 'wrap':
        return this.wrapText(content, start, end, text, action.before || '', action.after || '');
      
      case 'prefix':
        return this.addPrefix(content, start, end, action.before || '');
      
      case 'replace':
        return this.replaceText(content, start, end, action.replacement || '');
      
      case 'insert':
        return this.insertText(content, start, action.insertText || '');
      
      default:
        return { newContent: content, newSelection: { start, end } };
    }
  }

  private static wrapText(content: string, start: number, end: number, selectedText: string, before: string, after: string) {
    // Check if text is already wrapped with these markers
    const beforeStart = start - before.length;
    const afterEnd = end + after.length;
    
    if (beforeStart >= 0 && afterEnd <= content.length) {
      const textBefore = content.substring(beforeStart, start);
      const textAfter = content.substring(end, afterEnd);
      
      if (textBefore === before && textAfter === after) {
        // Remove formatting
        const newContent = 
          content.substring(0, beforeStart) + 
          selectedText + 
          content.substring(afterEnd);
        
        return {
          newContent,
          newSelection: { start: beforeStart, end: beforeStart + selectedText.length }
        };
      }
    }
    
    // Add formatting
    const newContent = 
      content.substring(0, start) + 
      before + selectedText + after + 
      content.substring(end);
    
    return {
      newContent,
      newSelection: { 
        start: start + before.length, 
        end: start + before.length + selectedText.length 
      }
    };
  }

  private static addPrefix(content: string, start: number, end: number, prefix: string) {
    // Find the start of the current line
    const lineStart = content.lastIndexOf('\n', start - 1) + 1;
    const currentLine = content.substring(lineStart, content.indexOf('\n', end) !== -1 ? content.indexOf('\n', end) : content.length);
    
    // Check if line already has this prefix
    if (currentLine.startsWith(prefix)) {
      // Remove prefix
      const newContent = 
        content.substring(0, lineStart) + 
        currentLine.substring(prefix.length) + 
        content.substring(lineStart + currentLine.length);
      
      return {
        newContent,
        newSelection: { start: Math.max(lineStart, start - prefix.length), end: Math.max(lineStart, end - prefix.length) }
      };
    } else {
      // Add prefix
      const newContent = 
        content.substring(0, lineStart) + 
        prefix + currentLine + 
        content.substring(lineStart + currentLine.length);
      
      return {
        newContent,
        newSelection: { start: start + prefix.length, end: end + prefix.length }
      };
    }
  }

  private static replaceText(content: string, start: number, end: number, replacement: string) {
    const newContent = 
      content.substring(0, start) + 
      replacement + 
      content.substring(end);
    
    return {
      newContent,
      newSelection: { start: start + replacement.length, end: start + replacement.length }
    };
  }

  private static insertText(content: string, start: number, insertText: string) {
    const newContent = 
      content.substring(0, start) + 
      insertText + 
      content.substring(start);
    
    return {
      newContent,
      newSelection: { start: start + insertText.length, end: start + insertText.length }
    };
  }

  // Predefined formatting actions
  static getFormatAction(format: string, value?: string): FormatAction | null {
    switch (format) {
      case 'bold':
        return { type: 'wrap', before: '**', after: '**' };
      
      case 'italic':
        return { type: 'wrap', before: '*', after: '*' };
      
      case 'underline':
        return { type: 'wrap', before: '<u>', after: '</u>' };
      
      case 'strikethrough':
        return { type: 'wrap', before: '~~', after: '~~' };
      
      case 'heading':
        const level = value || '1';
        const hashes = '#'.repeat(parseInt(level));
        return { type: 'prefix', before: `${hashes} ` };
      
      case 'blockquote':
        return { type: 'prefix', before: '> ' };
      
      case 'bulletList':
        return { type: 'prefix', before: '- ' };
      
      case 'numberedList':
        return { type: 'prefix', before: '1. ' };
      
      default:
        return null;
    }
  }

  // Special insertions
  static getInsertAction(type: string): FormatAction | null {
    const now = new Date();
    
    switch (type) {
      case 'paragraph':
        return { type: 'insert', insertText: '\n\n' };
      
      case 'sceneBreak':
        return { type: 'insert', insertText: '\n\n* * *\n\n' };
      
      case 'chapterBreak':
        return { type: 'insert', insertText: '\n\n---\n\n' };
      
      case 'date':
        return { type: 'insert', insertText: now.toLocaleDateString() };
      
      case 'note':
        return { type: 'insert', insertText: '\n\n[Note: ]' };
      
      default:
        return null;
    }
  }

  // Calculate word count and other statistics
  static getTextStats(content: string) {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    const characters = content.length;
    const charactersNoSpaces = content.replace(/\s/g, '').length;
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const lines = content.split('\n').length;

    return {
      words: words.length,
      characters,
      charactersNoSpaces,
      paragraphs,
      lines,
      readingTime: Math.ceil(words.length / 200) // Assuming 200 words per minute
    };
  }
}

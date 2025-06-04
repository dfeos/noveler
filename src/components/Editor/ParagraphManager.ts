export class ParagraphManager {
  private content: string;

  constructor(content: string = '') {
    this.content = content;
  }

  // Update content
  updateContent(content: string): void {
    this.content = content;
  }

  // Get all paragraphs
  getParagraphs(): string[] {
    return this.content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  }

  // Get paragraph at cursor position
  getParagraphAtPosition(position: number): { paragraph: string; start: number; end: number; index: number } | null {
    const paragraphs = this.getParagraphs();
    let currentPos = 0;
    
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      const paragraphStart = this.content.indexOf(paragraph, currentPos);
      const paragraphEnd = paragraphStart + paragraph.length;
      
      if (position >= paragraphStart && position <= paragraphEnd) {
        return {
          paragraph,
          start: paragraphStart,
          end: paragraphEnd,
          index: i
        };
      }
      
      currentPos = paragraphEnd + 1;
    }
    
    return null;
  }

  // Navigate to next paragraph
  getNextParagraphPosition(currentPosition: number): number | null {
    const currentParagraph = this.getParagraphAtPosition(currentPosition);
    if (!currentParagraph) return null;
    
    const paragraphs = this.getParagraphs();
    if (currentParagraph.index >= paragraphs.length - 1) return null;
    
    const nextParagraph = paragraphs[currentParagraph.index + 1];
    const nextStart = this.content.indexOf(nextParagraph, currentParagraph.end);
    
    return nextStart;
  }

  // Navigate to previous paragraph
  getPreviousParagraphPosition(currentPosition: number): number | null {
    const currentParagraph = this.getParagraphAtPosition(currentPosition);
    if (!currentParagraph || currentParagraph.index <= 0) return null;
    
    const paragraphs = this.getParagraphs();
    const previousParagraph = paragraphs[currentParagraph.index - 1];
    const previousStart = this.content.indexOf(previousParagraph);
    
    return previousStart;
  }

  // Select entire paragraph
  selectParagraph(position: number): { start: number; end: number } | null {
    const paragraph = this.getParagraphAtPosition(position);
    if (!paragraph) return null;
    
    return {
      start: paragraph.start,
      end: paragraph.end
    };
  }

  // Delete paragraph
  deleteParagraph(position: number): string {
    const paragraph = this.getParagraphAtPosition(position);
    if (!paragraph) return this.content;
    
    // Find the actual paragraph boundaries including whitespace
    let start = paragraph.start;
    let end = paragraph.end;
    
    // Include leading whitespace/newlines
    while (start > 0 && /\s/.test(this.content[start - 1])) {
      start--;
    }
    
    // Include trailing whitespace/newlines
    while (end < this.content.length && /\s/.test(this.content[end])) {
      end++;
    }
    
    return this.content.substring(0, start) + this.content.substring(end);
  }

  // Split paragraph at position
  splitParagraph(position: number): string {
    const paragraph = this.getParagraphAtPosition(position);
    if (!paragraph) return this.content;
    
    const relativePosition = position - paragraph.start;
    const beforeSplit = paragraph.paragraph.substring(0, relativePosition);
    const afterSplit = paragraph.paragraph.substring(relativePosition);
    
    const newContent = 
      this.content.substring(0, paragraph.start) +
      beforeSplit + '\n\n' + afterSplit +
      this.content.substring(paragraph.end);
    
    return newContent;
  }

  // Join with next paragraph
  joinWithNext(position: number): string {
    const currentParagraph = this.getParagraphAtPosition(position);
    if (!currentParagraph) return this.content;
    
    const paragraphs = this.getParagraphs();
    if (currentParagraph.index >= paragraphs.length - 1) return this.content;
    
    const nextParagraph = paragraphs[currentParagraph.index + 1];
    const nextStart = this.content.indexOf(nextParagraph, currentParagraph.end);
    const nextEnd = nextStart + nextParagraph.length;
    
    // Join paragraphs with a single space
    const joinedParagraph = currentParagraph.paragraph + ' ' + nextParagraph;
    
    return (
      this.content.substring(0, currentParagraph.start) +
      joinedParagraph +
      this.content.substring(nextEnd)
    );
  }

  // Move paragraph up
  moveParagraphUp(position: number): { content: string; newPosition: number } | null {
    const currentParagraph = this.getParagraphAtPosition(position);
    if (!currentParagraph || currentParagraph.index <= 0) return null;
    
    const paragraphs = this.getParagraphs();
    const previousParagraph = paragraphs[currentParagraph.index - 1];
    
    // Swap paragraphs
    const newParagraphs = [...paragraphs];
    newParagraphs[currentParagraph.index - 1] = currentParagraph.paragraph;
    newParagraphs[currentParagraph.index] = previousParagraph;
    
    const newContent = newParagraphs.join('\n\n');
    const newPosition = newContent.indexOf(currentParagraph.paragraph);
    
    return { content: newContent, newPosition };
  }

  // Move paragraph down
  moveParagraphDown(position: number): { content: string; newPosition: number } | null {
    const currentParagraph = this.getParagraphAtPosition(position);
    if (!currentParagraph || currentParagraph.index >= this.getParagraphs().length - 1) return null;
    
    const paragraphs = this.getParagraphs();
    const nextParagraph = paragraphs[currentParagraph.index + 1];
    
    // Swap paragraphs
    const newParagraphs = [...paragraphs];
    newParagraphs[currentParagraph.index] = nextParagraph;
    newParagraphs[currentParagraph.index + 1] = currentParagraph.paragraph;
    
    const newContent = newParagraphs.join('\n\n');
    const newPosition = newContent.indexOf(currentParagraph.paragraph);
    
    return { content: newContent, newPosition };
  }

  // Duplicate paragraph
  duplicateParagraph(position: number): { content: string; newPosition: number } | null {
    const paragraph = this.getParagraphAtPosition(position);
    if (!paragraph) return null;
    
    const duplicatedContent = paragraph.paragraph + '\n\n' + paragraph.paragraph;
    const newContent = 
      this.content.substring(0, paragraph.start) +
      duplicatedContent +
      this.content.substring(paragraph.end);
    
    const newPosition = paragraph.start + paragraph.paragraph.length + 2; // +2 for \n\n
    
    return { content: newContent, newPosition };
  }

  // Get paragraph statistics
  getParagraphStats(): {
    totalParagraphs: number;
    averageWordsPerParagraph: number;
    shortestParagraph: number;
    longestParagraph: number;
  } {
    const paragraphs = this.getParagraphs();
    const wordCounts = paragraphs.map(p => p.trim().split(/\s+/).filter(w => w.length > 0).length);
    
    return {
      totalParagraphs: paragraphs.length,
      averageWordsPerParagraph: wordCounts.reduce((sum, count) => sum + count, 0) / paragraphs.length || 0,
      shortestParagraph: Math.min(...wordCounts) || 0,
      longestParagraph: Math.max(...wordCounts) || 0
    };
  }

  // Find and replace in paragraphs
  findAndReplace(searchTerm: string, replacement: string, options: {
    caseSensitive?: boolean;
    wholeWords?: boolean;
    regex?: boolean;
  } = {}): string {
    let { caseSensitive = false, wholeWords = false, regex = false } = options;
    
    let searchPattern: RegExp;
    
    if (regex) {
      const flags = caseSensitive ? 'g' : 'gi';
      searchPattern = new RegExp(searchTerm, flags);
    } else {
      let escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (wholeWords) {
        escapedTerm = `\\b${escapedTerm}\\b`;
      }
      const flags = caseSensitive ? 'g' : 'gi';
      searchPattern = new RegExp(escapedTerm, flags);
    }
    
    return this.content.replace(searchPattern, replacement);
  }

  // Format paragraph (apply consistent spacing)
  formatParagraphs(): string {
    const paragraphs = this.getParagraphs();
    return paragraphs
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .join('\n\n');
  }

  // Get content with paragraph numbers
  getContentWithNumbers(): string {
    const paragraphs = this.getParagraphs();
    return paragraphs
      .map((p, index) => `[${index + 1}] ${p}`)
      .join('\n\n');
  }
}

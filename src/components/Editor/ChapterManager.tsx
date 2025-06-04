import React, { useState } from 'react';

export interface Chapter {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  lastModified: string;
  order: number;
}

export interface ChapterManagerProps {
  chapters: Chapter[];
  currentChapterId: string | null;
  onChapterSelect: (chapterId: string) => void;
  onChapterCreate: () => void;
  onChapterDelete: (chapterId: string) => void;
  onChapterRename: (chapterId: string, newTitle: string) => void;
  onChapterReorder: (fromIndex: number, toIndex: number) => void;
}

const ChapterManager: React.FC<ChapterManagerProps> = ({
  chapters,
  currentChapterId,
  onChapterSelect,
  onChapterCreate,
  onChapterDelete,
  onChapterRename,
  onChapterReorder
}) => {
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleRename = (chapterId: string, currentTitle: string) => {
    setEditingChapterId(chapterId);
    setEditingTitle(currentTitle);
  };

  const handleRenameSubmit = () => {
    if (editingChapterId && editingTitle.trim()) {
      onChapterRename(editingChapterId, editingTitle.trim());
    }
    setEditingChapterId(null);
    setEditingTitle('');
  };

  const handleRenameCancel = () => {
    setEditingChapterId(null);
    setEditingTitle('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRenameSubmit();
    } else if (e.key === 'Escape') {
      handleRenameCancel();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="chapter-manager">
      <div className="chapter-manager-header">
        <h3>Chapters</h3>
        <button 
          onClick={onChapterCreate}
          className="btn-create-chapter"
          title="Add New Chapter"
        >
          ➕ New Chapter
        </button>
      </div>

      <div className="chapter-list">
        {chapters.length === 0 ? (
          <div className="no-chapters">
            <p>No chapters yet.</p>
            <button onClick={onChapterCreate} className="btn-create-first">
              Create your first chapter
            </button>
          </div>
        ) : (
          chapters
            .sort((a, b) => a.order - b.order)
            .map((chapter, index) => (
              <div
                key={chapter.id}
                className={`chapter-item ${currentChapterId === chapter.id ? 'active' : ''}`}
                onClick={() => onChapterSelect(chapter.id)}
              >
                <div className="chapter-main">
                  <div className="chapter-number">
                    {index + 1}
                  </div>
                  
                  <div className="chapter-content">
                    {editingChapterId === chapter.id ? (
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={handleRenameSubmit}
                        onKeyDown={handleKeyDown}
                        className="chapter-title-input"
                        autoFocus
                      />
                    ) : (
                      <div className="chapter-title">
                        {chapter.title || `Chapter ${index + 1}`}
                      </div>
                    )}
                    
                    <div className="chapter-meta">
                      <span className="word-count">
                        {chapter.wordCount.toLocaleString()} words
                      </span>
                      <span className="last-modified">
                        {formatDate(chapter.lastModified)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="chapter-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename(chapter.id, chapter.title);
                    }}
                    className="btn-action"
                    title="Rename Chapter"
                  >
                    ✏️
                  </button>
                  
                  {chapters.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this chapter?')) {
                          onChapterDelete(chapter.id);
                        }
                      }}
                      className="btn-action btn-danger"
                      title="Delete Chapter"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))
        )}
      </div>

      <div className="chapter-stats">
        <div className="total-stats">
          <div className="stat">
            <span className="stat-label">Total Chapters:</span>
            <span className="stat-value">{chapters.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Words:</span>
            <span className="stat-value">
              {chapters.reduce((total, chapter) => total + chapter.wordCount, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterManager;

import React from 'react';
import ToolbarButton from './ToolbarButton';

export interface FormattingToolbarProps {
  onFormat: (format: string, value?: string) => void;
  onInsert: (type: string) => void;
  wordCount: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onToggleToolbar: () => void;
  onSave: () => void;
}

const FormattingToolbar: React.FC<FormattingToolbarProps> = ({
  onFormat,
  onInsert,
  wordCount,
  isFullscreen,
  onToggleFullscreen,
  onToggleToolbar,
  onSave
}) => {
  return (
    <div className="editor-toolbar">
      <div className="toolbar-left">
        {/* Text Formatting */}
        <div className="toolbar-group">
          <ToolbarButton
            icon="B"
            title="Bold (Ctrl+B)"
            onClick={() => onFormat('bold')}
            className="bold-btn"
          />
          <ToolbarButton
            icon="I"
            title="Italic (Ctrl+I)"
            onClick={() => onFormat('italic')}
            className="italic-btn"
          />
          <ToolbarButton
            icon="U"
            title="Underline (Ctrl+U)"
            onClick={() => onFormat('underline')}
          />
          <ToolbarButton
            icon="S"
            title="Strikethrough"
            onClick={() => onFormat('strikethrough')}
          />
        </div>

        <div className="toolbar-separator"></div>

        {/* Headings */}
        <div className="toolbar-group">
          <ToolbarButton
            label="H1"
            title="Heading 1"
            onClick={() => onFormat('heading', '1')}
          />
          <ToolbarButton
            label="H2"
            title="Heading 2"
            onClick={() => onFormat('heading', '2')}
          />
          <ToolbarButton
            label="H3"
            title="Heading 3"
            onClick={() => onFormat('heading', '3')}
          />
        </div>

        <div className="toolbar-separator"></div>

        {/* Lists and Structure */}
        <div className="toolbar-group">
          <ToolbarButton
            icon="•"
            title="Bullet List"
            onClick={() => onFormat('bulletList')}
          />
          <ToolbarButton
            icon="1."
            title="Numbered List"
            onClick={() => onFormat('numberedList')}
          />
          <ToolbarButton
            icon="❝"
            title="Blockquote"
            onClick={() => onFormat('blockquote')}
          />
        </div>

        <div className="toolbar-separator"></div>

        {/* Paragraphs and Breaks */}
        <div className="toolbar-group">
          <ToolbarButton
            icon="¶"
            title="New Paragraph"
            onClick={() => onInsert('paragraph')}
          />
          <ToolbarButton
            icon="—"
            title="Scene Break"
            onClick={() => onInsert('sceneBreak')}
          />
          <ToolbarButton
            icon="***"
            title="Chapter Break"
            onClick={() => onInsert('chapterBreak')}
          />
        </div>

        <div className="toolbar-separator"></div>

        {/* Special Insertions */}
        <div className="toolbar-group">
          <ToolbarButton
            icon="📅"
            title="Insert Date"
            onClick={() => onInsert('date')}
          />
          <ToolbarButton
            icon="💭"
            title="Insert Note"
            onClick={() => onInsert('note')}
          />
        </div>

        <div className="toolbar-separator"></div>

        {/* Save */}
        <ToolbarButton
          icon="💾"
          label="Save"
          title="Save (Ctrl+S)"
          onClick={onSave}
          className="save-btn"
        />
      </div>

      <div className="toolbar-right">
        <span className="word-count">{wordCount.toLocaleString()} words</span>
        <ToolbarButton
          icon="👁️"
          title="Toggle Toolbar"
          onClick={onToggleToolbar}
        />
        <ToolbarButton
          icon={isFullscreen ? "⬛" : "⬜"}
          title="Fullscreen (Ctrl+Shift+Enter)"
          onClick={onToggleFullscreen}
        />
      </div>
    </div>
  );
};

export default FormattingToolbar;

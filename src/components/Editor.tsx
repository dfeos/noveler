import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

const Editor: React.FC = () => {
  // This holds the current text content of the editor
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <CodeMirror
        value={value}
        height="100%"
        extensions={[markdown()]}     // Enables Markdown mode
        theme={oneDark}               // One Dark theme for cool vibes
        onChange={(val) => setValue(val)}  // Updates state on text change
      />
    </div>
  );
};

export default Editor;

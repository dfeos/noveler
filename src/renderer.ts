import { createEditor, onChange } from './modules/editor.js';

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('editor');
  console.log('[Container]', container); // ← should NOT be null

  if (container) {
    createEditor(container);
    console.log('[Editor initialized]');
  } else {
    console.warn('[Editor container not found]');
  }
});

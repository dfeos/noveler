let editor: any;
declare const monaco: any;

export function createEditor(container: HTMLElement, content: string = '') {
  (window as any).require.config({
    paths: {
      vs: 'https://unpkg.com/monaco-editor@0.44.0/min/vs'
    }
  });

  (window as any).require(['vs/editor/editor.main'], () => {
    editor = monaco.editor.create(container, {
      value: content,
      language: 'markdown',
      theme: 'vs-dark',
      automaticLayout: true,
      fontSize: 16,
      minimap: { enabled: false }
    });
  });
}

export function getContent(): string {
  return editor?.getValue?.() ?? '';
}

export function setContent(content: string): void {
  editor?.setValue?.(content);
}

export function onChange(handler: (value: string) => void): void {
  editor?.onDidChangeModelContent?.(() => {
    handler(getContent());
  });
}

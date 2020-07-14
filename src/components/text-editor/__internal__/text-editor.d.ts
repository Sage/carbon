import * as React from 'react';

export interface TextEditorProps {
  characterLimit?: number;
  labelText: string;
  onChange: (event: object) => void;
  onCancel?: () => void;
  onSave?: () => void;
  value: object;
}

declare const TextEditor: React.FunctionComponent<TextEditorProps>;

export default TextEditor;

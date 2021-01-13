import * as React from 'react';

export interface TextEditorProps {
  characterLimit?: number;
  labelText: string;
  onChange: (event: object) => void;
  /** Additional elements to be rendered in the Editor Toolbar, e.g. Save and Cancel Button */
  toolbarElements?: React.ReactNode;
  value: object;
  /** Flag to configure component as mandatory */
  required?: boolean;
  error?: string;
  warning?: string;
  info?: string;
}

declare const TextEditor: React.FunctionComponent<TextEditorProps>;

export default TextEditor;

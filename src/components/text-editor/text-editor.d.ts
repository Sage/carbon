import * as React from "react";
import { MarginSpacingProps } from "../../utils/helpers/options-helper";
import { Editor, EditorState, ContentState } from "draft-js";

export interface TextEditorProps extends MarginSpacingProps {
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
  rows?: number;
}

declare function TextEditor(props: TextEditorProps & React.RefAttributes<Editor>): JSX.Element;

export {
  EditorState as TextEditorState,
  ContentState as TextEditorContentState,
};
export default TextEditor;

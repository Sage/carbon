import * as React from "react";
import { MarginProps } from "styled-system";
import { Editor, EditorState, ContentState } from "draft-js";

export interface TextEditorProps extends MarginProps {
  /** The maximum characters that the input will accept */
  characterLimit?: number;
  /** The text for the editor's label */
  labelText: string;
  /** onChange callback to control value updates */
  onChange: (event: object) => void;
  /** Additional elements to be rendered in the Editor Toolbar, e.g. Save and Cancel Button */
  toolbarElements?: React.ReactNode;
  /** The value of the input, this is an EditorState immutable object */
  value: object;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Message to be displayed when there is an error */
  error?: string;
  /** Message to be displayed when there is a warning */
  warning?: string;
  /** Message to be displayed when there is an info */
  info?: string;
  /** Number greater than 2 multiplied by line-height (21px) to override the default min-height of the editor */
  rows?: number;
}

declare function TextEditor(props: TextEditorProps & React.RefAttributes<Editor>): JSX.Element;

export {
  EditorState as TextEditorState,
  ContentState as TextEditorContentState,
};
export default TextEditor;

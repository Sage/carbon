import * as React from "react";
import { MarginProps } from "styled-system";
import { Editor, EditorState, ContentState } from "draft-js";
import { Expand } from "../../__internal__/utils/helpers/types";

export interface TextEditorProps extends Expand<MarginProps> {
  /** The maximum characters that the input will accept */
  characterLimit?: number;
  /** The text for the editor's label */
  labelText: string;
  /** onChange callback to control value updates */
  onChange: (event: Record<string, unknown>) => void;
  /** Additional elements to be rendered in the Editor Toolbar, e.g. Save and Cancel Button */
  toolbarElements?: React.ReactNode;
  /** The value of the input, this is an EditorState immutable object */
  value: Record<string, unknown>;
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
  /** The previews to display of any links added to the Editor */
  previews?: React.ReactNode[];
  /** Callback to report a url when a link is added */
  onLinkAdded?: (url: string) => void;
}

declare function TextEditor(
  props: TextEditorProps & React.RefAttributes<Editor>
): JSX.Element;

export {
  EditorState as TextEditorState,
  ContentState as TextEditorContentState,
};
export default TextEditor;

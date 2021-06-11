import * as React from "react";
import { MarginProps } from "styled-system";

export interface NoteProps  extends MarginProps {
  /**  The rich text content to display in the Note */
  noteContent: object;
  /** Set a percentage-based width for the whole Note component, relative to its parent. */
  width?: number;
  /** renders a control for the Note */
  inlineControl?: React.ReactNode;
  /** Adds a Title to the Note */
  title?: string;
  /** Adds a name to the Note footer */
  name: string;
  /** Adds a created on date to the Note footer */
  createdDate: string;
  /** Adds a status and tooltip to the Note footer */
  status?: {
    text: string;
    timeStamp: string;
  };
}

declare function Note(props: NoteProps): JSX.Element;

export default Note;

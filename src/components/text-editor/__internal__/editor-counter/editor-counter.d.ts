import * as React from "react";

export interface EditorCounterProps {
  count: number;
  limit: number;
  error?: string;
  warning?: string;
  info?: string;
}

declare function EditorCounter(props: EditorCounterProps): JSX.Element;

export default EditorCounter;

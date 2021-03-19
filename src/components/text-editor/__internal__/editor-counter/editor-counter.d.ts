import * as React from "react";

export interface EditorCounterProps {
  count: number;
  limit: number;
  error?: string;
  warning?: string;
  info?: string;
}

declare const EditorCounter: React.FunctionComponent<EditorCounterProps>;

export default EditorCounter;

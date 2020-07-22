import * as React from 'react';

export interface EditorCounterProps {
  count: number;
  limit: number;
}

declare const EditorCounter: React.FunctionComponent<EditorCounterProps>;

export default EditorCounter;

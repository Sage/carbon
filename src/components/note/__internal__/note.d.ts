import * as React from 'react';

export interface NoteProps {
   noteContent: object;
   width?: number;
   inlineControl?: React.ReactNode;
   title?: string;
   name?: string;
   status?: {
    text?: string;
    timeStamp?: string;
  };
}

declare const Note: React.ComponentType<NoteProps>;
export default Note;

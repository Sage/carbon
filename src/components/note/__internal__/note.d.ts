import * as React from 'react';
import { MarginSpacingProps } from '../../../utils/helpers/options-helper';

export interface NoteProps extends MarginSpacingProps {
   noteContent: object;
   width?: number;
   inlineControl?: React.ReactNode;
   title?: string;
   name: string;
   createdDate: string;
   status?: {
    text: string;
    timeStamp: string;
  };
}

declare const Note: React.ComponentType<NoteProps>;
export default Note;

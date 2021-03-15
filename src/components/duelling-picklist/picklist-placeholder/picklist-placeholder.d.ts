import * as React from 'react';

export interface PicklistPlaceholderProps {
  /** Text to be displayed when list is empty */
  text: string;
}

declare const PicklistPlaceholder: React.FunctionComponent<PicklistPlaceholderProps>;
export default PicklistPlaceholder;

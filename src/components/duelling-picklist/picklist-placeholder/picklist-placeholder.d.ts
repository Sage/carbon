import * as React from "react";

export interface PicklistPlaceholderProps {
  /** Text to be displayed when list is empty */
  text: string;
}

declare function PicklistPlaceholder(props: PicklistPlaceholderProps): JSX.Element;

export default PicklistPlaceholder;

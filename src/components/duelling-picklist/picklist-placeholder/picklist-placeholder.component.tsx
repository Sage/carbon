import React from "react";

import { StyledPicklistPlaceholder } from "../duelling-picklist.style";

export interface PicklistPlaceholderProps {
  /** Text to be displayed when list is empty */
  text: string;
}

export const PicklistPlaceholder = ({ text }: PicklistPlaceholderProps) => (
  <StyledPicklistPlaceholder data-element="picklist-placeholder">
    {text}
  </StyledPicklistPlaceholder>
);

export default PicklistPlaceholder;

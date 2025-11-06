import React from "react";

import { StyledPicklistPlaceholder } from "../duelling-picklist.style";

/**
 * @deprecated `PicklistPlaceholder` has been deprecated. See the Carbon documentation for migration details.
 */
export interface PicklistPlaceholderProps {
  /** Text to be displayed when list is empty */
  text: string;
}

/**
 * @deprecated `PicklistPlaceholder` has been deprecated. See the Carbon documentation for migration details.
 */
export const PicklistPlaceholder = ({ text }: PicklistPlaceholderProps) => {
  return (
    <StyledPicklistPlaceholder data-element="picklist-placeholder">
      {text}
    </StyledPicklistPlaceholder>
  );
};

export default PicklistPlaceholder;

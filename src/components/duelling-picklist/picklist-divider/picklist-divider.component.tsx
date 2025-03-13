import React from "react";

import StyledPicklistDivider from "./picklist-divider.style";

export type PicklistDividerProps = React.ComponentProps<
  typeof StyledPicklistDivider
>;

const PicklistDivider = (props: PicklistDividerProps) => (
  <StyledPicklistDivider {...props} data-element="picklist-divider" />
);

export default PicklistDivider;

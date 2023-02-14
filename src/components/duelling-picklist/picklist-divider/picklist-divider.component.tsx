import React from "react";
import { StyledComponentProps } from "styled-components";

import StyledPicklistDivider from "./picklist-divider.style";

export type PicklistDividerProps = StyledComponentProps<
  "div",
  Record<string, unknown>,
  Record<string, unknown>,
  ""
>;

const PicklistDivider = (props: PicklistDividerProps) => (
  <StyledPicklistDivider {...props} data-element="picklist-divider" />
);

export default PicklistDivider;

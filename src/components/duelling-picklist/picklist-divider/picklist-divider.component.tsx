import React from "react";
import { StyledComponentProps } from "styled-components";

import StyledPicklistDivider from "./picklist-divider.style";

/**
 * @deprecated `PicklistDivider` has been deprecated. See the Carbon documentation for migration details.
 */
export type PicklistDividerProps = StyledComponentProps<
  "div",
  Record<string, unknown>,
  Record<string, unknown>,
  ""
>;

/**
 * @deprecated `PicklistDivider` has been deprecated. See the Carbon documentation for migration details.
 */
const PicklistDivider = (props: PicklistDividerProps) => (
  <StyledPicklistDivider {...props} data-element="picklist-divider" />
);

export default PicklistDivider;

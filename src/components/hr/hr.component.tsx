import React from "react";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import StyledHr from "./hr.style";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";

import Logger from "../../__internal__/utils/logger";

/**
 * @deprecated `Hr` has been deprecated. See the Carbon documentation for migration details.
 */
export interface HrProps extends MarginProps, TagProps {
  /** Set whether the component should be recognised by assistive technologies */
  "aria-hidden"?: "true" | "false";
  /** Breakpoint for adaptive left and right margins (below the breakpoint they go to 0).
   * Enables the adaptive behaviour when set */
  adaptiveMxBreakpoint?: number;
  /** Set the height of the component. Accepts one of "small", "medium", or "large" */
  height?: "small" | "medium" | "large";
  /** Set the color variant of the horizontal rule. Use "typical" for standard styling or "inverse" for use in darker backgrounds */
  type?: "typical" | "inverse";
}

let deprecatedWarnTriggered = false;

/**
 * @deprecated `Hr` has been deprecated. See the Carbon documentation for migration details.
 */
const Hr = ({
  adaptiveMxBreakpoint,
  ml,
  mr,
  "aria-hidden": ariaHidden,
  type = "typical",
  height = "small",
  ...rest
}: HrProps): JSX.Element => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    Logger.deprecate(
      "`Hr` is deprecated and will soon be removed. Please use `Divider` instead.",
    );
  }

  const largeScreen = useIsAboveBreakpoint(adaptiveMxBreakpoint);
  let marginLeft = ml;
  let marginRight = mr;
  if (adaptiveMxBreakpoint && !largeScreen) {
    marginLeft = 0;
    marginRight = 0;
  }

  return (
    <StyledHr
      aria-hidden={ariaHidden}
      height={height}
      $type={type}
      ml={marginLeft}
      mr={marginRight}
      mt={rest.mt || 3}
      mb={rest.mb || 3}
      {...rest}
      {...tagComponent("hr", rest)}
    />
  );
};

export default Hr;

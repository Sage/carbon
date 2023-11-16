import React from "react";
import { MarginProps, PositionProps } from "styled-system";

import StyledHr from "./hr.style";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";

export interface HrProps extends MarginProps, PositionProps {
  /** Breakpoint for adaptive left and right margins (below the breakpoint they go to 0).
   * Enables the adaptive behaviour when set */
  adaptiveMxBreakpoint?: number;
  /** Sets the element width, accepts any valid CSS string */
  width?: string;
}

export const Hr = ({
  adaptiveMxBreakpoint,
  ml,
  mr,
  width = "inherit",
  ...rest
}: HrProps): JSX.Element => {
  const largeScreen = useIsAboveBreakpoint(adaptiveMxBreakpoint);
  let marginLeft = ml;
  let marginRight = mr;
  if (adaptiveMxBreakpoint && !largeScreen) {
    marginLeft = 0;
    marginRight = 0;
  }

  return (
    <StyledHr
      data-component="hr"
      ml={marginLeft}
      mr={marginRight}
      mt={rest.mt || 3}
      mb={rest.mb || 3}
      width={width}
      {...rest}
    />
  );
};

export default Hr;

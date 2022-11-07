import React from "react";
import { MarginProps } from "styled-system";

import { Expand } from "../../__internal__/utils/helpers/types";
import StyledHr from "./hr.style";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";

export interface HrProps extends Expand<MarginProps> {
  /** Breakpoint for adaptive left and right margins (below the breakpoint they go to 0).
   * Enables the adaptive behaviour when set */
  adaptiveMxBreakpoint?: number;
}

export const Hr = ({
  adaptiveMxBreakpoint,
  ml,
  mr,
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
      {...rest}
    />
  );
};

export default Hr;

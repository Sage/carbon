import * as React from "react";
import { SpacingProps } from "../../utils/helpers/options-helper";

export interface HrProps extends SpacingProps {
  /** Breakpoint for adaptive left and right margins (below the breakpoint they go to 0).
   * Enables the adaptive behaviour when set
   */
  adaptiveMxBreakpoint?: number;
}

declare const Hr: React.FunctionComponent<HrProps>;
export default Hr;

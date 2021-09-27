import { SpaceProps } from "styled-system";

export interface HrProps extends SpaceProps {
  /** Breakpoint for adaptive left and right margins (below the breakpoint they go to 0).
   * Enables the adaptive behaviour when set
   */
  adaptiveMxBreakpoint?: number;
}

declare function Hr(props: HrProps): JSX.Element;

export default Hr;

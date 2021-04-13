import * as React from 'react';
import { MarginSpacingProps } from '../../utils/helpers/options-helper';

export interface HrProps extends MarginSpacingProps {
  /** Breakpoint for adaptive left and right margins (below the breakpoint they go to 0).
   * Enables the adaptive behaviour when set
   */
  adaptiveMxBreakpoint?: number;
}

declare const Hr: React.FunctionComponent<HrProps>;
export default Hr;

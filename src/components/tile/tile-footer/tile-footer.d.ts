import * as React from "react";
import { SpacingProps } from "utils/helpers/options-helper/options-helper";

export interface TileFooterProps extends SpacingProps {
  /** set which background color variant should be used */
  variant?: "default" | "transparent";
  children?: React.ReactNode;
}

declare const TileFooter: React.FunctionComponent<TileFooterProps>;

export default TileFooter;

import * as React from "react";
import { SpacingProps } from "utils/helpers/options-helper/options-helper";

export interface TileFooterProps extends SpacingProps {
  /** set which background color variant should be used */
  variant?: "default" | "transparent";
}

declare function TileFooter(props: React.PropsWithChildren<TileFooterProps>): JSX.Element;

export default TileFooter;

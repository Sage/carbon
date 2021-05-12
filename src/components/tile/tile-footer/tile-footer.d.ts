import * as React from "react";
import { SpaceProps } from "styled-system";

export interface TileFooterProps extends SpaceProps {
  /** set which background color variant should be used */
  variant?: "default" | "transparent";
}

declare function TileFooter(props: React.PropsWithChildren<TileFooterProps>): JSX.Element;

export default TileFooter;

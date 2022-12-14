import * as React from "react";
import { PaddingProps } from "styled-system";

export interface TileFooterProps extends PaddingProps {
  /** set which background color variant should be used */
  variant?: "default" | "black" | "transparent";
}

declare function TileFooter(
  props: React.PropsWithChildren<TileFooterProps>
): JSX.Element;

export default TileFooter;

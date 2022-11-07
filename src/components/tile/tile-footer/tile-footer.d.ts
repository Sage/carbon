import * as React from "react";
import { PaddingProps } from "styled-system";
import { Expand } from "../../../__internal__/utils/helpers/types";

export interface TileFooterProps extends Expand<PaddingProps> {
  /** set which background color variant should be used */
  variant?: "default" | "transparent";
}

declare function TileFooter(
  props: React.PropsWithChildren<TileFooterProps>
): JSX.Element;

export default TileFooter;

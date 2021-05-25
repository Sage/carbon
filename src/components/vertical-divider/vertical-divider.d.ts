import * as React from "react";
import { SpaceProps } from "styled-system";

export interface VerticalDividerPropTypes extends SpaceProps {
  h?: number | string;
  displayInline?: boolean;
  /** the supported rage is 1-100  */
  tint?: string;
}

declare function VerticalDivider(props: VerticalDividerPropTypes): JSX.Element;

export default VerticalDivider;

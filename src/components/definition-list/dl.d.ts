import * as React from "react";
import { SpaceProps } from "styled-system";
export interface DlProps extends SpaceProps {
  /** This string will specify the text align styling of the `<dt></dt>`. */
  dtTextAlign?: "left" | "center" | "right";
  /** This string will specify the text align styling of the `<dd></dd>`. */
  ddTextAlign?: "left" | "center" | "right";
  /** This value will specify the width of the `StyledDtDiv` as a percentage. */
  w?: number;
  /** prop to render children. */
  children: React.ReactNode;
}

declare function DlComponent(props: DlProps): JSX.Element;

export default DlComponent;

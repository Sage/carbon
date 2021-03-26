import * as React from "react";
import { SpacingProps } from "../../utils/helpers/options-helper";
export interface DtProps extends SpacingProps {
  /** prop for dt text */
  children: string;
}

declare function DtComponent(props: DtProps): JSX.Element;

export default DtComponent;

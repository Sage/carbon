import * as React from "react";
import { SpacingProps } from "../../../utils/helpers/options-helper";

export interface FlatTableHeaderProps extends SpacingProps {
  /** Content alignment */
  align?: "center" | "left" | "right";
  children?: React.ReactNode | string;
  /** Number of columns that a header cell should span */
  colspan?: number | string;
  /** Number of rows that a header cell should span */
  rowspan?: number | string;
  /** Column width, pass a number to set a fixed width in pixels */
  width?: number;
}

declare const FlatTableHeader: React.FunctionComponent<FlatTableHeaderProps>;

export default FlatTableHeader;

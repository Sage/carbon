import * as React from "react";
import { SpaceProps } from "styled-system";

export interface FlatTableRowHeaderProps extends SpaceProps {
  /** Content alignment */
  align?: string;
  children?: React.ReactNode | string;
  /** Column width, pass a number to set a fixed width in pixels */
  width?: number;
  /** Truncate cell content and add ellipsis to any text that overflows */
  truncate?: boolean;
  /** Title text to display if cell content truncates */
  title?: string;
}

declare function FlatTableRowHeader(props: FlatTableRowHeaderProps): JSX.Element;

export default FlatTableRowHeader;

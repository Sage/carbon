import * as React from "react";
import { PaddingProps } from "styled-system";
import * as OptionsHelper from "../../../utils/helpers/options-helper";

export interface FlatTableHeaderProps extends PaddingProps {
  /** Content alignment */
  align?: OptionsHelper.AlignFull;
  children?: React.ReactNode | string;
  /** Number of columns that a header cell should span */
  colspan?: number | string;
  /** Number of rows that a header cell should span */
  rowspan?: number | string;
  /** Column width, pass a number to set a fixed width in pixels */
  width?: number;
}

declare function FlatTableHeader(props: FlatTableHeaderProps): JSX.Element;

export default FlatTableHeader;

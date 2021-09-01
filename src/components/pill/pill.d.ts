import * as React from "react";
import { MarginProps } from "styled-system";

export interface PillProps extends MarginProps {
  /** Override color variant, provide any color from palette or any valid css color value. */
  borderColor?: string;
  /** Change the color of a status pill. */
  colorVariant?: "neutral" | "negative" | "positive" | "warning";
  /** The content to display inside of the pill.  */
  children: string;
  /** Fills the pill background with colour. When fill is false only the border is coloured. */
  fill?: boolean;
  /** Callback function for when the pill is clicked. */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  /** Callback function for when the remove icon is clicked. */
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  /** Sets the type of pill in use. */
  pillRole?: "tag" | "status";
  size?: "S" | "M" | "L" | "XL";
}

declare function Pill(props: PillProps): JSX.Element;

export default Pill;

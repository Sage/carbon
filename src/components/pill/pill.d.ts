import * as React from "react";
import { MarginProps } from "styled-system";

export interface PillProps extends MarginProps {
  /** Override color variant, provide any color from palette or any valid css color value. */
  borderColor?: string;
  /** The content to display inside of the pill.  */
  children: string;
  /** Change the color of a status pill. */
  colorVariant?: "neutral" | "negative" | "positive" | "warning";
  /** Fills the pill background with colour. When fill is false only the border is coloured. */
  fill?: boolean;
  /** Sets the max-width of the pill. */
  maxWidth?: string;
  /** Callback function for when the pill is clicked. */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  /** Callback function for when the remove icon is clicked. */
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  /** Sets the type of pill in use. */
  pillRole?: "tag" | "status";
  /** Sets the size of the pill. */
  size?: "S" | "M" | "L" | "XL";
  /** Allow the text within pill to wrap. */
  wrapText?: boolean;
}

declare function Pill(props: PillProps): JSX.Element;

export default Pill;

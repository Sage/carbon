import * as React from "react";
import { MarginSpacingProps } from "../../utils/helpers/options-helper";

export interface PillProps extends MarginSpacingProps {
  colorVariant?: "neutral" | "negative" | "positive" | "warning";
  borderColor?: string;
  children: string;
  fill?: boolean;
  pillRole?: "tag" | "status";
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  size?: "S" | "M" | "L" | "XL";
}

declare const Pill: React.ComponentClass<PillProps>;

export default Pill;

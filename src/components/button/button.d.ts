import * as React from "react";
import { SpaceProps } from "styled-system";
import * as OptionsHelper from "../../utils/helpers/options-helper/options-helper";

export interface ButtonProps extends SpaceProps {
  /** Prop to specify the aria-label text.
   *  Only to be used in Button when only an icon is rendered.
   * This is required to comply with WCAG 4.1.2 - Buttons must have discernible text
   */
  "aria-label"?: string;
  /** [Legacy] Button types for legacy theme: "primary" | "secondary" */
  as?: OptionsHelper.ButtonTypes;
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "darkBackground" */
  buttonType?: OptionsHelper.ButtonTypes;
  /** The text the button displays */
  children?: React.ReactNode;
  /** Apply disabled state to the button */
  disabled?: boolean;
  /** Apply destructive style to the button */
  destructive?: boolean;
  /** Ref to be forwarded */
  forwardRef?: () => void;
  /** Apply fullWidth style to the button */
  fullWidth?: boolean;
  /** Used to transform button into anchor */
  href?: string;
  /** Defines an Icon position related to the children: "before" | "after" */
  iconPosition?: "before" | "after";
  /** Provides a tooltip message when the icon is hovered. */
  iconTooltipMessage?: string;
  /** Provides positioning when the tooltip is displayed. */
  iconTooltipPosition?: string;
  /** Defines an Icon type within the button */
  iconType?: OptionsHelper.IconTypes;
  /** If provided, the text inside a button will not wrap */
  noWrap?: boolean;
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size?: "small" | "medium" | "large";
  /** Second text child, renders under main text, only when size is "large" */
  subtext?: string;
}

declare const Button: React.ComponentType<
  ButtonProps | React.HTMLProps<HTMLButtonElement>
>;

export default Button;

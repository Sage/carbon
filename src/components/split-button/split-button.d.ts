import * as React from "react";
import { MarginProps } from "styled-system";

export interface SplitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    MarginProps {
  /** Set align of the rendered content */
  align?: "left" | "right";
  /** Button type: "primary" | "secondary" */
  buttonType?: "primary" | "secondary";
  /** The additional button to display. */
  children: React.ReactNode;
  /** A custom value for the data-element attribute */
  "data-element"?: string;
  /** A custom value for the data-role attribute */
  "data-role"?: string;
  /** Gives the button a disabled state. */
  disabled?: boolean;
  /** Defines an Icon position within the button: "before" | "after" */
  iconPosition?: "before" | "after";
  /** The size of the buttons in the SplitButton. */
  size?: "small" | "medium" | "large";
  /** The text to be displayed in the SplitButton. */
  text: string;
}

declare function SplitButton(props: SplitButtonProps): JSX.Element;

export default SplitButton;

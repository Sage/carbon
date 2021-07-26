import * as React from "react";

export interface SplitButtonProps {
  /** Set align of the rendered content */
  align?: "left" | "right";
  /** Button type: "primary" | "secondary" for legacy theme */
  as?: "primary" | "secondary";
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

declare class SplitButton extends React.Component<SplitButtonProps> {}

export default SplitButton;

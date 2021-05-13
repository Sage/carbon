import * as React from "react";
import * as OptionsHelper from "../../utils/helpers/options-helper/options-helper";

export interface SplitButtonProps {
  /** Set align of the rendered content */
  align?: OptionsHelper.AlignBinaryType;
  /** Button type: "primary" | "secondary" for legacy theme */
  as?: OptionsHelper.ThemesBinary;
  /** Button type: "primary" | "secondary" */
  buttonType?: OptionsHelper.ThemesBinary;
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
  size?: OptionsHelper.SizesRestricted;
  /** The text to be displayed in the SplitButton. */
  text: string;
}

declare class SplitButton extends React.Component<SplitButtonProps> {}

export default SplitButton;

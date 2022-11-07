import * as React from "react";
import { MarginProps } from "styled-system";
import { Expand } from "../../__internal__/utils/helpers/types";

export interface AdvancedColor {
  label: string;
  value: string;
}

export interface AdvancedColorPickerPropTypes extends Expand<MarginProps> {
  /** Prop to specify the aria-describedby property of the component */
  "aria-describedby"?: string;
  /** Prop to specify the aria-label of the component */
  "aria-label"?: string;
  /** Prop to specify the aria-labeledby property of the component */
  "aria-labelledby"?: string;
  /** Prop for `availableColors` containing array of objects of colors */
  availableColors: Expand<AdvancedColor>[];
  /** Prop for `defaultColor` containing the default color for `uncontrolled` use */
  defaultColor: string;
  /** Specifies the name prop to be applied to each color in the group */
  name: string;
  /** Prop for `onBlur` event */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Prop for `onChange` event */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Prop for `onClose` event */
  onClose?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Prop for `onOpen` event */
  onOpen?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Prop for `open` status */
  open?: boolean;
  /** The ARIA role to be applied to the component container */
  role?: string;
  /** Prop for `selectedColor` containing pre-selected color for `controlled` use */
  selectedColor?: string;
}

declare function AdvancedColorPicker(
  props: AdvancedColorPickerPropTypes
): JSX.Element;

export default AdvancedColorPicker;

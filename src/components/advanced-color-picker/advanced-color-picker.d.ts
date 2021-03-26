import * as React from "react";
import { MarginProps } from "styled-system";

export interface AdvancedColorPickerPropTypes extends MarginProps {
  name?: string;
  open?: boolean;
  availableColors?: [];
  selectedColor?: string;
  defaultColor?: string;
  onChange?: () => void;
  onOpen?: (ev: React.ChangeEvent<HTMLElement>) => void;
  onClose?: (ev: React.ChangeEvent<HTMLElement>) => void;
  onBlur?: (ev: React.ChangeEvent<HTMLElement>) => void;
}

declare function AdvancedColorPicker(props: AdvancedColorPickerPropTypes): JSX.Element;

export default AdvancedColorPicker;

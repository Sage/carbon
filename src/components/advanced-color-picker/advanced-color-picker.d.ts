import * as React from "react";

export interface AdvancedColorPickerPropTypes {
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

declare const AdvancedColorPicker: React.FunctionComponent<AdvancedColorPickerPropTypes>;

export default AdvancedColorPicker;

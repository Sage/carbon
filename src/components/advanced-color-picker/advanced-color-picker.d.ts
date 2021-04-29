import * as React from 'react';
import { MarginSpacingProps } from '../../utils/helpers/options-helper';

export interface AdvancedColorPickerPropTypes extends MarginSpacingProps {
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

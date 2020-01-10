import * as React from 'react';

interface valueObject {
  value: string;
  text: string;
};

export interface SelectProps {
  ariaLabel?: string;
  children?: React.ReactNode;
  defaultValue?: string | valueObject | string[] | valueObject[];
  'data-component': string;
  disabled?: boolean;
  enableMultiSelect?: boolean;
  fieldHelp?: string;
  filterable?: boolean;
  label?: string;
  id?: string;
  isAnyValueSelected?: boolean;
  isLoopable?: boolean;
  name?: string;
  leftChildren?: React.ReactNode;
  onBlur?(): void;
  onChange?(): void;
  onFocus?(): void;
  onFilter?(): void;
  onOpen?(): void;
  onLazyLoad?(): void;
  placeholder?: string;
  preventFocusAutoOpen?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  typeAhead?: boolean;
  value?: string | valueObject | string[] | valueObject[];
}
declare const Select: React.ComponentType<SelectProps>;
export default Select;

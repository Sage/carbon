import * as React from 'react';
import Option from '../option';
import { SpacingProps } from '../../../utils/helpers/options-helper';

export interface SimpleSelectProps extends SpacingProps {
  /** Id attribute of the input element */
  id?: string;
  /** Name attribute of the input element */
  name?: string;
  /** If true the Component will be read-only */
  readOnly?: boolean;
  /** If true the Component will be disabled? */
  disabled?: boolean;
  /** If true the Component will be focused when rendered */
  autoFocus?: boolean;
  /** Label */
  label?: string;
  /** Text applied to label help tooltip */
  labelHelp?: string;
  /** When true, label is placed in line with an input */
  labelInline?: boolean;
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth?: number;
  /** Size of an input */
  size?: 'small' | 'medium' | 'large';
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** The selected value(s), when the component is operating in controlled mode */
  value?: string | object;
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue?: string | object;
  /** Child components (such as Option) for the SelectList */
  children: Array<typeof Option>;
  /** If true the Component opens on focus */
  openOnFocus?: boolean;
  /** A custom message to be displayed when any option does not match the filter text */
  noResultsMessage?: string;
  /** If true the component input has no border and is transparent */
  transparent?: boolean;
  /** A custom callback for when the dropdown menu opens */
  onOpen?: () => void;
  /** A custom callback for when changes occur */
  onChange?: () => void;
  /** Callback function for when the Select Textbox is clicked. */
  onClick?: () => void;
  /** Callback function for when the Select Textbox is focused. */
  onFocus?: () => void;
  /** Callback function for when the Select Textbox loses it's focus. */
  onBlur?: () => void;
  /** Callback function for when the key is pressed when focused on Select Textbox. */
  onKeyDown?: () => void;
}

declare const SimpleSelect: React.ComponentType<SimpleSelectProps>;

export default SimpleSelect;

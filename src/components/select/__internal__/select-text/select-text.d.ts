import * as React from "react";

export interface SelectTextProps {
  /** If true the Component will be disabled */
  disabled?: boolean;
  /** Value to be displayed */
  formattedValue?: string;
  /** Label id passed from Select component  */
  labelId?: string;
  /** Callback function for when the Select Textbox loses it's focus. */
  onBlur?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** Callback function for when the component is clicked. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Callback function for when the Select Textbox is focused. */
  onFocus?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** Callback function for when the key is pressed when focused on Select Text. */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLElement>) => void;
  /** Callback function for when the left mouse key is pressed when focused on Select Text. */
  onMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Placeholder string to be displayed when formattedValue is empty */
  placeholder?: string;
  /** If true the Component will be read-only */
  readOnly?: boolean;
  /** If true the component has no border and a transparent background */
  transparent?: boolean;
  /** Id of the Select Text element */
  textId?: string;
}

declare function SelectText(props: SelectTextProps): JSX.Element;

export default SelectText;

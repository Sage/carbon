import * as React from "react";

export interface SimpleColorProps {
  /** the value of the color that is represented by this SimpleColor */
  value?: string;
  /** the input name */
  name?: string;
  /** called when the user selects or deselects this color option */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Prop for `onBlur` events */
  onBlur?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Prop for `onMouseDown` events */
  onMouseDown?: (ev: React.SyntheticEvent) => void;
  /** determines if this color option is selected or unselected */
  checked?: boolean;
  /** [Legacy] Custom classname */
  className?: string;
}

declare function SimpleColor(props: SimpleColorProps & React.RefAttributes<HTMLInputElement>): JSX.Element;

export default SimpleColor;

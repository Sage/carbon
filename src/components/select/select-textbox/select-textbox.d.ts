import * as React from "react";
import { SpaceProps } from "styled-system";

export interface SelectTextboxProps extends SpaceProps {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** If true the Component will be focused when rendered */
  autoFocus?: boolean;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Id attribute of the input element */
  id?: string;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /** Label content */
  label?: string;
  /** A message that the Help component will display */
  labelHelp?: React.ReactNode;
  /** When true label is inline */
  labelInline?: boolean;
  /** Label width */
  labelWidth?: number;
  /** Name attribute of the input element */
  name?: string;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** pecify a callback triggered on click */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on focus */
  onFocus?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** pecify a callback triggered on keuyDown */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
}

declare const SelectTextbox: React.ComponentType<SelectTextboxProps>;

export default SelectTextbox;

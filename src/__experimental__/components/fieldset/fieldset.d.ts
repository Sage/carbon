import * as React from "react";
import { MarginSpacingProps } from '../../../utils/helpers/options-helper';

export interface FieldsetProps extends MarginSpacingProps {
  /** Child elements */
  children?: React.ReactNode;
  /** The text for the fieldsets legend element. */
  legend?: string;
  /** When true, legend is placed in line with the children */
  inline?: boolean;
}

declare function Fieldset(props: FieldsetProps): JSX.Element;

export default Fieldset;

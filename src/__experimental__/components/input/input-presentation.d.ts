import * as React from "react";
import { ValidationPropTypes } from "../../../components/validations";

export interface CommonInputPresentationProps extends ValidationPropTypes {
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** The default value alignment on the input */
  align?: string;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
}

export interface InputPresentationProps extends CommonInputPresentationProps {
  /** If true the outline is rendered around the input */
  hasFocus?: boolean;
  /** Content to be rendered before the input */
  positionedChildren?: React.ReactNode;
}

declare function InputPresentation(props: InputPresentationProps): JSX.Element;

export default InputPresentation;

import * as React from "react";

export interface InlineInputsProps {
  /** Children elements */
  children?: React.ReactNode;
  /** [Legacy prop] A custom class name for the component. */
  className?: string;
  /** Gutter prop gets passed down to Row component if false gutter value is "none" */
  gutter?: "none" | "extra-small" | "small"| "medium-small"| "medium"| "medium-large"| "large"| "extra-large";
  /** The id of the corresponding input control for the label */
  htmlFor?: string;
  /** Defines the label text for the heading. */
  label?: string;
}

declare function InlineInputs(props: InlineInputsProps): JSX.Element;

export default InlineInputs;

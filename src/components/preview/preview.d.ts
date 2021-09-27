import * as React from "react";
import { MarginProps } from "styled-system";

export interface PreviewProps extends MarginProps {
  /** A custom height to be applied to the component. */
  height?: string;
  /** The number of lines to render. */
  lines?: number;
  /* Provides more control over when in a loading state. */
  loading?: boolean;
  /** A custom width */
  width?: string;
}

declare function Preview(
  props: React.PropsWithChildren<PreviewProps>
): JSX.Element;

export default Preview;

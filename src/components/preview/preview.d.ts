import * as React from "react";

export interface PreviewProps {
  /** A custom height to be applied to the component. */
  height?: string;
  /** The number of lines to render. */
  lines?: number;
  /* Provides more control over when in a loading state. */
  loading?: boolean;
  /** A custom width */
  width?: string;
}

declare function Preview(props: React.PropsWithChildren<PreviewProps>): JSX.Element;

export default Preview;

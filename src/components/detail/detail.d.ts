import * as React from "react";

export interface DetailProps {
  /** Custom className */
  className?: string;
  /** The type of icon to use. */
  icon?: string;
  /** A small detail to display under the main content. */
  footnote?: string;
  /** The rendered children of the component. */
  children?: React.ReactNode;
}

declare class Detail extends React.Component<DetailProps> {}

export default Detail;

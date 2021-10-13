import * as React from "react";
import { MarginProps } from "styled-system";

export interface HeadingProps extends MarginProps {
  /** Custom className */
  className?: string;
  /** Defines the title for the heading. */
  title?: React.ReactNode;
  /** Defines the title id for the heading. */
  titleId?: string;
  /** Defines the subheader for the heading. */
  subheader?: React.ReactNode;
  /** Defines the subtitle id for the heading. */
  subtitleId?: string;
  /** Defines the help text for the heading. */
  help?: string;
  /** Defines the help link for the heading. */
  helpLink?: string;
  /** Defines the a href for the back link. */
  backLink?: string | React.MouseEventHandler<HTMLButtonElement>;
  /** Adds a divider below the heading and the content. */
  divider?: boolean;
  /** Adds a separator between the title and the subheader. */
  separator?: boolean;
  /** Pills that will be added after the title. */
  pills?: React.ReactNode;
}

declare class Heading extends React.Component<HeadingProps> {}

export default Heading;

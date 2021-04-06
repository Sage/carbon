import * as React from "react";

export interface ContentProps {
  /** Aligns the content (left, center or right) */
  align?: "left" | "center" | "right";
  /**
   * Over-rides the calculation of body width based on titleWidth.
   * Sometimes we need the body to be full width while keeping a title width similar to other widths
   */
  bodyFullWidth?: boolean;
  /** The body of the content component */
  children?: React.ReactNode;
  /** Displays the content inline with the title */
  inline?: boolean;
  /** The title of the content component */
  title?: string;
  /** Sets a custom width for the title element */
  titleWidth?: string;
  /** Applies a theme to the Content Value: primary, secondary */
  variant?: "primary" | "secondary";
}

declare function Content(props: ContentProps): JSX.Element;

export default Content;

import * as React from "react";
import { StyledComponentProps } from "styled-components";
import { MarginProps, BackgroundProps, LayoutProps } from "styled-system";

export interface ImageProps extends MarginProps, BackgroundProps, LayoutProps {
  /** any valid file path, passing this will render the component as an img element */
  src?: string;
  /** alt property to display when an img fails to load */
  alt?: string;
  /** Children elements, will only render if component is a div element */
  children?: React.ReactNode;
}

declare function Image(
  attrs: StyledComponentProps<"div", Record<string, unknown>, ImageProps, "">
): JSX.Element;

export default Image;

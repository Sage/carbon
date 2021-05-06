import * as React from "react";
import { StyledComponentProps } from "styled-components";
import {
  MarginSpacingProps,
  BackgroundProps,
  LayoutProps,
} from "../../utils/helpers/options-helper";

export interface ImageProps
  extends MarginSpacingProps,
    BackgroundProps,
    LayoutProps {
  /** any valid file path, passing this will render the component as an img element */
  src?: string;
  /** alt property to display when an img fails to load */
  alt?: string;
  /** Children elements, will only render if component is a div element */
  children?: React.ReactNode;
}

declare function Image(attrs: StyledComponentProps<"div", {}, ImageProps, "">): JSX.Element;

export default Image;

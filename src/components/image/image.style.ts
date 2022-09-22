import styled, { css } from "styled-components";
import {
  margin,
  layout,
  background,
  MarginProps,
  BackgroundProps,
  LayoutProps,
} from "styled-system";
import { baseTheme } from "../../style/themes";

export interface StyledImageProps
  extends MarginProps,
    BackgroundProps,
    LayoutProps {
  /** alt property to display when an img fails to load */
  alt?: string;
  /** any valid file path, passing this will render the component as an img element */
  src?: string;
  /** Children elements, will only render if component is a div element */
  children?: React.ReactNode;
}

const StyledImage = styled.div.attrs(({ src, children }: StyledImageProps) => ({
  ...(src && { as: "img" }),
  children: src ? undefined : children,
  src,
}))<StyledImageProps>`
  ${margin}
  ${layout}

  ${({ as }) =>
    as !== "img" &&
    css`
      ${background}
    `}
`;

StyledImage.defaultProps = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  theme: baseTheme,
};

export { StyledImage };

import styled, { css } from "styled-components";
import {
  margin,
  layout,
  background,
  MarginProps,
  BackgroundProps,
  LayoutProps,
} from "styled-system";
import { Expand } from "../../__internal__/utils/helpers/types";
import { baseTheme } from "../../style/themes";

export interface StyledImageProps
  extends Expand<MarginProps>,
    Expand<BackgroundProps>,
    Expand<LayoutProps> {
  /** HTML alt property to display when an img fails to load */
  alt?: string;
  /** Any valid file path, passing this will render the component as an img element */
  src?: string;
  /** HTML hidden property to indicate whether to remain hidden visually and from screen readers */
  hidden?: boolean;
  /** Children elements, will only render if component is a div element */
  children?: React.ReactNode;
}

const StyledImage = styled.div.attrs(
  ({ src, children, hidden = false }: StyledImageProps) => ({
    ...(src && { as: "img" }),
    children: src ? undefined : children,
    src,
    hidden,
  })
)<StyledImageProps>`
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

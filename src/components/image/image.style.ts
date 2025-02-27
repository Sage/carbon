import styled, { css } from "styled-components";
import {
  margin,
  layout,
  background,
  padding,
  MarginProps,
  BackgroundProps,
  LayoutProps,
  PaddingProps,
} from "styled-system";
import { baseTheme } from "../../style/themes";
import { TagProps } from "../../__internal__/utils/helpers/tags/tags";

export type PositionProps =
  | "absolute"
  | "fixed"
  | "relative"
  | "static"
  | "sticky";
export interface StyledImageProps
  extends BackgroundProps,
    LayoutProps,
    MarginProps,
    PaddingProps,
    TagProps {
  /** HTML alt property to display when an img fails to load */
  alt?: string;
  /** Prop to specify if the image is decorative  */
  decorative?: boolean;
  /** Any valid file path, passing this will render the component as an img element */
  src?: string;
  /** HTML hidden property to indicate whether to remain hidden visually and from screen readers */
  hidden?: boolean;
  /** Children elements, will only render if component is a div element */
  children?: React.ReactNode;
  /** Any valid CSS string for position */
  position?: PositionProps;
  /** Any valid CSS string for top */
  top?: string;
  /** Any valid CSS string for right */
  right?: string;
  /** Any valid CSS string for bottom */
  bottom?: string;
  /** Any valid CSS string for left */
  left?: string;
}

const StyledImage = styled.div.attrs(
  ({
    src,
    children,
    hidden = false,
    position,
    top,
    right,
    bottom,
    left,
  }: StyledImageProps) => ({
    ...(src && { as: "img" }),
    children: src ? undefined : children,
    src,
    hidden,
    position,
    top,
    right,
    bottom,
    left,
  }),
)<StyledImageProps>`
  ${margin}
  ${layout}
  ${padding}

  ${({ position, top, right, bottom, left }) => css`
    position: ${position};
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
  `}

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

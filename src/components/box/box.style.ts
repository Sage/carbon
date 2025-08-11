import styled, { css } from "styled-components";
import {
  space,
  layout,
  flexbox,
  grid,
  position as positionFn,
  PositionProps,
} from "styled-system";
import boxGap from "../../style/utils/box-gap";
import styledColor from "../../style/utils/color";
import { BoxProps } from "./box.component";
import boxConfig from "./box.config";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const calculatePosition = (props: Omit<PositionProps, "zIndex">) => {
  const { position, ...rest } = positionFn(props);

  return {
    position,
    zIndex: ["sticky", "fixed"].includes(position) ? 3 : undefined,
    ...rest,
  };
};

const StyledBox = styled.div.attrs(applyBaseTheme)<
  Omit<BoxProps, "borderRadius"> & {
    cssProps?: {
      color?: string;
      opacity?: string;
      height?: string;
      width?: string;
    };
    $borderRadius?: BoxProps["borderRadius"];
  }
>`
  ${space}
  ${layout}
  ${flexbox}
  ${grid}
  ${calculatePosition}

${({ $borderRadius = "borderRadius000" }) => {
    const radiusValues = $borderRadius.split(" ");
    return css`
      border-radius: ${radiusValues
        .map((radius) => `var(--${radius})`)
        .join(" ")};
    `;
  }}

  ${({ cssProps, bg, backgroundColor, ...rest }) =>
    styledColor({ color: cssProps?.color, bg, backgroundColor, ...rest })}

  ${({ cssProps }) => css`
    opacity: ${cssProps?.opacity};
  `}

  ${({ overflowWrap }) =>
    overflowWrap &&
    css`
      overflow-wrap: ${overflowWrap};
    `}

  ${({ cssProps, size }) =>
    cssProps?.height &&
    !size &&
    css`
      height: ${cssProps?.height};
    `}

  ${({ cssProps, size }) =>
    cssProps?.width &&
    !size &&
    css`
      width: ${cssProps?.width};
    `}

  ${({ scrollVariant }) =>
    scrollVariant &&
    css`
      scrollbar-color: ${boxConfig[scrollVariant].thumb}
        ${boxConfig[scrollVariant].track};

      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        background-color: ${boxConfig[scrollVariant].track};
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${boxConfig[scrollVariant].thumb};
      }
    `}

  ${({ boxSizing }) =>
    boxSizing &&
    css`
      box-sizing: ${boxSizing};
    `}

    ${({ display, gap, columnGap, rowGap }) =>
    (display === "flex" ||
      display === "inline-flex" ||
      display === "grid" ||
      display === "inline-grid") &&
    css`
      ${gap !== undefined &&
      css`
        gap: ${boxGap(gap)};
      `}

      ${columnGap !== undefined &&
      css`
        column-gap: ${boxGap(columnGap)};
      `}

      ${rowGap !== undefined &&
      css`
        row-gap: ${boxGap(rowGap)};
      `}
    `};

  ${({ boxShadow }) =>
    boxShadow &&
    css`
      box-shadow: var(--${boxShadow});
    `}

  ${({ display, hidden }) => css`
    display: ${hidden ? "none" : display};
  `}
`;

export default StyledBox;

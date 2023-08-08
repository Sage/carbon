import styled, { css } from "styled-components";
import {
  space,
  layout,
  flexbox,
  position as positionFn,
  PositionProps,
} from "styled-system";
import BaseTheme from "../../style/themes/base";
import styledColor from "../../style/utils/color";
import { BoxProps } from "./box.component";
import boxConfig from "./box.config";

export type StyledBoxProps = BoxProps;

const calculatePosition = (props: Omit<PositionProps, "zIndex">) => {
  const { position, ...rest } = positionFn(props);

  return {
    position,
    zIndex: ["sticky", "fixed"].includes(position) ? 1 : undefined,
    ...rest,
  };
};

const StyledBox = styled.div<StyledBoxProps>`
  ${space}
  ${layout}
  ${flexbox}
  ${calculatePosition}

  ${({ theme, borderRadius = "borderRadius000" }) =>
    !theme.roundedCornersOptOut &&
    css`
      border-radius: var(--${borderRadius});
    `}

  ${({ color, bg, backgroundColor, ...rest }) =>
    styledColor({ color, bg, backgroundColor, ...rest })}

  ${({ overflowWrap }) =>
    overflowWrap &&
    css`
      overflow-wrap: ${overflowWrap};
    `}
  
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}

  ${({ width }) =>
    width &&
    css`
      width: ${width};
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
    (display === "flex" || display === "inline-flex") &&
    css`
      ${gap !== undefined &&
      css`
        gap: ${boxConfig.gap(gap)};
      `}

      ${columnGap !== undefined &&
      css`
        column-gap: ${boxConfig.gap(columnGap)};
      `}

      ${rowGap !== undefined &&
      css`
        row-gap: ${boxConfig.gap(rowGap)};
      `}
    `};

  ${({ boxShadow }) =>
    boxShadow &&
    css`
      box-shadow: var(--${boxShadow});
    `}
`;

StyledBox.defaultProps = {
  theme: BaseTheme,
};

export default StyledBox;

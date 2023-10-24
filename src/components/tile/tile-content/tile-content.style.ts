import styled, { css } from "styled-components";
import { space } from "styled-system";
import baseTheme from "../../../style/themes/base";
import computeSizing from "../../../style/utils/element-sizing";
import { TileContentProps } from "./tile-content.component";

interface StyledTileContentProps extends TileContentProps {
  isHorizontal?: boolean;
  isVertical?: boolean;
  width?: string | number;
  height?: string | number;
}

const StyledTileContent = styled.div<StyledTileContentProps>`
  ${({ isHorizontal, isVertical, width, height }) => css`
    ${space}

    box-sizing: border-box;
    position: relative;
    flex-grow: 1;

    ${isHorizontal &&
    css`
      display: inline;

      :last-of-type {
        padding-right: 0;
      }

      :first-of-type {
        padding-left: 0;
      }

      & + & {
        margin-top: 0;
        border-left: solid 1px var(--colorsUtilityMajor050);
      }
    `}

    ${isVertical &&
    css`
      width: auto;

      :last-of-type {
        padding-bottom: 0;
      }

      :first-of-type {
        padding-top: 0;
      }

      & + & {
        margin-top: 0;
        border-top: solid 1px var(--colorsUtilityMajor050);
      }
    `}

    ${(width || height) &&
    css`
      flex-grow: 0;
      ${computeSizing({
        width: width || /* istanbul ignore next */ undefined,
        height: height || undefined,
      })}
    `}
  `}
`;

StyledTileContent.defaultProps = {
  theme: baseTheme,
};

export default StyledTileContent;

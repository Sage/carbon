import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { space } from "styled-system";
import baseTheme from "../../style/themes/base";
import computeWidth from "../../style/utils/width";

const TileContent = styled.div`
  ${({ isHorizontal, isVertical, width }) => css`
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

    ${width &&
    css`
      flex-grow: 0;
      ${computeWidth}
    `}
  `}
`;

const StyledTile = styled.div`
  ${({ isHorizontal, tileTheme, width }) => css`
    ${space}

    box-sizing: border-box;
    background-color: ${tileTheme === "tile"
      ? "var(--colorsUtilityYang100)"
      : "transparent"};
    border: 1px solid var(--colorsUtilityMajor100);
    display: flex;
    flex-direction: ${isHorizontal ? "row" : "column"};
    position: relative;
    width: 100%;

    ${width &&
    css`
      ${computeWidth}
    `}
  `}
`;

TileContent.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TileContent.defaultProps = {
  theme: baseTheme,
};

StyledTile.propTypes = {
  orientation: PropTypes.string,
  padding: PropTypes.string,
  tileTheme: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

StyledTile.defaultProps = {
  theme: baseTheme,
};

export { StyledTile, TileContent };

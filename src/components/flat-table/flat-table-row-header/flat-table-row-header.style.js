import styled, { css } from "styled-components";
import { padding } from "styled-system";

import baseTheme from "../../../style/themes/base";
import { toColor } from "../../../style/utils/color";

const verticalBorderSizes = {
  small: "1px",
  medium: "2px",
  large: "4px",
};

const StyledFlatTableRowHeader = styled.th`
  ${({
    align,
    theme,
    colWidth,
    leftPosition,
    rightPosition,
    isTruncated,
    expandable,
    verticalBorder,
    verticalBorderColor,
    stickyAlignment,
  }) => css`
    background-color: var(--colorsUtilityYang100);
    border: 1px solid var(--colorsUtilityMajor100);
    border-top: none;
    box-sizing: border-box;
    left: 0;
    font-weight: normal;
    position: sticky;
    text-align: ${align};
    top: auto;
    vertical-align: middle;
    padding: 0;
    z-index: ${baseTheme.zIndex.overlay};

    ${colWidth &&
    css`
      width: ${colWidth}px;
    `}

    &&&& {
      > div {
        box-sizing: border-box;

        ${isTruncated &&
        css`
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        `}

        ${colWidth &&
        css`
          width: ${colWidth}px;
        `}
 
        ${padding}
      }

      ${leftPosition !== undefined &&
      css`
        left: ${leftPosition}px;
      `}
      ${rightPosition !== undefined &&
      css`
        right: ${rightPosition}px;
      `}

      ${verticalBorder &&
      css`
        border-${stickyAlignment === "right" ? "left" : "right"}-width: ${
        verticalBorderSizes[verticalBorder]
      };
      `}

      ${verticalBorderColor &&
      css`
        border-${
          stickyAlignment === "right" ? "left" : "right"
        }-color: ${toColor(theme, verticalBorderColor)};
      `}
    }

    ${expandable &&
    css`
      white-space: nowrap;
    `}
  `}
`;

StyledFlatTableRowHeader.defaultProps = {
  theme: baseTheme,
};

const StyledFlatTableRowHeaderContent = styled.div`
  ${({ expandable }) =>
    expandable &&
    css`
      display: flex;
      align-items: center;
      line-height: 1em;
    `}
`;

export { StyledFlatTableRowHeader, StyledFlatTableRowHeaderContent };

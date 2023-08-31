import styled, { css } from "styled-components";
import { PaddingProps, padding } from "styled-system";
import { FlatTableCellProps } from "./flat-table-cell.component";
import baseTheme from "../../../style/themes/base";
import { toColor } from "../../../style/utils/color";

const verticalBorderSizes = {
  small: "1px",
  medium: "2px",
  large: "4px",
};

interface StyledFlatTableCellProps
  extends Pick<
      FlatTableCellProps,
      "align" | "verticalBorder" | "verticalBorderColor"
    >,
    PaddingProps {
  makeCellSticky: boolean;
  colWidth?: number;
  isTruncated: boolean;
  leftPosition: number;
  rightPosition: number;
  expandable?: boolean;
}

const StyledFlatTableCell = styled.td<StyledFlatTableCellProps>`
  ${({
    align,
    theme,
    rowSpan,
    leftPosition,
    rightPosition,
    makeCellSticky,
    colWidth,
    isTruncated,
    expandable,
    verticalBorder,
    verticalBorderColor,
  }) => css`
    background-color: var(--colorsUtilityYang100);
    border-width: 0;
    border-bottom: 1px solid var(--colorsUtilityMajor100);
    text-align: ${align};
    vertical-align: middle;
    padding: 0;

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

      ${verticalBorder &&
      css`
        border-right: ${verticalBorderSizes[verticalBorder]} solid
          var(--colorsUtilityMajor300);
      `}

      ${verticalBorderColor &&
      css`
        border-right-color: ${toColor(theme, verticalBorderColor)};
      `}
    }

    &:first-of-type {
      border-left: 1px solid var(--colorsUtilityMajor100);
    }

    &:last-of-type {
      border-right: 1px solid var(--colorsUtilityMajor100);
    }

    ${rowSpan &&
    css`
      &:first-of-type + & {
        border-left: 1px solid var(--colorsUtilityMajor100);
      }
    `}

    ${makeCellSticky &&
    css`
      ${leftPosition !== undefined && `left: ${leftPosition}px;`}
      ${rightPosition !== undefined && `right: ${rightPosition}px;`}
      position: sticky;
    `}

    ${expandable &&
    css`
      white-space: nowrap;
    `}
  `}
`;

const StyledCellContent = styled.div<{ expandable?: boolean }>`
  ${({ expandable }) =>
    expandable &&
    css`
      display: flex;
      align-items: center;
      line-height: 1em;
    `}
`;

StyledFlatTableCell.defaultProps = {
  theme: baseTheme,
};

export { StyledFlatTableCell, StyledCellContent };

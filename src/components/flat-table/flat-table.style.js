import styled, { css } from "styled-components";
import StyledFlatTableHeader from "./flat-table-header/flat-table-header.style";
import StyledFlatTableRow from "./flat-table-row/flat-table-row.style";
import { StyledFlatTableRowHeader } from "./flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableHead from "./flat-table-head/flat-table-head.style";
import StyledFlatTableCheckbox from "./flat-table-checkbox/flat-table-checkbox.style";
import { baseTheme } from "../../style/themes";
import { StyledFlatTableCell } from "./flat-table-cell/flat-table-cell.style";
import cellSizes from "./cell-sizes.style";
import Box from "../box";

const StyledFlatTable = styled.table`
  border-collapse: separate;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  width: 100%;

  ${({ caption }) =>
    caption &&
    css`
      caption {
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        overflow: hidden;
        width: 1px;
        position: absolute;
        top: -99999px;
      }
    `}

  ${({ size }) => {
    const { height, fontSize, paddingSize } = cellSizes[size];

    return css`
      ${StyledFlatTableRow} {
        height: ${height};
      }

      ${StyledFlatTableCell} > div,
      ${StyledFlatTableHeader} > div,
      ${StyledFlatTableRowHeader} > div,
      ${StyledFlatTableCheckbox} > div {
        font-size: ${fontSize};
        padding-left: ${paddingSize};
        padding-right: ${paddingSize};
      }
    `;
  }}

  ${({ isZebra }) =>
    isZebra &&
    css`
      ${StyledFlatTableRow}:nth-child(2n) {
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCell},
        ${StyledFlatTableCheckbox} {
          background-color: var(--colorsUtilityMajor010);
        }
      }
      ${StyledFlatTableRow}:hover {
        ${StyledFlatTableCell},
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCheckbox} {
          background-color: var(--colorsUtilityMajor025);
        }
      }
    `}
`;

StyledFlatTable.defaultProps = {
  size: "medium",
};

const StyledFlatTableWrapper = styled(Box)`
  ${({ isInSidebar }) =>
    css`
      box-sizing: border-box;

      :focus {
        outline: 2px solid var(--colorsSemanticFocus500);

        :not(:focus-visible) {
          outline: none;
        }

        :focus-visible {
          outline: 2px solid var(--colorsSemanticFocus500);
        }
      }

      ${isInSidebar
        ? "min-width: fit-content"
        : `box-shadow: inset 0px 0px 0px 1px var(--colorsUtilityMajor100)`};
    `}

  ${({ colorTheme }) => {
    switch (colorTheme) {
      case "light":
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: var(--colorsUtilityMajor100);
            border-right: 1px solid var(--colorsUtilityMajor150);
            border-bottom-color: var(--colorsUtilityMajor100);
          }
        `;

      case "transparent-base":
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: var(--colorsUtilityMajor025);
            border-right: 1px solid var(--colorsUtilityMajor025);
            border-bottom-color: var(--colorsUtilityMajor100);
          }
        `;

      case "transparent-white":
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: var(--colorsUtilityYang100);
            border-right: 1px solid var(--colorsUtilityYang100);
            border-bottom-color: var(--colorsUtilityMajor100);
          }
        `;
      // default theme is "dark"
      default:
        return css`
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox},
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader} {
            background-color: var(--colorsUtilityMajor400);
            border-right: 1px solid var(--colorsUtilityMajor300);
            color: var(--colorsUtilityYang100);
            border-bottom-color: var(--colorsUtilityMajor300);
          }
        `;
    }
  }}

  ${({ isInSidebar }) =>
    isInSidebar &&
    css`
      ${StyledFlatTableHeader}, ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
      ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
        background-color: var(--colorsUtilityMajor040);
        border-right: 2px solid var(--colorsUtilityMajor040);
        color: var(--colorsUtilityYin090);
        border-bottom-color: var(--colorsUtilityMajor100);
      }
    `}

  ${({ hasStickyHead }) =>
    hasStickyHead &&
    css`
      ${StyledFlatTableHead} th {
        position: sticky;
        z-index: ${({ theme }) => theme.zIndex.overlay};
      }

      ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
      ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
        z-index: ${({ theme }) => theme.zIndex.overlay + 2};
        top: 0;
        left: 0;
      }
    `}
`;

StyledFlatTableWrapper.defaultProps = {
  theme: baseTheme,
};

const StyledFlatTableFooter = styled.div`
  ${({ hasStickyFooter }) =>
    hasStickyFooter &&
    css`
      position: sticky;
      bottom: 0px;
    `}
`;

export { StyledFlatTableWrapper, StyledFlatTable, StyledFlatTableFooter };

import styled, { css } from "styled-components";
import StyledFlatTableHeader from "./flat-table-header/flat-table-header.style";
import StyledFlatTableRow from "./flat-table-row/flat-table-row.style";
import StyledFlatTableRowHeader from "./flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableHead from "./flat-table-head/flat-table-head.style";
import StyledFlatTableCheckbox from "./flat-table-checkbox/flat-table-checkbox.style";
import { baseTheme } from "../../style/themes";
import { StyledFlatTableCell } from "./flat-table-cell/flat-table-cell.style";
import cellSizes from "./cell-sizes.style";
import Box from "../box";

const StyledFlatTableBox = styled(Box)`
  ${({ theme }) =>
    css`
      box-shadow: inset 0px 0px 0px 1px ${theme.table.secondary};
      box-sizing: border-box;
    `}
`;

StyledFlatTableBox.defaultProps = {
  theme: baseTheme,
};

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
      ${StyledFlatTableRowHeader} > div {
        font-size: ${fontSize};
        padding-left: ${paddingSize};
        padding-right: ${paddingSize};
      }
    `;
  }}

  ${({ isZebra, theme }) =>
    isZebra &&
    css`
      ${StyledFlatTableRow}:nth-child(2n) {
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCell},
        ${StyledFlatTableCheckbox} {
          background-color: ${theme.table.zebra};
        }
      }
      ${StyledFlatTableRow}:hover {
        ${StyledFlatTableCell},
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCheckbox} {
          background-color: ${theme.flatTable.hover};
        }
      }
    `}
`;

StyledFlatTable.defaultProps = {
  theme: baseTheme,
  size: "medium",
};

const StyledFlatTableWrapper = styled.div`
  ${({ heightDefaulted }) =>
    !heightDefaulted &&
    css`
      max-height: 100%;
    `}

  ${({ colorTheme, theme }) => {
    switch (colorTheme) {
      case "light":
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: ${theme.flatTable.light.headerBackground};
            border-right: 1px solid ${theme.flatTable.light.border};
          }
        `;

      case "transparent-base":
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: ${theme.flatTable.transparentBase
              .headerBackground};
            border-right: 1px solid ${theme.flatTable.transparentBase.border};
          }
        `;

      case "transparent-white":
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: ${theme.flatTable.transparentWhite
              .headerBackground};
            border-right: 1px solid ${theme.flatTable.transparentWhite.border};
          }
        `;
      // default theme is "dark"
      default:
        return css`
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox},
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader} {
            background-color: ${theme.flatTable.dark.headerBackground};
            border-right: 1px solid ${theme.flatTable.dark.border};
            color: ${theme.colors.white};
          }
        `;
    }
  }}

  ${({ isInSidebar, theme }) =>
    isInSidebar &&
    css`
      ${StyledFlatTableHeader}, ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
      ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
        background-color: ${theme.flatTable.drawerSidebar.headerBackground};
        border-right: 2px solid
          ${theme.flatTable.drawerSidebar.headerBackground};
        color: ${theme.colors.black};
      }
    `}

  ${({ hasStickyHead }) =>
    hasStickyHead &&
    css`
      ${StyledFlatTableHeader} {
        position: sticky;
        z-index: ${({ theme }) => theme.zIndex.overlay};
      }

      ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
      ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
        z-index: ${({ theme }) => theme.zIndex.overlay + 2};
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
      bottom: -40px;
    `}
`;

StyledFlatTableFooter.defaultProps = {
  theme: baseTheme,
};

export {
  StyledFlatTableWrapper,
  StyledFlatTable,
  StyledFlatTableFooter,
  StyledFlatTableBox,
};

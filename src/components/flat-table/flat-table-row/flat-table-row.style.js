import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import StyledFlatTableCell from "../flat-table-cell/flat-table-cell.style";
import StyledFlatTableRowHeader from "../flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "../flat-table-checkbox/flat-table-checkbox.style";
import StyledFlatTableHeader from "../flat-table-header/flat-table-header.style";

const StyledFlatTableRow = styled.tr`
  border-collapse: separate;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  table-layout: fixed;
  width: auto;

  ${({ isRowInteractive, theme }) =>
    isRowInteractive &&
    css`
      cursor: pointer;

      :focus {
        outline: 2px solid ${theme.colors.focus};
        outline-offset: -1px;

        ${StyledFlatTableRowHeader} {
          border-bottom: 1px solid transparent;
          border-left: 1px solid ${theme.colors.focus};
          background-clip: padding-box;
          z-index: ${theme.zIndex.overlay};

          :before {
            content: "";
            border-top: 2px solid ${theme.colors.focus};
            border-bottom: 1px solid ${theme.colors.focus};
            display: block;
            left: 0px;
            top: -1px;
            height: 100%;
            width: 101%;
            position: absolute;
            z-index: ${theme.zIndex.overlay};
          }
        }
      }

      :hover {
        ${StyledFlatTableCell},
        ${StyledFlatTableRowHeader}, ${StyledFlatTableCheckbox} {
          background-color: ${theme.flatTable.hover};
        }
      }
    `}

  ${({ selected, highlighted, isInSidebar, theme }) => {
    const colorOfSelected = isInSidebar
      ? theme.flatTable.drawerSidebar.selected
      : theme.flatTable.selected;
    const colorOfHighlighted = isInSidebar
      ? theme.flatTable.drawerSidebar.highlighted
      : theme.flatTable.highlighted;

    return css`
      ${isInSidebar &&
      `
        ${StyledFlatTableHeader},
        ${StyledFlatTableRowHeader},
        ${StyledFlatTableCell},
        ${StyledFlatTableCheckbox} {
          background-color: ${theme.flatTable.drawerSidebar.headerBackground};
        }

        td:first-of-type, th:first-of-type {
          border-left: none;
        }

        td:last-of-type {
          border-right: none;
        }

        ${StyledFlatTableCheckbox} {
          border-right: 1px solid ${colorOfHighlighted};
        }
        
        :hover {
          ${StyledFlatTableCell}, ${StyledFlatTableCheckbox}:not(th) {
            background-color: ${theme.flatTable.drawerSidebar.hover};
          }
        }
      `}

      ${highlighted &&
      `
        ${StyledFlatTableCell}, ${StyledFlatTableCheckbox} {
          background-color: ${colorOfHighlighted};
          border-bottom-color: ${colorOfHighlighted};
        }

        :hover {
          ${StyledFlatTableCell},
          ${StyledFlatTableRowHeader},
          ${StyledFlatTableCheckbox}:not(th) {
            background-color: ${colorOfHighlighted};
          }
        }
      `}

      ${selected &&
      `
        ${StyledFlatTableCell}, ${StyledFlatTableCheckbox} {
          background-color: ${colorOfSelected};
          border-bottom-color: ${colorOfSelected};
        }

        :hover {
          ${StyledFlatTableCell},
          ${StyledFlatTableRowHeader},
          ${StyledFlatTableCheckbox}:not(th) {
            background-color: ${colorOfSelected};
          }
        }
      `}
    `;
  }}
`;

StyledFlatTableRow.defaultProps = {
  theme: baseTheme,
};

export default StyledFlatTableRow;

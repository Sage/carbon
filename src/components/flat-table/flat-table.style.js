import styled, { css } from 'styled-components';
import StyledFlatTableHeader from './flat-table-header/flat-table-header.style';
import StyledFlatTableRowHeader from './flat-table-row-header/flat-table-row-header.style';
import StyledFlatTableHead from './flat-table-head/flat-table-head.style';
import StyledFlatTableCheckbox from './flat-table-checkbox/flat-table-checkbox.style';
import { baseTheme } from '../../style/themes';

const StyledFlatTable = styled.table`
  border-collapse: separate;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  table-layout: fixed;
  width: auto;
  word-break: break-all;
`;

const StyledFlatTableWrapper = styled.div`
  height: 100%;

  ${({
    colorTheme, theme
  }) => {
    switch (colorTheme) {
      case 'light':
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: ${theme.flatTable.light.headerBackground};  
            border-right: 1px solid ${theme.flatTable.light.border};
          }
        `;

      case 'transparent-base':
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
            background-color: ${theme.flatTable.transparentBase.headerBackground};
            border-right: 1px solid ${theme.flatTable.transparentBase.border};
          }
        `;

      case 'transparent-white':
        return css`
          ${StyledFlatTableHeader},
          ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
          ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
              background-color: ${theme.flatTable.transparentWhite.headerBackground};
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

  ${({ isInSidebar, theme }) => isInSidebar && css`
    ${StyledFlatTableHeader}, ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
    ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
      background-color: ${theme.flatTable.drawerSidebar.headerBackground};
      border-right: 2px solid ${theme.flatTable.drawerSidebar.headerBackground};
      color: ${theme.colors.black};
    }
  `}

  ${({ hasStickyHead }) => hasStickyHead && css`
    overflow-y: auto;

    ${StyledFlatTableHeader} {
      position: sticky;
      z-index: 1;
    }

    ${StyledFlatTableHead} ${StyledFlatTableRowHeader},
    ${StyledFlatTableHead} ${StyledFlatTableCheckbox} {
      z-index: 2;
    }
  `}
`;

StyledFlatTableWrapper.defaultProps = {
  theme: baseTheme
};

export { StyledFlatTableWrapper, StyledFlatTable };

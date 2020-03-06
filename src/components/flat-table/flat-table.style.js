import styled, { css } from 'styled-components';
import StyledFlatTableHeader from './flat-table-header/flat-table-header.style';
import StyledFlatTableRowHeader from './flat-table-row-header/flat-table-row-header.style';
import StyledFlatTableHead from './flat-table-head/flat-table-head.style';

const StyledFlatTableWrapper = styled.div`
  height: 100%;
  ${({ hasStickyHead }) => hasStickyHead && css`
    overflow-y: auto;

    ${StyledFlatTableHeader} {
      background-color: #fff;
      position: sticky;
      z-index: 1;
    }

    ${StyledFlatTableHead} ${StyledFlatTableRowHeader} {
      z-index: 2;
    }
  `}
`;

const StyledFlatTable = styled.table`
  border-collapse: separate;
  border-radius: 0px;
  border-spacing: 0;
  min-width: 100%;
  table-layout: fixed;
  width: auto;
  word-break: break-all;
`;

export { StyledFlatTableWrapper, StyledFlatTable };

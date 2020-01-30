import styled, { css } from 'styled-components';
import StyledFlatTableHeader from './flat-table-header/flat-table-header.style';

const StyledFlatTableWrapper = styled.div`
  height: 100%;
  ${({ hasStickyHead }) => hasStickyHead && css`
    overflow-y: auto;

    ${StyledFlatTableHeader} {
      background-color: #fff;
      position: sticky;
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

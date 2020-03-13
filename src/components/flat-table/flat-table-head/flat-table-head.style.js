import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';
import StyledFlatTableRowHeader from '../flat-table-row-header/flat-table-row-header.style';

const StyledFlatTableHead = styled.thead`
  ${StyledFlatTableRowHeader} {
    border-left: none;
    border-right: none;
    font-weight: 700;
    left: 0;
    padding: 8px 24px;
    top: 0;
    z-index: 1;
  }
`;

StyledFlatTableHead.defaultProps = {
  theme: baseTheme
};

export default StyledFlatTableHead;

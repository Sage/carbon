import styled from "styled-components";
import baseTheme from "../../../style/themes/base";
import StyledFlatTableRowHeader from "../flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "../flat-table-checkbox/flat-table-checkbox.style";

const StyledFlatTableHead = styled.thead`
  ${StyledFlatTableRowHeader}, ${StyledFlatTableCheckbox} {
    border-left: none;
    border-right: none;
    font-weight: 700;
    left: 0;
    top: 0;
    z-index: ${({ theme }) => theme.zIndex.overlay};
  }

  ${StyledFlatTableRowHeader} > div {
    padding: 8px 24px;
  }
`;

StyledFlatTableHead.defaultProps = {
  theme: baseTheme,
};

export default StyledFlatTableHead;

import styled from "styled-components";
import baseTheme from "../../../style/themes/base";
import { StyledFlatTableRowHeader } from "../flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "../flat-table-checkbox/flat-table-checkbox.style";

const StyledFlatTableHead = styled.thead`
  &&& {
    ${StyledFlatTableCheckbox} {
      border-left: none;
      border-right: none;
    }
    ${StyledFlatTableRowHeader}, ${StyledFlatTableCheckbox} {
      font-weight: 700;
    }
  }
`;

StyledFlatTableHead.defaultProps = {
  theme: baseTheme,
};

export default StyledFlatTableHead;

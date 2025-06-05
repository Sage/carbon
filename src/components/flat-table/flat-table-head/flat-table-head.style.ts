import styled from "styled-components";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import { StyledFlatTableRowHeader } from "../flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "../flat-table-checkbox/flat-table-checkbox.style";

const StyledFlatTableHead = styled.thead.attrs(applyBaseTheme)`
  &&& {
    ${StyledFlatTableCheckbox} {
      border-left: none;
      border-right: none;
    }
    ${StyledFlatTableRowHeader}, ${StyledFlatTableCheckbox} {
      font-weight: 500;
    }
  }
`;

export default StyledFlatTableHead;

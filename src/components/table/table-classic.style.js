import { css } from "styled-components";
import StyledTableHeader from "./table-header/table-header.style";
import StyledTableRow from "./table-row/table-row.style";
import StyledTableCell from "./table-cell/table-cell.style";
import StyledIcon from "../icon/icon.style";

function applyClassicInternalStyling() {
  return css`
    background-color: #f2f5f6;
    border: 1px solid #ccd6db;
  `;
}

function applyClassicTableStyling(props) {
  return css`
    background-color: #ffffff;

    ${props.tableType === "secondary" &&
    `
      ${StyledTableHeader} {
        background-color: #CCD6DB;
        color: #003349;

        ${StyledIcon},
        a:link,
        a:visited,
        a:hover,
        a:active {
          color: #003349;
        }
      }

      ${StyledTableRow} {
        ${StyledTableCell} {
          background-color: #ffffff;
        }

        &:hover ${StyledTableCell} {
          background-color: #E7F1FC;
        }
      }
    `}
  `;
}

export { applyClassicInternalStyling, applyClassicTableStyling };

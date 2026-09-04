import React, { useContext} from "react";
import styled, { css } from "styled-components";
import { TableContext, TableContextProps, TableFooterContext } from "../__internal__/contexts";

interface StyledTableFootProps {
  $size: TableContextProps["size"];
}

const StyledTabledFoot = styled.tfoot<StyledTableFootProps>`
  ${({ $size }) => css`
    ${$size === "extra-small" && `
      > tr > td {
        [data-element="table-cell-content-container"] {
          font: var(--global-font-static-comp-medium-s);
        }
      }
    `}
    ${$size === "small" && `
      > tr > td {
        [data-element="table-cell-content-container"] {
          font: var(--global-font-static-comp-medium-s);
        }
      }
    `}
    ${$size === "medium" && `
      > tr > td {
        [data-element="table-cell-content-container"] {
          font: var(--global-font-static-comp-medium-m);
        }
      }
    `}
    ${$size === "large" && `
      > tr > td {
        [data-element="table-cell-content-container"] {
          font: var(--global-font-static-comp-medium-l);
        }
      }
    `}
    ${$size === "extra-large" && `
      > tr > td {
        [data-element="table-cell-content-container"] {
          font: var(--global-font-static-comp-medium-l);
        }
      }
    `}
  `}
`;

const TableFoot = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
  const { size } = useContext(TableContext)
  return (
    <TableFooterContext.Provider value={{ isInFooter: true }}>
      <StyledTabledFoot
        data-role="table-footer"
        {...props}
        $size={size}
        data-component="table-footer"
      >
        {children}
      </StyledTabledFoot>
    </TableFooterContext.Provider>
  );
};

export default TableFoot;

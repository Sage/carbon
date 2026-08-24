import React from "react";
import styled from "styled-components";
import { TableFooterContext } from "../__internal__/context";

const StyledTabledFoot = styled.tfoot``;

const TableFoot = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <TableFooterContext.Provider value={{ isInFooter: true }}>
      <StyledTabledFoot
        data-role="table-foot"
        {...props}
        data-component="table-foot"
      >
        {children}
      </StyledTabledFoot>
    </TableFooterContext.Provider>
  );
};

export default TableFoot;

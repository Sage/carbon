import React from "react";
import styled from "styled-components";
import { TableHeaderContext } from "../__internal__/contexts";

const StyledTableHead = styled.thead``;

const TableHead = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <TableHeaderContext.Provider value={{ isInHeader: true }}>
      <StyledTableHead
        data-role="table-head"
        {...props}
        data-component="table-head"
      >
        {children}
      </StyledTableHead>
    </TableHeaderContext.Provider>
  );
};

export default TableHead;
import React, { ReactNode } from 'react';
import {TableContext, TableContextProps} from "./__internal__/contexts";
import { StyledTableWrapper, StyledTable } from './table.style';

export type BorderThickness =
  | "none"
  | "small"
  | "medium"
  | "large";

export interface TableProps extends Pick<React.TableHTMLAttributes<HTMLTableElement>, "align" | "summary"> {
  children: React.ReactNode;
  isDraggable?: boolean;
  maxWidth?: string;
  pagination?: ReactNode;
  stickyColumn?: "first" | "last" | "both";
  stickyRow?: "header" | "footer" | "both";
  variant?: TableContextProps["variant"];
  size?: TableContextProps["size"];
  isZebraStriped?: boolean;
  outerBorders?: "none" | "small";
  horizontalBorderThickness?: BorderThickness;
  verticalBorderThickness?: BorderThickness;
}

const Table = ({
  children,
  align,
  maxWidth,
  isDraggable = false,
  pagination,
  stickyColumn,
  stickyRow,
  variant = "prominent",
  size = "medium",
  isZebraStriped = false,
  outerBorders = "small",
  horizontalBorderThickness = "small",
  verticalBorderThickness = "small",
  ...props
}: TableProps) => {
  const hasStickyFirstColumn = stickyColumn === "first" || stickyColumn === "both";
  const hasStickyLastColumn = stickyColumn === "last" || stickyColumn === "both";
  const hasStickyHeader = stickyRow === "header" || stickyRow === "both";
  const hasStickyFooter = stickyRow === "footer" || stickyRow === "both";
  const hasOuterBorders = variant !== "prominent" && outerBorders === "none";

  return (
    <TableContext.Provider value={{ isDraggable, variant, size }}>
      <StyledTableWrapper
        $maxWidth={maxWidth}
        data-component="table-wrapper"
        data-role="table-wrapper"
      >
        <StyledTable
          data-role="table"
          {...props}
          $align={align}
          data-component="table"
          data-has-first-column={hasStickyFirstColumn}
          data-has-last-column={hasStickyLastColumn}
          data-has-sticky-header={hasStickyHeader}
          data-has-sticky-footer={hasStickyFooter}
          $isZebraStriped={isZebraStriped}
          $hasOverflow={!!maxWidth}
          $variant={variant}
          $removeOuterBorders={hasOuterBorders}
          $horizontalBorderThickness={horizontalBorderThickness}
          $verticalBorderThickness={verticalBorderThickness}
        >
          {children}
        </StyledTable>
        {pagination}
      </StyledTableWrapper>
    </TableContext.Provider>
  );
};

export default Table;

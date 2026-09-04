import React, { useContext } from "react";
import { TableContext } from "../__internal__/contexts";
import StyledTableHeaderCell from "./table-header.style";
import Sort, { SortProps } from "./__internal__/sort";
import { BorderThickness } from "../table.component";

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * The content of the header cell.
   */
  children: React.ReactNode;
  /**
   * The width of the header cell.
   */
  width?: string;
  /**
   * Indicates whether the header cell is sortable or not.
   * If `sortType` and `onSort` are provided, the header cell will be rendered as a sortable cell.
   */
  sortType?: SortProps["sortType"];
  /**
   * Callback function to handle the Sort button click event.
   * 
   * @param ev React's mouse event for the Sort button element
   * @returns 
   */
  onSort?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * @private @ignore @internal
   */
  isSelectable?: boolean;
  /**
   * Override the vertical border thickness of the table cell.
   * This is to allow for the correct border thickness to be applied to the cell if there's row or column spanning.
   */
  borderThickness?: BorderThickness;
  /**
   * Sets the styling of the header cell to either default or alternate.
   */
  variantType?: "default" | "alternate";
  /**
   * The aria-roledescription attribute for the Sort button.
   */
  sortAriaRoleDescription?: string;
  /**
   * The id attribute for the header cell.
   */
  id?: string;
}

const TableHeader = ({
  children,
  width,
  sortType,
  onSort,
  isSelectable,
  borderThickness,
  variantType,
  sortAriaRoleDescription,
  ...props
}: TableHeaderCellProps) => {
  const isSortable = sortType !== undefined && onSort !== undefined;
  const { variant, size } = useContext(TableContext);

  return (
    <StyledTableHeaderCell
      $variant={variant}
      $size={size}
      $width={width}
      {...props}
      $borderThickness={borderThickness}
      $alternate={variantType === "alternate"}
    >
      <div data-is-sortable={isSortable}>
        {isSortable ? (
          <Sort
            sortType={sortType}
            onClick={onSort}
            data-role={`table-header-sort-${sortType}`}
            aria-roledescription={sortAriaRoleDescription}>
            {children}
          </Sort>
        ) : (
          children
        )}
      </div>
    </StyledTableHeaderCell>
  );
};

export default TableHeader;

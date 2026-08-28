import React, {useCallback, useContext} from "react";
import { TableContext, TableRowContext } from "../__internal__/contexts";
import StyledTableHeaderCell from "./table-header.style";
import Sort, { SortProps } from "./__internal__/sort";
import { Checkbox } from "../../checkbox";
import useMappedSize from "../__internal__/hooks/use-mapped-size";
import { BorderThickness } from "../table.component";

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  width?: string;
  sortType?: SortProps["sortType"];
  onSort?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * @private @ignore @internal
   */
  isSelectable?: boolean;

  borderThickness?: BorderThickness;

  variantType?: "default" | "alternate";
}

const TableHeader = ({ children, width, sortType, onSort, isSelectable, borderThickness, variantType, ...props }: TableHeaderCellProps) => {
  const isSortable = sortType !== undefined && onSort !== undefined;
  const { variant, size } = useContext(TableContext);
  const mappedSize = useMappedSize(size);
  const {
    isSelected,
    toggleSelected,
  } = useContext(TableRowContext);

  const handleSelectableOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      toggleSelected?.((p) => !p);
    },
    [toggleSelected],
  );

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
          <Sort sortType={sortType} onClick={onSort} data-role={`table-header-sort-${sortType}`}>
            {children}
          </Sort>
        ) : (
          <>
          {isSelectable && (
            <Checkbox
              size={mappedSize}
              checked={isSelected}
              onChange={handleSelectableOnChange}
              onClick={(ev) => ev.stopPropagation()}
              data-component="table-cell-select-checkbox"
              data-role="table-cell-select-checkbox"
            />
          )}
          {children}
          </>
        )}
      </div>
    </StyledTableHeaderCell>
  );
};

export default TableHeader;

import React, { useCallback, useContext } from "react";
import { TableContext, TableRowContext } from "../__internal__/context";
import StyledTableCell, { StyledExpandIcon } from "./table-cell.style";
import Icon from "../../icon";
import { Checkbox } from "../../checkbox";
import useMappedSize from "../__internal__/hooks/use-mapped-size";
import { BorderThickness } from "../table.component";

export interface TableCellProps extends Pick<React.TdHTMLAttributes<HTMLTableCellElement>, "colSpan" | "rowSpan"> {
  children: React.ReactNode;
  /**
   * Indicate which corner the cell is in.
   * This is to allow for the correct border radius to be applied to the cell if there's row or column spanning.
   */
  // corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   * @private @ignore @internal
   */
  isExpandable?: boolean;
  /**
   * @private @ignore @internal
   */
  isDraggable?: boolean;
  /**
   * @private @ignore @internal
   */
  isSubRow?: boolean;
  /**
   * @private @ignore @internal
   */
  subRowIds?: string;
  /**
   * @private @ignore @internal
   */
  isSelectable?: boolean;

  id?: string;

  borderThickness?: BorderThickness;
  borderColor?: string;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, isExpandable, isDraggable, isSubRow, isSelectable, subRowIds, id, borderThickness, borderColor, ...props }: TableCellProps, ref) => {
  const { size } = useContext(TableContext);
  const {
    isExpanded,
    setIsExpanded,
    isSelected,
    toggleSelected,
  } = useContext(TableRowContext);
  const mappedSize = useMappedSize(size);

  const handleExpandClick = useCallback(() => {
    if (isExpandable) {
      setIsExpanded(p => !p);
    }
  }, [isExpandable, setIsExpanded]);

  const handleExpandKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableCellElement>) => {
      if (isExpandable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        setIsExpanded(p => !p);
      }
    },
    [isExpandable, setIsExpanded]
  );

  const handleSelectableOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      toggleSelected?.((p) => !p);
    },
    [toggleSelected],
  );

  return (
    <StyledTableCell
      ref={ref}
      id={id}
      $isExpandable={isExpandable}
      aria-expanded={isExpandable ? isExpanded : undefined}
      aria-controls={isExpandable && isExpanded ? subRowIds : undefined}
      tabIndex={isExpandable ? 0 : undefined}
      $size={size}
      {...props}
      data-component="table-cell"
      data-role="table-cell"
      onClick={handleExpandClick}
      onKeyDown={handleExpandKeyDown}
      // data-corner={corner}
      $isDragHandle={isDraggable}
      $borderThickness={borderThickness}
      $borderColor={borderColor}
    >
      <div data-element="table-cell-collapse">
        <div data-element="table-cell-clip">
          <div data-element="table-cell-content-container">
            {isDraggable && (
              <Icon size={mappedSize} type="drag" data-component="table-cell-drag-handle" data-role="table-cell-drag-handle" />
            )}
            {isExpandable && (
              <StyledExpandIcon
                $isExpanded={isExpanded}
                aria-hidden="true"
              >
                <Icon
                  type="chevron_down_thick"
                  size={mappedSize}
                  data-component="table-cell-expand-icon"
                  data-role="table-cell-expand-icon"
                />
              </StyledExpandIcon>
            )}
            {isSubRow && (
              <span
                style={{ width: "32px" }}
                data-component="table-cell-subrow-spacer"
                data-role="table-cell-subrow-spacer"
              />
            )}
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
            <div data-element="table-cell-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </StyledTableCell>
  );
  }
);

export default TableCell;

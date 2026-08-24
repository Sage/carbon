import React, { useCallback, useContext } from "react";
import { TableContext, TableRowContext } from "../__internal__/contexts";
import StyledTableCell, {
  CellContent,
  StyledExpandIcon,
} from "./table-cell.style";
import Icon from "../../icon";
import { BorderThickness } from "../table.component";

export interface TableCellProps
  extends Pick<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    "colSpan" | "rowSpan"
  > {
  /**
   * The content of the table cell.
   */
  children: React.ReactNode;
  /**
   * The alignment of the table cell content.
   */
  align?: "left" | "right" | "center";
  /**
   * @private @ignore @internal
   * Specifies whether the table is expandable. This will render an expand/collapse button within the cell.
   */
  isExpandable?: boolean;
  /**
   * @private @ignore @internal
   * Specifies whether the table cell is draggable. This will render a drag handle within the cell.
   */
  isDraggable?: boolean;
  /**
   * @private @ignore @internal
   * Specifies whether the table cell is a sub-row. This will render a spacer within the cell.
   */
  isSubRow?: boolean;
  /**
   * @private @ignore @internal
   * Specifies the IDs of the sub-rows controlled by this table cell when it is expandable.
   */
  subRowIds?: string;
  /**
   * The id attribute for the table cell.
   */
  id?: string;
  /**
   * Override the vertical border thickness of the table cell.
   */
  borderThickness?: BorderThickness;
  /**
   * The HTML element to render the table cell as.
   */
  as?: "td" | "th";
  /**
   * The scope attribute specifies the set of data cells for which the header cell provides header information.
   */
  scope?: "row" | "col" | "rowgroup" | "colgroup";
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      children,
      isExpandable,
      isDraggable,
      isSubRow,
      subRowIds,
      id,
      borderThickness,
      align = "left",
      ...props
    }: TableCellProps,
    ref,
  ) => {
    const { size } = useContext(TableContext);
    const { isExpanded, setIsExpanded } = useContext(TableRowContext);

    const handleExpandClick = useCallback(() => {
      /* istanbul ignore else */
      if (isExpandable) {
        setIsExpanded((p) => !p);
      }
    }, [isExpandable, setIsExpanded]);

    const handleExpandKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTableCellElement>) => {
        /* istanbul ignore else */
        if (isExpandable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setIsExpanded((p) => !p);
        }
      },
      [isExpandable, setIsExpanded],
    );

    return (
      <StyledTableCell
        ref={ref}
        id={id}
        $size={size}
        {...props}
        data-component="table-cell"
        data-role="table-cell"
        onClick={handleExpandClick}
        onKeyDown={handleExpandKeyDown}
        $isDragHandle={isDraggable}
        $borderThickness={borderThickness}
      >
        <div data-element="table-cell-collapse">
          <div data-element="table-cell-clip">
            <CellContent
              $isExpandable={isExpandable}
              $align={align}
              as={isExpandable ? "button" : undefined}
              type={isExpandable ? "button" : undefined}
              data-element="table-cell-content-container"
              aria-expanded={isExpandable ? isExpanded : undefined}
              aria-controls={isExpandable && isExpanded ? subRowIds : undefined}
            >
              {isDraggable && (
                <Icon
                  type="drag"
                  data-component="table-cell-drag-handle"
                  data-role="table-cell-drag-handle"
                />
              )}
              {isExpandable && (
                <StyledExpandIcon $isExpanded={isExpanded} aria-hidden="true">
                  <Icon
                    type="chevron_down_thick"
                    data-component="table-cell-expand-icon"
                    data-role="table-cell-expand-icon"
                  />
                </StyledExpandIcon>
              )}
              {isSubRow && (
                <span
                  style={{ width: "var(--global-space-comp-xl)" }}
                  data-component="table-cell-subrow-spacer"
                  data-role="table-cell-subrow-spacer"
                />
              )}
              <div data-element="table-cell-content">{children}</div>
            </CellContent>
          </div>
        </div>
      </StyledTableCell>
    );
  },
);

export default TableCell;

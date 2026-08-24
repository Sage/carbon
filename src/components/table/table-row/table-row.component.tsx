import React, { ReactNode, useState, useContext, useMemo, useRef, useEffect } from "react";
import {TableContext, TableRowContext, TableFooterContext, SubRowContext, TableHeaderContext} from "../__internal__/context";
import StyledTableRow from "./table-row.style";
import { TableCellProps } from "../table-cell/table-cell.component";
import { useSortableRow } from "../__internal__/sortable";
import combineRefs from "../../../__internal__/utils/helpers/combine-refs";
import { Transition, TransitionStatus } from "react-transition-group";
import { BorderThickness } from "../table.component";

const ANIMATION_DURATION = 200;
const UNMOUNT_DELAY = ANIMATION_DURATION + 50;

export interface TableRowProps {
  children: ReactNode;
  isExpanded?: boolean;
  isHighlighted?: boolean;
  isSelected?: boolean;
  onRowSelect?: (setSelected: React.Dispatch<React.SetStateAction<boolean>>) => void;
  subRows?: ReactNode;
  borderThickness?: BorderThickness;
  id: string;

  /** @ignore @private Internal props, set by parent `FlatTableBodyDraggable`, for enabling drag and drop behaviour on the row. */
  draggableProps?: {
    index: number;
  };
}

const flattenChildren = (children: React.ReactNode): React.ReactNode[] => {
  return React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement(child)) {
      return [];
    }

    if (child.type === React.Fragment) {
      return flattenChildren(child.props.children);
    }

    return [child];
  });
};

interface DecorateFirstCellProps {
  isDraggable: boolean;
  isExpandable: boolean;
  isSubRow: boolean;
  isSelectable: boolean;
  dragHandleRef: React.RefObject<HTMLTableCellElement>;
  subRowIds: string;
}

const decorateFirstCell = (cell: React.ReactNode, {isDraggable, isExpandable, isSubRow, subRowIds, isSelectable, dragHandleRef}: DecorateFirstCellProps) => {
  if (!React.isValidElement(cell)) return [];
  return [
    React.cloneElement(cell as React.ReactElement<TableCellProps>, {
      ref: isDraggable ? dragHandleRef : undefined,
      isDraggable,
      isExpandable,
      isSubRow,
      subRowIds,
      isSelectable,
      ...cell.props,
    }),
  ];
};

const getSubRowIds = (subRows?: React.ReactNode) => {
  if (subRows === undefined) {
    return "";
  }

  return flattenChildren(subRows)
    .filter(React.isValidElement)
    .map((row) => (row as React.ReactElement<TableRowProps>).props.id)
    .filter(Boolean)
    .join(" ");
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({
  children,
  isExpanded = false,
  isHighlighted = false,
  isSelected = false,
  subRows,
  borderThickness,
  id,
  draggableProps,
  onRowSelect,
  ...props
}, ref) => {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const dragHandleRef = useRef<HTMLTableCellElement>(null);
  const combinedRef = combineRefs(ref, rowRef);
  const [expanded, setExpanded] = useState(isExpanded);
  const { isDraggable, size } = useContext(TableContext);
  const { isInFooter } = useContext(TableFooterContext);
  const { isInHeader } = useContext(TableHeaderContext);
  const { isSubRow, transitionStatus } = useContext(SubRowContext);
  const draggable = isDraggable && !isInFooter && !isInHeader;
  const sortable = draggable && Boolean(draggableProps);
  const dataComponent = `table${draggable ? "-draggable" : ""}${isSubRow ? "-sub" : ""}-row`;
  const cells = flattenChildren(children);
  const firstCell = cells[0];
  const isExpandable = !!subRows;
  const isSelectable = !!onRowSelect;
  const subRowIds = getSubRowIds(subRows);
  const decoratedFirstCell = decorateFirstCell(
    firstCell,
    {
      isDraggable: sortable,
      isExpandable,
      isSubRow,
      subRowIds,
      isSelectable,
      dragHandleRef,
    }
  );
  const decoratedChildren =
    !isInFooter
      ? [...decoratedFirstCell, ...cells.slice(1)]
      : children;

  const { isDragging, isDropTarget } = useSortableRow({
    id,
    index: draggableProps?.index ?? 0,
    ref: sortable ? rowRef : null,
    dragHandleRef: sortable ? dragHandleRef : null,
  });

  const contextValue = useMemo(
    () => ({
      isExpanded: expanded,
      setIsExpanded: setExpanded,
      isSelected,
      toggleSelected: onRowSelect,
    }),
    [expanded, isSelected, onRowSelect]
  );

  const isSubRowVisible =
    transitionStatus === "entering" ||
    transitionStatus === "entered";
  
  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  return (
    <TableRowContext.Provider value={contextValue}>
      <StyledTableRow
        data-role={dataComponent}
        {...props}
        $isExpanded={expanded}
        $isHighlighted={isHighlighted}
        $isSelected={isSelected}
        $size={size}
        $borderThickness={borderThickness}
        data-component={dataComponent}
        id={id}
        ref={combinedRef}
        $isDropTarget={isDropTarget}
        $isDragging={isDragging}
        data-is-dragging={isDragging}
        data-is-selected={isSelected}
        $isSubRowVisible={isSubRow ? isSubRowVisible : undefined}
        aria-hidden={
          isSubRow && !isSubRowVisible
            ? "true"
            : undefined
        }
        inert={
          isSubRow && !isSubRowVisible
            ? "true"
            : undefined
        }
      >
        {decoratedChildren}
      </StyledTableRow>
      <Transition
        in={expanded}
        timeout={{
          enter: ANIMATION_DURATION,
          exit: UNMOUNT_DELAY,
        }}
      >
        {(transitionStatus: TransitionStatus) => (
          <SubRowContext.Provider
            value={{
              isSubRow: true,
              transitionStatus,
            }}
          >
            {subRows}
          </SubRowContext.Provider>
        )}
      </Transition>
    </TableRowContext.Provider>
  );
});

export default TableRow;

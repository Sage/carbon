import React, {
  ReactNode,
  useState,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  TableContext,
  TableRowContext,
  TableFooterContext,
  SubRowContext,
  TableHeaderContext,
} from "../__internal__/contexts";
import StyledTableRow from "./table-row.style";
import { TableCellProps } from "../table-cell/table-cell.component";
import { useDraggableRow } from "../__internal__/drag-drop";
import combineRefs from "../../../__internal__/utils/helpers/combine-refs";
import { Transition, TransitionStatus } from "react-transition-group";
import { BorderThickness } from "../table.component";
import flattenChildren from "../__internal__/utils";

const ANIMATION_DURATION = 200;
const UNMOUNT_DELAY = ANIMATION_DURATION + 50;

export interface TableRowProps {
  /**
   * The content of the table row.
   */
  children: ReactNode;
  /**
   * Controls whether the table row is expanded. When omitted, the row manages
   * its own expansion state and is initially collapsed.
   */
  isExpanded?: boolean;
  /**
   * Callback fired with the requested expansion state when the disclosure
   * control is activated.
   */
  onExpansionChange?: (isExpanded: boolean) => void;
  /**
   * Indicates whether the table row is selected.
   */
  isSelected?: boolean;
  /**
   * The sub-rows of the expandable table row.
   */
  subRows?: ReactNode;
  /**
   * The border thickness of the table row.
   */
  borderThickness?: BorderThickness;
  /**
   * The id attribute for the table row.
   */
  id: string;
  /**
   * @ignore @private
   * Internal props, set by parent `FlatTableBodyDraggable`, for enabling drag and drop behaviour on the row.
   */
  draggableProps?: {
    index: number;
  };
}

interface DecorateFirstCellProps {
  /**
   * Indicates whether the table cell is draggable.
   */
  isDraggable: boolean;
  /**
   * Indicates whether the table cell is expandable.
   */
  isExpandable: boolean;
  /**
   * Indicates whether the table cell is a sub-row.
   */
  isSubRow: boolean;
  /**
   * The ref object for the drag handle within the table cell.
   */
  dragHandleRef: React.RefObject<HTMLSpanElement>;
  /**
   * The IDs of the sub-rows controlled by this table cell when it is expandable.
   */
  subRowIds: string;
}

const decorateFirstCell = (
  cell: React.ReactNode,
  {
    isDraggable,
    isExpandable,
    isSubRow,
    subRowIds,
    dragHandleRef,
  }: DecorateFirstCellProps,
) => {
  /* istanbul ignore if */
  if (!React.isValidElement(cell)) return [];

  return [
    React.cloneElement(cell as React.ReactElement<TableCellProps>, {
      dragHandleRef: isDraggable ? dragHandleRef : undefined,
      isDraggable,
      isExpandable,
      isSubRow,
      subRowIds,
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
};

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      children,
      isExpanded,
      onExpansionChange,
      isSelected = false,
      subRows,
      borderThickness,
      id,
      draggableProps,
      ...props
    },
    ref,
  ) => {
    const rowRef = useRef<HTMLTableRowElement>(null);
    const dragHandleRef = useRef<HTMLSpanElement>(null);
    const combinedRef = combineRefs(ref, rowRef);
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState(false);
    const isExpansionControlled = isExpanded !== undefined;
    const expanded = isExpansionControlled ? isExpanded : uncontrolledExpanded;
    const { isDraggable } = useContext(TableContext);
    const { isInFooter } = useContext(TableFooterContext);
    const { isInHeader } = useContext(TableHeaderContext);
    const { isSubRow, transitionStatus } = useContext(SubRowContext);
    const draggable = isDraggable && !isInFooter && !isInHeader;
    const isValidDraggableRow = draggable && Boolean(draggableProps);
    const dataComponent = `table${draggable ? "-draggable" : ""}${isSubRow ? "-sub" : ""}-row`;
    const cells = flattenChildren(children);
    const firstCell = cells[0];
    const isExpandable = !!subRows;
    const subRowIds = getSubRowIds(subRows);
    const decoratedFirstCell = decorateFirstCell(firstCell, {
      isDraggable: isValidDraggableRow,
      isExpandable,
      isSubRow,
      subRowIds,
      dragHandleRef,
    });
    const decoratedChildren = !isInFooter
      ? [...decoratedFirstCell, ...cells.slice(1)]
      : children;

    const { isDragging, dropIndicatorPosition } = useDraggableRow({
      id,
      index: draggableProps?.index ?? 0,
      ref: isValidDraggableRow ? rowRef : null,
      dragHandleRef: isValidDraggableRow ? dragHandleRef : null,
    });

    const setExpanded = useCallback(
      (nextExpanded: boolean) => {
        if (!isExpansionControlled) {
          setUncontrolledExpanded(nextExpanded);
        }

        onExpansionChange?.(nextExpanded);
      },
      [isExpansionControlled, onExpansionChange],
    );

    const contextValue = useMemo(
      () => ({
        isExpanded: expanded,
        setIsExpanded: setExpanded,
      }),
      [expanded, setExpanded],
    );

    const isSubRowVisible =
      transitionStatus === "entering" || transitionStatus === "entered";
    const shouldClipSubRow = transitionStatus !== "entered";

    return (
      <TableRowContext.Provider value={contextValue}>
        <StyledTableRow
          data-role={dataComponent}
          {...props}
          $isSelected={!isInHeader && !isInFooter && isSelected}
          $borderThickness={borderThickness}
          data-component={dataComponent}
          id={id}
          ref={combinedRef}
          $dropIndicatorPosition={dropIndicatorPosition}
          $isDragging={isDragging}
          data-drop-indicator-position={dropIndicatorPosition ?? undefined}
          data-is-dragging={isDragging}
          data-is-selected={isSelected}
          $isSubRowVisible={isSubRow ? isSubRowVisible : undefined}
          $shouldClipSubRow={isSubRow ? shouldClipSubRow : undefined}
          aria-hidden={isSubRow && !isSubRowVisible ? "true" : undefined}
          inert={isSubRow && !isSubRowVisible ? "true" : undefined}
        >
          {decoratedChildren}
        </StyledTableRow>
        <Transition
          nodeRef={rowRef}
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
  },
);

export default TableRow;

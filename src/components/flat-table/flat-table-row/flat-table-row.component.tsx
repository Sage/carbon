import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import invariant from "invariant";
import { ConnectDropTarget, ConnectDragSource } from "react-dnd";
import { FlatTableCell, TableBorderSize } from "..";

import Event from "../../../__internal__/utils/helpers/events";
import StyledFlatTableRow from "./flat-table-row.style";
import { DrawerSidebarContext } from "../../drawer";
import FlatTableRowHeader from "../flat-table-row-header";
import FlatTableRowDraggable, {
  FlatTableRowDraggableProps,
} from "./__internal__/flat-table-row-draggable.component";
import { FlatTableThemeContext } from "../flat-table.component";
import guid from "../../../__internal__/utils/helpers/guid";
import FlatTableRowContext from "./__internal__/flat-table-row-context";
import SubRowProvider, { SubRowContext } from "./__internal__/sub-row-provider";
import StyledIcon from "../../icon/icon.style";
import { DraggableBodyContext } from "../flat-table-body-draggable/flat-table-body-draggable.component";

export interface FlatTableRowProps {
  /** Overrides default cell color, provide design token, any color from palette or any valid css color value. */
  bgColor?: string;
  /** Array of FlatTableHeader or FlatTableCell. FlatTableRowHeader could also be passed. */
  children: React.ReactNode;
  /** Allows the row to be expanded, must be used with the `subRows` prop. */
  expandable?: boolean;
  /** Sets an expandable row to be expanded on start */
  expanded?: boolean;
  /** Area to click to open sub rows when expandable. Default is `wholeRow` */
  expandableArea?: "wholeRow" | "firstColumn";
  /** Allows developers to manually control highlighted state for the row. */
  highlighted?: boolean;
  /** Sets the color of the bottom border in the row */
  horizontalBorderColor?: string;
  /** Sets the weight of the bottom border in the row */
  horizontalBorderSize?: TableBorderSize;
  /** Function to handle click event. If provided the Component could be focused with tab key. */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Allows developers to manually control selected state for the row. */
  selected?: boolean;
  /** Sub rows to be shown when the row is expanded, must be used with the `expandable` prop. */
  subRows?: React.ReactNode;
  /** @ignore @private position in header if multiple rows */
  stickyOffset?: number;
  /** @ignore @private applies a border-left to the first child */
  applyBorderLeft?: boolean;
  /** ID for use in drag and drop functionality
   * @private
   * @ignore
   */
  id?: string | number;
  /**
   * @private
   * @ignore
   */
  findItem?: FlatTableRowDraggableProps["findItem"];
  /**
   * @private
   * @ignore
   */
  moveItem?: FlatTableRowDraggableProps["moveItem"];
  /** @ignore @private position in header if multiple rows */
  draggable?: boolean;
  /** @ignore @private */
  ref?: React.RefObject<HTMLTableRowElement>;
}

export const FlatTableRow = React.forwardRef<
  HTMLTableRowElement,
  FlatTableRowProps
>(
  (
    {
      children,
      onClick,
      expandable,
      expandableArea = "wholeRow",
      expanded = false,
      stickyOffset,
      highlighted,
      selected,
      subRows,
      bgColor,
      horizontalBorderColor,
      horizontalBorderSize = "small",
      applyBorderLeft,
      id,
      ...rest
    }: FlatTableRowProps,
    ref
  ) => {
    const internalId = useRef(String(id) ?? guid());
    const [isExpanded, setIsExpanded] = useState(expanded);
    let rowRef = useRef<HTMLTableRowElement>(null);
    if (ref) {
      rowRef = ref as React.MutableRefObject<HTMLTableRowElement | null>;
    }
    const firstColumnExpandable = expandableArea === "firstColumn";
    const [leftPositions, setLeftPositions] = useState<Record<string, number>>(
      {}
    );
    const [rightPositions, setRightPositions] = useState<
      Record<string, number>
    >({});
    const [firstCellIndex, setFirstCellIndex] = useState(0);
    const [lhsRowHeaderIndex, setLhsRowHeaderIndex] = useState(-1);
    const [rhsRowHeaderIndex, setRhsRowHeaderIndex] = useState(-1);
    const [firstCellId, setFirstCellId] = useState<string | null>(null);
    const [cellsArray, setCellsArray] = useState<Element[]>([]);
    const [tabIndex, setTabIndex] = useState(-1);
    let interactiveRowProps = {};

    useLayoutEffect(() => {
      const buildPositionMap = (cells: Element[]) =>
        cells.reduce((acc: Record<string, number>, cell, index) => {
          const currentId = cells[index].getAttribute("id");
          if (currentId) {
            if (index === 0) {
              acc[currentId] = 0;
            } else {
              const previousId = cells[index - 1].getAttribute("id");
              if (previousId) {
                acc[currentId] =
                  acc[previousId] +
                  (cells[index - 1] as HTMLTableCellElement).offsetWidth;
              }
            }
          }
          return acc;
        }, {});

      const cells = rowRef.current?.querySelectorAll("th, td");

      if (cells) {
        const cellArray = Array.from(cells);
        setCellsArray(cellArray);

        const firstIndex = cellArray.findIndex(
          (cell) =>
            cell.getAttribute("data-component") !== "flat-table-checkbox"
        );
        const lhsIndex = cellArray.findIndex(
          (cell) => cell.getAttribute("data-sticky-align") === "left"
        );
        const rhsIndex = cellArray.findIndex(
          (cell) => cell.getAttribute("data-sticky-align") === "right"
        );

        if (firstIndex !== -1) {
          setFirstCellIndex(firstIndex);
          setFirstCellId(cellArray[firstIndex].getAttribute("id"));
        }
        if (lhsIndex !== -1) {
          setLhsRowHeaderIndex(lhsIndex);
          const newObj = buildPositionMap(
            cellArray.slice(0, lhsRowHeaderIndex + 1)
          );

          if (JSON.stringify(leftPositions) !== JSON.stringify(newObj)) {
            setLeftPositions(newObj);
          }
        }
        if (rhsIndex !== -1) {
          setRhsRowHeaderIndex(rhsIndex);
          const newObj = buildPositionMap(
            cellArray.slice(rhsRowHeaderIndex, cellArray.length).reverse()
          );
          if (JSON.stringify(rightPositions) !== JSON.stringify(newObj)) {
            setRightPositions(newObj);
          }
        }
      }
    }, [
      children,
      leftPositions,
      lhsRowHeaderIndex,
      rhsRowHeaderIndex,
      rightPositions,
    ]);

    const noStickyColumnsOverlap = useMemo(() => {
      const hasLhsColumn = lhsRowHeaderIndex !== -1;
      const hasRhsColumn = rhsRowHeaderIndex !== -1;
      if (!hasLhsColumn || !hasRhsColumn) return true;

      return lhsRowHeaderIndex < rhsRowHeaderIndex;
    }, [lhsRowHeaderIndex, rhsRowHeaderIndex]);

    invariant(
      noStickyColumnsOverlap,
      `Do not render a right hand side \`${FlatTableRowHeader.displayName}\` before left hand side \`${FlatTableRowHeader.displayName}\``
    );

    const { colorTheme, size, setSelectedId, selectedId } = useContext(
      FlatTableThemeContext
    );
    const { isInSidebar } = useContext(DrawerSidebarContext);

    const toggleExpanded = () => setIsExpanded(!isExpanded);

    function onKeyDown(
      ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
    ) {
      const isEnterOrSpaceKey =
        Event.isEnterKey(ev as React.KeyboardEvent<HTMLElement>) ||
        Event.isSpaceKey(ev as React.KeyboardEvent<HTMLElement>);

      if (
        expandable &&
        !firstColumnExpandable &&
        document.activeElement === rowRef.current &&
        isEnterOrSpaceKey
      ) {
        ev.preventDefault();
        toggleExpanded();
      }

      if (isEnterOrSpaceKey && onClick) {
        onClick(ev as React.MouseEvent<HTMLElement>);
      }
    }

    function handleClick(ev: React.MouseEvent<HTMLElement>) {
      if (onClick) {
        onClick(ev);
      }
      if (expandable && !firstColumnExpandable) {
        toggleExpanded();
      }
    }

    if (onClick || expandable) {
      interactiveRowProps = {
        isRowInteractive: !firstColumnExpandable,
        tabIndex: firstColumnExpandable ? undefined : tabIndex,
        onKeyDown,
        isFirstColumnInteractive: firstColumnExpandable,
        isExpanded,
      };
    }

    function handleCellKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
      const isEnterOrSpaceKey = Event.isEnterKey(ev) || Event.isSpaceKey(ev);

      if (isEnterOrSpaceKey) {
        ev.preventDefault();
        toggleExpanded();
      }
    }

    useEffect(() => {
      setIsExpanded(expanded);
    }, [expanded]);

    useEffect(() => {
      if (highlighted || selected) {
        setSelectedId(internalId.current);
      }
    }, [highlighted, selected, setSelectedId]);

    useEffect(() => {
      setTabIndex(selectedId === internalId.current ? 0 : -1);
    }, [selectedId]);

    const { draggable } = useContext(DraggableBodyContext);
    // const { isDragging, drag, drop } = useContext(DraggableContext)

    const { isSubRow, firstRowId, addRow, removeRow } = useContext(
      SubRowContext
    );

    useEffect(() => {
      const rowId = internalId.current;
      addRow(rowId);

      return () => {
        removeRow(rowId);
      };
    }, [addRow, removeRow]);

    const isFirstSubRow = firstRowId === internalId.current;

    // console.log("here", rowRef.current, drag, drop)
    // useEffect(() => {
    //   if (rowRef.current && drag && drop) {

    //     drag(drop(rowRef.current))
    //   }
    // }, [drag, drop])

    // console.log(draggable)

    const rowComponent = (
      isDragging?: boolean,
      drag?: ConnectDragSource,
      drop?: ConnectDropTarget
    ) => {
      if (rowRef.current && drag && drop) {
        drag(drop(rowRef.current));
      }
      return (
        <StyledFlatTableRow
          isInSidebar={isInSidebar}
          expandable={expandable}
          isSubRow={isSubRow}
          isFirstSubRow={isFirstSubRow}
          data-element={isSubRow ? "flat-table-sub-row" : "flat-table-row"}
          highlighted={highlighted}
          selected={selected}
          onClick={handleClick}
          firstCellIndex={firstCellIndex}
          ref={rowRef}
          lhsRowHeaderIndex={lhsRowHeaderIndex}
          rhsRowHeaderIndex={rhsRowHeaderIndex}
          colorTheme={colorTheme}
          size={size}
          stickyOffset={stickyOffset}
          bgColor={bgColor}
          horizontalBorderColor={horizontalBorderColor}
          horizontalBorderSize={horizontalBorderSize}
          applyBorderLeft={applyBorderLeft}
          draggable={draggable}
          totalChildren={cellsArray.length}
          id={internalId.current}
          {...interactiveRowProps}
          isDragging={isDragging}
          {...rest}
        >
          <FlatTableRowContext.Provider
            value={{
              firstCellId,
              expandable,
              leftPositions,
              rightPositions,
              firstColumnExpandable,
              onKeyDown: handleCellKeyDown,
              onClick: () => toggleExpanded(),
            }}
          >
            {draggable && (
              <FlatTableCell>
                <StyledIcon type="drag" />
              </FlatTableCell>
            )}
            {children}
          </FlatTableRowContext.Provider>
        </StyledFlatTableRow>
      );
    };

    const draggableComponent = () => (
      <FlatTableRowDraggable id={internalId.current}>
        {(isDragging, drag, drop) => rowComponent(isDragging, drag, drop)}
      </FlatTableRowDraggable>
    );

    return (
      <>
        {draggable ? draggableComponent() : rowComponent()}
        {isExpanded && subRows && <SubRowProvider>{subRows}</SubRowProvider>}
      </>
    );
  }
);

FlatTableRow.displayName = "FlatTableRow";

export default FlatTableRow;

import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import invariant from "invariant";

import Event from "../../../__internal__/utils/helpers/events";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import { TableBorderSize } from "..";
import StyledFlatTableRow from "./flat-table-row.style";
import DrawerSidebarContext from "../../drawer/__internal__/drawer-sidebar.context";
import FlatTableRowHeader from "../flat-table-row-header";
import FlatTableRowDraggable, {
  FlatTableRowDraggableProps,
} from "./__internal__/flat-table-row-draggable.component";
import FlatTableContext from "../__internal__/flat-table.context";
import guid from "../../../__internal__/utils/helpers/guid";
import FlatTableRowContext from "./__internal__/flat-table-row.context";
import SubRowProvider, { SubRowContext } from "./__internal__/sub-row-provider";
import { buildPositionMap } from "../__internal__";
import FlatTableHeadContext from "../flat-table-head/__internal__/flat-table-head.context";

export interface FlatTableRowProps extends Omit<TagProps, "data-component"> {
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
      highlighted,
      selected,
      subRows,
      bgColor,
      horizontalBorderColor,
      horizontalBorderSize = "small",
      id,
      draggable,
      findItem,
      moveItem,
      "data-element": dataElement,
      "data-role": dataRole,
      ...rest
    }: FlatTableRowProps,
    ref,
  ) => {
    const internalId = useRef(id ? String(id) : guid());
    const [isExpanded, setIsExpanded] = useState(expanded);
    let rowRef = useRef<HTMLTableRowElement>(null);
    if (ref) {
      rowRef = ref as React.MutableRefObject<HTMLTableRowElement | null>;
    }
    const firstColumnExpandable = expandableArea === "firstColumn";
    const [leftPositions, setLeftPositions] = useState<Record<string, number>>(
      {},
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
      const checkForPositionUpdates = (
        updated: Record<string, number>,
        current: Record<string, number>,
      ) => {
        const updatedKeys = Object.keys(updated);
        const currentKeys = Object.keys(current);
        if (updatedKeys.length !== currentKeys.length) {
          return true;
        }

        return updatedKeys.some((key) => updated[key] !== current[key]);
      };

      const cells = rowRef.current?.querySelectorAll("th, td") as
        | NodeListOf<HTMLTableCellElement>
        | undefined;

      const cellArray = Array.from(cells || []);
      setCellsArray(cellArray);

      const firstIndex = cellArray.findIndex(
        (cell) => cell.getAttribute("data-component") !== "flat-table-checkbox",
      );
      const lhsIndex = cellArray.findIndex(
        (cell) => cell.getAttribute("data-sticky-align") === "left",
      );
      const rhsIndex = cellArray.findIndex(
        (cell) => cell.getAttribute("data-sticky-align") === "right",
      );

      setLhsRowHeaderIndex(lhsIndex);
      setRhsRowHeaderIndex(rhsIndex);

      if (firstIndex !== -1) {
        setFirstCellIndex(firstIndex);
        setFirstCellId(cellArray[firstIndex].getAttribute("id"));
      } else {
        setFirstCellIndex(0);
      }
      if (lhsIndex !== -1) {
        const updatedLeftPositions = buildPositionMap(
          cellArray.slice(0, lhsRowHeaderIndex + 1),
          "offsetWidth",
        );

        if (checkForPositionUpdates(updatedLeftPositions, leftPositions)) {
          setLeftPositions(updatedLeftPositions);
        }
      }
      if (rhsIndex !== -1) {
        const updatedRightPositions = buildPositionMap(
          cellArray.slice(rhsRowHeaderIndex, cellArray.length).reverse(),
          "offsetWidth",
        );

        if (checkForPositionUpdates(updatedRightPositions, rightPositions)) {
          setRightPositions(updatedRightPositions);
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
      `Do not render a right hand side \`${FlatTableRowHeader.displayName}\` before left hand side \`${FlatTableRowHeader.displayName}\``,
    );

    const { colorTheme, size, getTabStopElementId } =
      useContext(FlatTableContext);
    const { isInSidebar } = useContext(DrawerSidebarContext);
    const { stickyOffsets } = useContext(FlatTableHeadContext);
    const toggleExpanded = () => setIsExpanded(!isExpanded);

    function onKeyDown(
      ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
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

      /* istanbul ignore else */
      if (isEnterOrSpaceKey) {
        ev.preventDefault();
        toggleExpanded();
      }
    }

    useEffect(() => {
      setIsExpanded(expanded);
    }, [expanded]);

    useEffect(() => {
      setTabIndex(getTabStopElementId() === internalId.current ? 0 : -1);
    }, [getTabStopElementId]);

    const { isSubRow, firstRowId, addRow, removeRow } =
      useContext(SubRowContext);

    useEffect(() => {
      const rowId = internalId.current;
      addRow(rowId);

      return () => {
        removeRow(rowId);
      };
    }, [addRow, removeRow]);

    const isFirstSubRow = firstRowId === internalId.current;

    const getDataElement = () => {
      if (dataElement) return dataElement;

      return isSubRow ? "flat-table-sub-row" : "flat-table-row";
    };

    const rowComponent = () => (
      <StyledFlatTableRow
        isInSidebar={isInSidebar}
        expandable={expandable}
        isSubRow={isSubRow}
        isFirstSubRow={isFirstSubRow}
        data-element={getDataElement()}
        data-role={dataRole}
        highlighted={highlighted}
        selected={selected}
        onClick={handleClick}
        firstCellIndex={firstCellIndex}
        ref={rowRef}
        lhsRowHeaderIndex={lhsRowHeaderIndex}
        rhsRowHeaderIndex={rhsRowHeaderIndex}
        colorTheme={colorTheme}
        size={size}
        stickyOffset={stickyOffsets[internalId.current]}
        bgColor={bgColor}
        horizontalBorderColor={horizontalBorderColor}
        horizontalBorderSize={horizontalBorderSize}
        draggable={draggable}
        totalChildren={cellsArray.length}
        id={internalId.current}
        data-selected={selected && expandableArea === "wholeRow"}
        data-highlighted={highlighted && expandableArea === "wholeRow"}
        rowHeight={rowRef?.current?.offsetHeight}
        {...interactiveRowProps}
        {...rest}
        data-component="flat-table-row"
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
            highlighted,
            selected,
          }}
        >
          {children}
        </FlatTableRowContext.Provider>
      </StyledFlatTableRow>
    );

    const draggableComponent = () => (
      <FlatTableRowDraggable
        id={internalId.current}
        moveItem={moveItem}
        findItem={findItem}
        rowRef={rowRef}
      >
        {rowComponent()}
      </FlatTableRowDraggable>
    );

    return (
      <>
        {draggable ? draggableComponent() : rowComponent()}
        {isExpanded && subRows && <SubRowProvider>{subRows}</SubRowProvider>}
      </>
    );
  },
);

FlatTableRow.displayName = "FlatTableRow";

export default FlatTableRow;

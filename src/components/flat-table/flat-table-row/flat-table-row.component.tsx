import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import invariant from "invariant";
import { TableBorderSize } from "..";

import Event from "../../../__internal__/utils/helpers/events";
import StyledFlatTableRow from "./flat-table-row.style";
import { DrawerSidebarContext } from "../../drawer";
import FlatTableCheckbox from "../flat-table-checkbox";
import FlatTableRowHeader from "../flat-table-row-header";
import FlatTableRowDraggable, {
  FlatTableRowDraggableProps,
} from "./__internal__/flat-table-row-draggable.component";
import { FlatTableThemeContext } from "../flat-table.component";
import guid from "../../../__internal__/utils/helpers/guid";
import FlatTableRowProvider, {
  FlatTableRowContext,
} from "./__internal__/flat-table-row-provider";

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
  // /** @ignore @private */
  // isSubRow?: boolean;
  // /** @ignore @private */
  // isFirstSubRow?: boolean;
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
      // isSubRow,
      // isFirstSubRow,
      stickyOffset,
      highlighted,
      selected,
      subRows,
      bgColor,
      horizontalBorderColor,
      horizontalBorderSize = "small",
      applyBorderLeft,
      id,
      draggable,
      findItem,
      moveItem,
      ...rest
    }: FlatTableRowProps,
    ref
  ) => {
    const internalId = useRef(String(id ?? guid()));
    const [isExpanded, setIsExpanded] = useState(expanded);
    let rowRef = useRef<HTMLTableRowElement>(null);
    if (ref) {
      rowRef = ref as React.MutableRefObject<HTMLTableRowElement | null>;
    }
    const firstColumnExpandable = expandableArea === "firstColumn";
    const [leftStickyCellWidths, setLeftStickyCellWidths] = useState<number[]>(
      []
    );
    const [rightStickyCellWidths, setRightStickyCellWidths] = useState<
      number[]
    >([]);
    const [leftPositions, setLeftPositions] = useState<number[]>([]);
    const [rightPositions, setRightPositions] = useState<number[]>([]);
    const childrenArray = useMemo(() => React.Children.toArray(children), [
      children,
    ]);
    const lhsRowHeaderIndex = useMemo(
      () =>
        childrenArray.findIndex(
          (child) =>
            React.isValidElement(child) &&
            (child.type as React.FunctionComponent).displayName ===
              FlatTableRowHeader.displayName &&
            child.props.stickyAlignment !== "right"
        ),
      [childrenArray]
    );
    const rhsRowHeaderIndex = useMemo(
      () =>
        childrenArray.findIndex(
          (child) =>
            React.isValidElement(child) &&
            (child.type as React.FunctionComponent).displayName ===
              FlatTableRowHeader.displayName &&
            child.props.stickyAlignment === "right"
        ),
      [childrenArray]
    );
    const [tabIndex, setTabIndex] = useState(-1);

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

    const reportCellWidth = useCallback(
      (width, index) => {
        const isLeftSticky = index < lhsRowHeaderIndex;
        const copiedArray = isLeftSticky
          ? leftStickyCellWidths
          : rightStickyCellWidths;

        if (copiedArray[index] !== undefined) {
          copiedArray[index] = width;
        } else {
          copiedArray.push(width);
        }
        if (isLeftSticky) {
          setLeftStickyCellWidths(copiedArray);
        } else {
          setRightStickyCellWidths(copiedArray);
        }
      },
      [lhsRowHeaderIndex, leftStickyCellWidths, rightStickyCellWidths]
    );

    let interactiveRowProps = {};

    const firstCellIndex =
      React.isValidElement(childrenArray[0]) &&
      childrenArray[0].type === FlatTableCheckbox
        ? 1
        : 0;

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

    const buildPositionArray = (
      setter: React.Dispatch<React.SetStateAction<number[]>>,
      widthsArray: number[],
      length: number
    ) => {
      setter([
        0,
        ...Array.from({ length }).map(
          (_, index) =>
            widthsArray.slice(0, index + 1).reduce((a, b) => a + b, 0),
          0
        ),
      ]);
    };

    useLayoutEffect(() => {
      if (leftStickyCellWidths.length && lhsRowHeaderIndex !== -1) {
        buildPositionArray(
          setLeftPositions,
          leftStickyCellWidths,
          lhsRowHeaderIndex
        );
      }
    }, [lhsRowHeaderIndex, leftStickyCellWidths]);

    useLayoutEffect(() => {
      if (rightStickyCellWidths.length && rhsRowHeaderIndex !== -1) {
        buildPositionArray(
          setRightPositions,
          rightStickyCellWidths,
          childrenArray.length - (rhsRowHeaderIndex + 1)
        );
      }
    }, [rhsRowHeaderIndex, rightStickyCellWidths, childrenArray]);

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

    const { isSubRow, firstRowId, addRow, removeRow } = useContext(
      FlatTableRowContext
    );

    useEffect(() => {
      const rowId = internalId.current;
      addRow(rowId);

      return () => {
        removeRow(rowId);
      };
    }, [addRow, removeRow]);

    const isFirstSubRow = firstRowId === internalId.current;

    const rowComponent = () => (
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
        totalChildren={childrenArray.length}
        id={internalId.current}
        {...interactiveRowProps}
        {...rest}
      >
        {React.Children.map(children, (child, index) => {
          return (
            React.isValidElement(child) &&
            React.cloneElement(child as React.ReactElement, {
              expandable: expandable && index === firstCellIndex,
              onClick:
                expandable && index === firstCellIndex && firstColumnExpandable
                  ? () => toggleExpanded()
                  : undefined,
              onKeyDown:
                expandable && index === firstCellIndex && firstColumnExpandable
                  ? handleCellKeyDown
                  : undefined,
              cellIndex: index,
              reportCellWidth:
                index < lhsRowHeaderIndex ||
                (rhsRowHeaderIndex !== -1 && index > rhsRowHeaderIndex)
                  ? reportCellWidth
                  : undefined,
              leftPosition: leftPositions[index],
              rightPosition: rightPositions[childrenArray.length - (index + 1)],
              ...child.props,
            })
          );
        })}
      </StyledFlatTableRow>
    );

    const draggableComponent = () => (
      <FlatTableRowDraggable
        id={internalId.current}
        moveItem={moveItem}
        findItem={findItem}
      >
        {rowComponent()}
      </FlatTableRowDraggable>
    );

    return (
      <>
        {draggable ? draggableComponent() : rowComponent()}
        {isExpanded && subRows && (
          <FlatTableRowProvider>{subRows}</FlatTableRowProvider>
        )}
      </>
    );
  }
);

FlatTableRow.displayName = "FlatTableRow";

export default FlatTableRow;

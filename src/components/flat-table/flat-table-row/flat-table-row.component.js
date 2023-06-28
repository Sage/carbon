import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import Event from "../../../__internal__/utils/helpers/events";
import StyledFlatTableRow from "./flat-table-row.style";
import { DrawerSidebarContext } from "../../drawer";
import FlatTableCheckbox from "../flat-table-checkbox";
import FlatTableRowHeader from "../flat-table-row-header";
import FlatTableRowDraggable from "./__internal__/flat-table-row-draggable.component";
import { FlatTableThemeContext } from "../flat-table.component";
import guid from "../../../__internal__/utils/helpers/guid";

const FlatTableRow = React.forwardRef(
  (
    {
      children,
      onClick,
      expandable,
      expandableArea = "wholeRow",
      expanded = false,
      isSubRow,
      isFirstSubRow,
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
    },
    ref
  ) => {
    const internalId = useRef(id ?? guid());
    const [isExpanded, setIsExpanded] = useState(expanded);
    let rowRef = useRef();
    if (ref) rowRef = ref;
    const firstColumnExpandable = expandableArea === "firstColumn";
    const [leftStickyCellWidths, setLeftStickyCellWidths] = useState([]);
    const [rightStickyCellWidths, setRightStickyCellWidths] = useState([]);
    const [leftPositions, setLeftPositions] = useState([]);
    const [rightPositions, setRightPositions] = useState([]);
    const childrenArray = useMemo(() => React.Children.toArray(children), [
      children,
    ]);
    const lhsRowHeaderIndex = useMemo(
      () =>
        childrenArray.findIndex(
          (child) =>
            child.type.displayName === FlatTableRowHeader.displayName &&
            child.props.stickyAlignment !== "right"
        ),
      [childrenArray]
    );
    const rhsRowHeaderIndex = useMemo(
      () =>
        childrenArray.findIndex(
          (child) =>
            child.type.displayName === FlatTableRowHeader.displayName &&
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

    const firstCellIndex = childrenArray[0].type === FlatTableCheckbox ? 1 : 0;

    const toggleExpanded = () => setIsExpanded(!isExpanded);

    function onKeyDown(ev) {
      const isEnterOrSpaceKey = Event.isEnterKey(ev) || Event.isSpaceKey(ev);

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
        onClick(ev);
      }
    }

    function handleClick(ev) {
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

    function handleCellKeyDown(ev) {
      const isEnterOrSpaceKey = Event.isEnterKey(ev) || Event.isSpaceKey(ev);

      if (isEnterOrSpaceKey) {
        ev.preventDefault();
        toggleExpanded();
      }
    }

    const buildPositionArray = (setter, widthsArray, length) => {
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

    const rowComponent = (isInSidebar) => (
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
            child &&
            React.cloneElement(child, {
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

    const draggableComponent = (isInSidebar) => (
      <FlatTableRowDraggable
        id={internalId.current}
        moveItem={moveItem}
        findItem={findItem}
      >
        {rowComponent(isInSidebar)}
      </FlatTableRowDraggable>
    );

    let subRowContent = null;

    if (isExpanded && subRows) {
      if (subRows instanceof Array) {
        subRowContent = React.Children.map(
          subRows,
          (child, index) =>
            child &&
            React.cloneElement(child, {
              isSubRow: true,
              isFirstSubRow: index === 0,
              ...child.props,
            })
        );
      } else {
        subRowContent = React.createElement(subRows);
      }
    }

    return (
      <DrawerSidebarContext.Consumer>
        {({ isInSidebar }) => (
          <>
            {draggable
              ? draggableComponent(isInSidebar)
              : rowComponent(isInSidebar)}
            {subRowContent}
          </>
        )}
      </DrawerSidebarContext.Consumer>
    );
  }
);

FlatTableRow.propTypes = {
  /** Overrides default cell color, provide design token, any color from palette or any valid css color value. */
  bgColor: PropTypes.string,
  /** Array of FlatTableHeader or FlatTableCell. FlatTableRowHeader could also be passed. */
  children: PropTypes.node.isRequired,
  /** Function to handle click event. If provided the Component could be focused with tab key. */
  onClick: PropTypes.func,
  /** Allows developers to manually control highlighted state for the row. */
  highlighted: PropTypes.bool,
  /** Allows developers to manually control selected state for the row. */
  selected: PropTypes.bool,
  /** Allows the row to be expanded, must be used with the `subRows` prop. */
  expandable: PropTypes.bool,
  /** Sub rows to be shown when the row is expanded, must be used with the `expandable` prop. */
  subRows: PropTypes.arrayOf(PropTypes.node),
  /** Area to click to open sub rows when expandable. Default is `wholeRow` */
  expandableArea: PropTypes.oneOf(["wholeRow", "firstColumn"]),
  /** Sets an expandable row to be expanded on start */
  expanded: PropTypes.bool,
  /** Sets the color of the bottom border in the row, provide design token, any color from palette or any valid css color value. */
  horizontalBorderColor: PropTypes.string,
  /** Sets the weight of the bottom border in the row */
  horizontalBorderSize: PropTypes.oneOf(["small", "medium", "large"]),
  /** @ignore @private */
  isSubRow: PropTypes.bool,
  /** @ignore @private */
  isFirstSubRow: PropTypes.bool,
  /** @ignore @private position in header if multiple rows */
  stickyOffset: PropTypes.number,
  /** @ignore @private applies a border-left to the first child */
  applyBorderLeft: PropTypes.bool,
  /** ID for use in drag and drop functionality
   * @private
   * @ignore
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @private
   * @ignore
   */
  findItem: PropTypes.func,
  /**
   * @private
   * @ignore
   */
  moveItem: PropTypes.func,
  /** @ignore @private position in header if multiple rows */
  draggable: PropTypes.bool,
};

export default FlatTableRow;

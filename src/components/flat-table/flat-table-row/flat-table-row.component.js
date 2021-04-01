import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";

import Event from "../../../utils/helpers/events";
import StyledFlatTableRow from "./flat-table-row.style";
import { SidebarContext } from "../../drawer";
import FlatTableCheckbox from "../flat-table-checkbox";
import FlatTableRowHeader from "../flat-table-row-header";
import { FlatTableThemeContext } from "../flat-table.component";

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
      highlighted,
      selected,
      subRows,
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(expanded);
    const rowRef = ref || useRef();
    const firstColumnExpandable = expandableArea === "firstColumn";
    const [stickyCellWidths, setStickyCellWidths] = useState([]);
    const [leftPositions, setLeftPositions] = useState([]);
    const childrenArray = React.Children.toArray(children);
    const rowHeaderIndex = childrenArray.findIndex(
      (child) => child.type === FlatTableRowHeader
    );
    const colorTheme = useContext(FlatTableThemeContext);

    const reportCellWidth = useCallback(
      (width, index) => {
        const copiedArray = stickyCellWidths;
        if (copiedArray[index] !== undefined) {
          copiedArray[index] = width;
        } else {
          copiedArray.push(width);
        }
        setStickyCellWidths(copiedArray);
      },
      [stickyCellWidths]
    );

    let interactiveRowProps = {};

    const firstCellIndex = () =>
      childrenArray[0].type === FlatTableCheckbox ? 1 : 0;

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
      if (onClick) onClick(ev);
      if (expandable && !firstColumnExpandable) {
        toggleExpanded();
      }
    }

    if (onClick || expandable) {
      interactiveRowProps = {
        isRowInteractive: !firstColumnExpandable,
        tabIndex: firstColumnExpandable || isSubRow ? undefined : 0,
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

    useLayoutEffect(() => {
      if (stickyCellWidths.length && rowHeaderIndex !== -1) {
        setLeftPositions([
          0,
          ...Array.from({ length: rowHeaderIndex }).map(
            (_, index) =>
              stickyCellWidths.slice(0, index + 1).reduce((a, b) => a + b, 0),
            0
          ),
        ]);
      }
    }, [rowHeaderIndex, stickyCellWidths]);

    return (
      <SidebarContext.Consumer>
        {(context) => (
          <>
            <StyledFlatTableRow
              isInSidebar={context && context.isInSidebar}
              expandable={expandable}
              isSubRow={isSubRow}
              isFirstSubRow={isFirstSubRow}
              data-element={isSubRow ? "flat-table-sub-row" : "flat-table-row"}
              highlighted={highlighted}
              selected={selected}
              onClick={handleClick}
              firstCellIndex={firstCellIndex()}
              ref={rowRef}
              rowHeaderIndex={rowHeaderIndex}
              colorTheme={colorTheme}
              {...interactiveRowProps}
            >
              {React.Children.map(children, (child, index) => {
                return (
                  child &&
                  React.cloneElement(child, {
                    expandable: expandable && index === firstCellIndex(),
                    onClick:
                      expandable &&
                      index === firstCellIndex() &&
                      firstColumnExpandable
                        ? () => toggleExpanded()
                        : undefined,
                    onKeyDown:
                      expandable &&
                      index === firstCellIndex() &&
                      firstColumnExpandable
                        ? handleCellKeyDown
                        : undefined,
                    cellIndex: index,
                    reportCellWidth:
                      index < rowHeaderIndex ? reportCellWidth : undefined,
                    leftPosition: leftPositions[index],
                    ...child.props,
                  })
                );
              })}
            </StyledFlatTableRow>
            {isExpanded &&
              subRows &&
              React.Children.map(
                subRows,
                (child, index) =>
                  child &&
                  React.cloneElement(child, {
                    isSubRow: true,
                    isFirstSubRow: index === 0,
                    ...child.props,
                  })
              )}
          </>
        )}
      </SidebarContext.Consumer>
    );
  }
);

FlatTableRow.propTypes = {
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
  /** @ignore @private */
  isSubRow: PropTypes.bool,
  /** @ignore @private */
  isFirstSubRow: PropTypes.bool,
};

export default FlatTableRow;

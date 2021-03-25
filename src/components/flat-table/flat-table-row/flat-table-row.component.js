import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import Event from "../../../utils/helpers/events";
import StyledFlatTableRow from "./flat-table-row.style";
import { SidebarContext } from "../../drawer";
import FlatTableCheckbox from "../flat-table-checkbox";

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

    let interactiveRowProps = {};

    const firstCellIndex = () => {
      if (React.Children.toArray(children)[0].type === FlatTableCheckbox)
        return 1;
      return 0;
    };

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

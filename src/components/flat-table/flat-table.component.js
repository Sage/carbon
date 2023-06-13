import React, { useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import {
  StyledFlatTableWrapper,
  StyledFlatTable,
  StyledFlatTableFooter,
  StyledTableContainer,
} from "./flat-table.style";
import { DrawerSidebarContext } from "../drawer";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Events from "../../__internal__/utils/helpers/events/events";

export const FlatTableThemeContext = React.createContext({
  setSelectedId: () => {},
});

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const FOCUSABLE_ROW_AND_CELL_QUERY = "tbody tr, tbody tr td, tbody tr th";

const FlatTable = ({
  caption,
  children,
  hasStickyHead,
  colorTheme,
  footer,
  hasStickyFooter = false,
  height,
  isZebra,
  size,
  hasMaxHeight = false,
  ariaDescribedby,
  minHeight,
  overflowX,
  width,
  ...rest
}) => {
  const wrapperRef = useRef(null);
  const tableRef = useRef(null);
  const [hasVerticalScrollbar, setHasVerticalScrollbar] = useState(false);
  const [hasHorizontalScrollbar, setHasHorizontalScrollbar] = useState(false);
  const [firstColRowSpanIndex, setFirstColRowSpanIndex] = useState(-1);
  const [lastColRowSpanIndex, setLastColRowSpanIndex] = useState(-1);
  const [selectedId, setSelectedId] = useState("");
  const addDefaultHeight = !height && (hasStickyHead || hasStickyFooter);
  const tableStylingProps = {
    caption,
    isZebra,
    size,
  };

  if (ariaDescribedby) {
    tableStylingProps["aria-describedby"] = ariaDescribedby;
  }

  useLayoutEffect(() => {
    const findRow = (rows, isFirstCol) =>
      rows.find((row, index) => {
        const cells = Array.from(row.querySelectorAll("td, th"));

        const cell = isFirstCol ? cells.shift() : cells.pop();
        const rowSpan = cell?.getAttribute("rowspan");

        return rowSpan >= index + 1;
      });

    /* istanbul ignore else */
    if (wrapperRef.current && tableRef.current) {
      const { offsetHeight, offsetWidth } = wrapperRef.current;
      const {
        top,
        bottom,
        right,
        left,
      } = tableRef.current?.getBoundingClientRect();
      setHasVerticalScrollbar(bottom - top > offsetHeight);
      setHasHorizontalScrollbar(right - left > offsetWidth);

      const body = tableRef.current.querySelector("tbody");
      const bodyRows = body ? Array.from(body?.querySelectorAll("tr")) : [];
      const { length } = bodyRows;
      const targetRowFirstCol = findRow(
        bodyRows.slice(0, length - 1).reverse(),
        true
      );
      const targetRowLastCol = findRow(bodyRows.slice(0, length - 1).reverse());

      if (targetRowFirstCol) {
        setFirstColRowSpanIndex(bodyRows.indexOf(targetRowFirstCol));
      }

      if (targetRowLastCol) {
        setLastColRowSpanIndex(bodyRows.indexOf(targetRowLastCol));
      }
    }
  }, [footer, children, height, minHeight]);

  const findParentIndexOfFocusedChild = (array) =>
    array.findIndex((el) => {
      const focusableRowElements = el.querySelectorAll(
        "button, input, a, [tabindex]"
      );

      /* istanbul ignore else */
      if (focusableRowElements) {
        const focusableRowElementsArray = Array.from(focusableRowElements);

        if (
          focusableRowElementsArray.find(
            (el2) => el2 === document.activeElement
          )
        ) {
          return true;
        }
      }

      return false;
    });

  const handleKeyDown = (ev) => {
    const focusableElements = tableRef.current?.querySelectorAll(
      FOCUSABLE_ROW_AND_CELL_QUERY
    );

    /* istanbul ignore if */
    if (!focusableElements) {
      return;
    }

    const focusableElementsArray = Array.from(focusableElements).filter(
      (el) => el.getAttribute("tabindex") !== null
    );

    const currentFocusIndex = focusableElementsArray.findIndex(
      (el) => el === document.activeElement
    );

    if (Events.isDownKey(ev)) {
      if (
        currentFocusIndex !== -1 &&
        currentFocusIndex < focusableElementsArray.length
      ) {
        focusableElementsArray[currentFocusIndex + 1]?.focus();
      } else {
        // it may be that an element within the row currently has focus
        const index = findParentIndexOfFocusedChild(focusableElementsArray);

        if (index !== -1 && index < focusableElementsArray.length) {
          focusableElementsArray[index + 1]?.focus();
        }
      }
    } else if (Events.isUpKey(ev)) {
      if (currentFocusIndex > 0) {
        focusableElementsArray[currentFocusIndex - 1]?.focus();
      } else {
        // it may be that an element within the row currently has focus
        const index = findParentIndexOfFocusedChild(focusableElementsArray);

        if (index > 0) {
          focusableElementsArray[index - 1]?.focus();
        }
      }
    }
  };

  useLayoutEffect(() => {
    const focusableElements = tableRef.current?.querySelectorAll(
      FOCUSABLE_ROW_AND_CELL_QUERY
    );

    // if no other menu item is selected, we need to make the first row a tab stop
    if (focusableElements && !selectedId) {
      const focusableArray = Array.from(focusableElements).filter(
        (el) => el.getAttribute("tabindex") !== null
      );
      setSelectedId(focusableArray[0]?.getAttribute("id") || "");
    }
  }, [selectedId]);

  return (
    <DrawerSidebarContext.Consumer>
      {({ isInSidebar }) => (
        <StyledFlatTableWrapper
          ref={wrapperRef}
          data-component="flat-table-wrapper"
          isInSidebar={isInSidebar}
          hasStickyHead={hasStickyHead}
          colorTheme={colorTheme}
          minHeight={minHeight}
          overflowY={
            !isInSidebar && (hasStickyHead || hasStickyFooter)
              ? "auto"
              : undefined
          }
          height={addDefaultHeight && !hasMaxHeight ? "99%" : height}
          maxHeight={hasMaxHeight ? "100%" : undefined}
          display="flex"
          flexDirection="column"
          justifyContent={
            hasStickyFooter || height ? "space-between" : undefined
          }
          tabIndex="0"
          role="region"
          overflowX={width ? "hidden" : undefined}
          width={width}
          hasStickyFooter={hasStickyFooter}
          hasVerticalScrollbar={hasVerticalScrollbar}
          hasHorizontalScrollbar={hasHorizontalScrollbar}
          hasFooter={!!footer}
          firstColRowSpanIndex={firstColRowSpanIndex}
          lastColRowSpanIndex={lastColRowSpanIndex}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          <StyledTableContainer overflowX={overflowX} width={width}>
            <StyledFlatTable
              ref={tableRef}
              data-component="flat-table"
              {...tableStylingProps}
            >
              {caption ? <caption>{caption}</caption> : null}
              <FlatTableThemeContext.Provider
                value={{ colorTheme, size, setSelectedId, selectedId }}
              >
                {children}
              </FlatTableThemeContext.Provider>
            </StyledFlatTable>
            {footer && (
              <StyledFlatTableFooter hasStickyFooter={hasStickyFooter}>
                {footer}
              </StyledFlatTableFooter>
            )}
          </StyledTableContainer>
        </StyledFlatTableWrapper>
      )}
    </DrawerSidebarContext.Consumer>
  );
};

FlatTable.propTypes = {
  ...marginPropTypes,
  /** The HTML id of the element that contains a description of this table. */
  ariaDescribedby: PropTypes.string,
  /** A string to render as the table's caption */
  caption: PropTypes.string,
  /** FlatTableHead and FlatTableBody */
  children: PropTypes.node.isRequired,
  /** If true, the header does not scroll with the content */
  hasStickyHead: PropTypes.bool,
  /** `FlatTable` color theme */
  colorTheme: PropTypes.oneOf([
    "light",
    "transparent-base",
    "transparent-white",
    "dark",
  ]),
  /** Content to be rendered at the foot of the table */
  footer: PropTypes.node,
  /** If true, the header does not scroll with the content */
  hasStickyFooter: PropTypes.bool,
  /** Set the height of the table. String can be any valid CSS string, numbers will be converted to pixels. */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Set the min-height of the table. A string can be any valid CSS string, numbers will be converted to pixels. */
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Toggles the zebra striping for the table rows */
  isZebra: PropTypes.bool,
  /** Used to define the tables size Renders as: 'compact', 'small', 'medium', 'large' and 'extraLarge' */
  size: PropTypes.oneOf(["compact", "small", "medium", "large", "extraLarge"]),
  /** Applies max-height of 100% to FlatTable if true */
  hasMaxHeight: PropTypes.bool,
  /** Set the overflow X of the table wrapper. Any valid CSS string */
  overflowX: PropTypes.string,
  /** Width of the table. Any valid CSS string */
  width: PropTypes.string,
};

FlatTable.defaultProps = {
  colorTheme: "dark",
  size: "medium",
};

export default FlatTable;

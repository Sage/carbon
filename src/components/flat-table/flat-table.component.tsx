import React, {
  useLayoutEffect,
  useRef,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { MarginProps } from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";

import {
  StyledFlatTableWrapper,
  StyledFlatTable,
  StyledFlatTableFooter,
  StyledTableContainer,
} from "./flat-table.style";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";
import Events from "../../__internal__/utils/helpers/events/events";
import { StrictFlatTableProvider } from "./__internal__/strict-flat-table.context";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import FlatTableContext from "./__internal__/flat-table.context";

export interface FlatTableProps extends MarginProps, TagProps {
  /** The HTML id of the element that contains a description of this table. */
  ariaDescribedby?: string;
  /** A string to render as the table's caption */
  caption?: string;
  /** FlatTableHead and FlatTableBody */
  children: React.ReactNode;
  /** `FlatTable` color theme */
  colorTheme?: "light" | "transparent-base" | "transparent-white" | "dark";
  /** Content to be rendered at the foot of the table */
  footer?: React.ReactNode;
  /** If true, the header does not scroll with the content */
  hasStickyFooter?: boolean;
  /** If true, the header does not scroll with the content */
  hasStickyHead?: boolean;
  /** Set the height of the table. String can be any valid CSS string, numbers will be converted to pixels. */
  height?: string | number;
  /** Set the min-height of the table. String can be any valid CSS string, numbers will be converted to pixels. */
  minHeight?: string | number;
  /** Toggles the zebra striping for the table rows */
  isZebra?: boolean;
  /** Used to define the tables size Renders as: 'compact', 'small', 'medium', 'large' and 'extraLarge' */
  size?: "compact" | "small" | "medium" | "large" | "extraLarge";
  /** Applies max-height of 100% to FlatTable if true */
  hasMaxHeight?: boolean;
  /** Toggles the visibility of the table's outer left and right borders. When false, the left border of the first column and the right border of the last column are hidden.  */
  hasOuterVerticalBorders?: boolean;
  /** Sets the border radius of the first and last cells in the last row. */
  bottomBorderRadius?: Extract<
    keyof typeof DesignTokens,
    `borderRadius${number}`
  >;
  /** Set the overflow X of the table wrapper. Any valid CSS string */
  overflowX?: string;
  /** Width of the table. Any valid CSS string */
  width?: string;
  /** The title to describe the table when one or more tables are used on a single page */
  title?: string;
}

const FOCUSABLE_ROW_AND_CELL_QUERY =
  "tbody tr[tabindex], tbody tr td[tabindex], tbody tr th[tabindex]";

const FlatTable = ({
  caption,
  children,
  hasStickyHead,
  colorTheme = "dark",
  footer,
  hasStickyFooter = false,
  height,
  isZebra,
  size = "medium",
  hasMaxHeight = false,
  hasOuterVerticalBorders = true,
  bottomBorderRadius = "borderRadius100",
  ariaDescribedby,
  minHeight,
  overflowX,
  width,
  title,
  ...rest
}: FlatTableProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [hasVerticalScrollbar, setHasVerticalScrollbar] = useState(false);
  const [hasHorizontalScrollbar, setHasHorizontalScrollbar] = useState(false);
  const [firstColRowSpanIndex, setFirstColRowSpanIndex] = useState(-1);
  const [lastColRowSpanIndex, setLastColRowSpanIndex] = useState(-1);
  const addDefaultHeight = !height && (hasStickyHead || hasStickyFooter);
  const tableStylingProps = {
    caption,
    isZebra,
    size,
    "aria-describedby": ariaDescribedby,
  };
  const { isInSidebar } = useContext(DrawerSidebarContext);
  const [hasOpenDatePicker, setHasOpenDatePicker] = useState(false);

  useLayoutEffect(() => {
    const findRow = (rows: HTMLElement[], isFirstCol?: boolean) =>
      rows.find((row, index) => {
        const cells = Array.from(row.querySelectorAll("td, th"));

        const cell = isFirstCol ? cells.shift() : cells.pop();
        const rowSpan = cell?.getAttribute("rowspan");

        return rowSpan && Number(rowSpan) >= index + 1;
      });

    /* istanbul ignore else */
    if (wrapperRef.current && tableRef.current) {
      const { offsetHeight, offsetWidth } = wrapperRef.current;
      const { top, bottom, right, left } =
        tableRef.current?.getBoundingClientRect();
      setHasVerticalScrollbar(bottom - top > offsetHeight);
      setHasHorizontalScrollbar(right - left > offsetWidth);

      const body = tableRef.current.querySelector("tbody");
      const bodyRows = body
        ? Array.from(body?.querySelectorAll("tr"))
        : /* istanbul ignore next */ [];
      const { length } = bodyRows;
      const targetRowFirstCol = findRow(
        bodyRows.slice(0, length - 1).reverse(),
        true,
      );
      const targetRowLastCol = findRow(bodyRows.slice(0, length - 1).reverse());

      if (targetRowFirstCol) {
        setFirstColRowSpanIndex(
          bodyRows.indexOf(targetRowFirstCol as HTMLTableRowElement),
        );
      }

      if (targetRowLastCol) {
        setLastColRowSpanIndex(
          bodyRows.indexOf(targetRowLastCol as HTMLTableRowElement),
        );
      }
    }
  }, [footer, height, minHeight]);

  const findParentIndexOfFocusedChild = (array: Element[]) =>
    array.findIndex((el) => {
      const focusableRowElements = el.querySelectorAll(
        "button, input, a, [tabindex]",
      );

      /* istanbul ignore else */
      if (focusableRowElements) {
        const focusableRowElementsArray = Array.from(focusableRowElements);

        if (
          focusableRowElementsArray.find(
            (el2) => el2 === document.activeElement,
          )
        ) {
          return true;
        }
      }

      return false;
    });

  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      const focusableElements = tableRef.current?.querySelectorAll(
        FOCUSABLE_ROW_AND_CELL_QUERY,
      );

      const focusableElementsArray = Array.from(
        focusableElements || /* istanbul ignore next */ [],
      );

      /* istanbul ignore if */
      if (!focusableElementsArray.length) {
        return;
      }

      const currentFocusIndex = focusableElementsArray.findIndex(
        (el) => el === document.activeElement,
      );

      if (hasOpenDatePicker && (hasStickyHead || hasStickyFooter)) {
        if (
          Events.isPageUpKey(ev) ||
          Events.isPageDownKey(ev) ||
          Events.isHomeKey(ev) ||
          Events.isEndKey(ev)
        ) {
          ev.preventDefault();
        }
        return;
      }

      if (Events.isDownKey(ev)) {
        ev.preventDefault();
        if (
          currentFocusIndex !== -1 &&
          currentFocusIndex < focusableElementsArray.length
        ) {
          (
            focusableElementsArray[currentFocusIndex + 1] as HTMLElement
          )?.focus();
        } else {
          // it may be that an element within the row currently has focus
          const index = findParentIndexOfFocusedChild(focusableElementsArray);

          /* istanbul ignore else */
          if (index !== -1 && index < focusableElementsArray.length) {
            (focusableElementsArray[index + 1] as HTMLElement)?.focus();
          }
        }
      } else if (Events.isUpKey(ev)) {
        ev.preventDefault();
        if (currentFocusIndex > 0) {
          (
            focusableElementsArray[currentFocusIndex - 1] as HTMLElement
          )?.focus();
        } else {
          // it may be that an element within the row currently has focus
          const index = findParentIndexOfFocusedChild(focusableElementsArray);

          if (index > 0) {
            (focusableElementsArray[index - 1] as HTMLElement)?.focus();
          }
        }
      }
    },
    [hasOpenDatePicker, hasStickyFooter, hasStickyHead],
  );

  const getTabStopElementId = useCallback(() => {
    const focusableElements = Array.from(
      tableRef.current?.querySelectorAll(FOCUSABLE_ROW_AND_CELL_QUERY) ||
        /* istanbul ignore next */ [],
    );

    // if no other row is selected/ highlighted, we need to make the first row/ cell a tab stop
    const focusableElement =
      focusableElements.find(
        (el) =>
          el.getAttribute("data-selected") === "true" ||
          el.getAttribute("data-highlighted") === "true",
      ) || focusableElements[0];
    const currentlySelectedId = focusableElement?.getAttribute("id") || "";

    return currentlySelectedId;
  }, []);

  const strictFlatTableValue = useMemo(
    () => ({
      colorTheme,
      size,
      getTabStopElementId,
    }),
    [colorTheme, size, getTabStopElementId],
  );

  const flatTableValue = useMemo(
    () => ({
      isInFlatTable: true,
      setHasOpenDatePicker,
    }),
    [setHasOpenDatePicker],
  );

  return (
    <StyledFlatTableWrapper
      ref={wrapperRef}
      data-role="flat-table-wrapper"
      isInSidebar={isInSidebar}
      hasStickyHead={hasStickyHead}
      colorTheme={colorTheme}
      minHeight={minHeight}
      overflowY={hasStickyHead || hasStickyFooter ? "auto" : undefined}
      height={addDefaultHeight && !hasMaxHeight ? "99%" : height}
      maxHeight={hasMaxHeight ? "100%" : undefined}
      hasOuterVerticalBorders={hasOuterVerticalBorders}
      bottomBorderRadius={bottomBorderRadius}
      display="flex"
      flexDirection="column"
      justifyContent={hasStickyFooter || height ? "space-between" : undefined}
      role="region"
      overflowX={width ? "hidden" : undefined}
      width={width}
      hasStickyFooter={hasStickyFooter}
      hasVerticalScrollbar={hasVerticalScrollbar}
      hasHorizontalScrollbar={hasHorizontalScrollbar}
      footer={!!footer}
      firstColRowSpanIndex={firstColRowSpanIndex}
      lastColRowSpanIndex={lastColRowSpanIndex}
      onKeyDown={handleKeyDown}
      {...rest}
      data-component="flat-table-wrapper"
      title={title}
    >
      <StyledTableContainer
        ref={container}
        tabIndex={0}
        overflowX={overflowX}
        width={width}
        data-role="flat-table-container"
      >
        <StyledFlatTable
          ref={tableRef}
          data-component="flat-table"
          {...tableStylingProps}
        >
          {caption ? <caption>{caption}</caption> : null}
          <StrictFlatTableProvider value={strictFlatTableValue}>
            <FlatTableContext.Provider value={flatTableValue}>
              {children}
            </FlatTableContext.Provider>
          </StrictFlatTableProvider>
        </StyledFlatTable>
      </StyledTableContainer>
      {footer && (
        <StyledFlatTableFooter
          hasStickyFooter={hasStickyFooter}
          data-role="flat-table-footer"
        >
          {footer}
        </StyledFlatTableFooter>
      )}
    </StyledFlatTableWrapper>
  );
};

FlatTable.displayName = "FlatTable";

export default FlatTable;

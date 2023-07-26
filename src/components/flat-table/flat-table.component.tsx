import React, { useLayoutEffect, useRef, useState, useContext } from "react";
import { MarginProps } from "styled-system";

import {
  StyledFlatTableWrapper,
  StyledFlatTable,
  StyledFlatTableFooter,
  StyledTableContainer,
} from "./flat-table.style";
import { DrawerSidebarContext } from "../drawer";
import Events from "../../__internal__/utils/helpers/events/events";

export interface FlatTableProps extends MarginProps {
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
  /** Set the overflow X of the table wrapper. Any valid CSS string */
  overflowX?: string;
  /** Width of the table. Any valid CSS string */
  width?: string;
}

export interface FlatTableThemeContextProps
  extends Pick<FlatTableProps, "colorTheme" | "size"> {
  selectedId?: string;
  setSelectedId: (id: string) => void;
}

export const FlatTableThemeContext = React.createContext<FlatTableThemeContextProps>(
  { setSelectedId: () => {} }
);

const FOCUSABLE_ROW_AND_CELL_QUERY = "tbody tr, tbody tr td, tbody tr th";

export const FlatTable = ({
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
  ariaDescribedby,
  minHeight,
  overflowX,
  width,
  ...rest
}: FlatTableProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
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
    "aria-describedby": ariaDescribedby,
  };
  const { isInSidebar } = useContext(DrawerSidebarContext);

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
        setFirstColRowSpanIndex(
          bodyRows.indexOf(targetRowFirstCol as HTMLTableRowElement)
        );
      }

      if (targetRowLastCol) {
        setLastColRowSpanIndex(
          bodyRows.indexOf(targetRowLastCol as HTMLTableRowElement)
        );
      }
    }
  }, [footer, children, height, minHeight]);

  const findParentIndexOfFocusedChild = (array: Element[]) =>
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

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
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
      ev.preventDefault();
      if (
        currentFocusIndex !== -1 &&
        currentFocusIndex < focusableElementsArray.length
      ) {
        (focusableElementsArray[currentFocusIndex + 1] as HTMLElement)?.focus();
      } else {
        // it may be that an element within the row currently has focus
        const index = findParentIndexOfFocusedChild(focusableElementsArray);

        if (index !== -1 && index < focusableElementsArray.length) {
          (focusableElementsArray[index + 1] as HTMLElement)?.focus();
        }
      }
    } else if (Events.isUpKey(ev)) {
      ev.preventDefault();
      if (currentFocusIndex > 0) {
        (focusableElementsArray[currentFocusIndex - 1] as HTMLElement)?.focus();
      } else {
        // it may be that an element within the row currently has focus
        const index = findParentIndexOfFocusedChild(focusableElementsArray);

        if (index > 0) {
          (focusableElementsArray[index - 1] as HTMLElement)?.focus();
        }
      }
    }
  };

  useLayoutEffect(() => {
    const findSelectedId = () => {
      const focusableElements = tableRef.current?.querySelectorAll(
        FOCUSABLE_ROW_AND_CELL_QUERY
      );

      // if no other menu item is selected, we need to make the first row a tab stop
      if (focusableElements && !selectedId) {
        const selected = Array.from(focusableElements).find(
          (el) => el.getAttribute("tabindex") !== null
        );

        const currentlySelectedId = selected?.getAttribute("id");

        if (currentlySelectedId && selectedId !== currentlySelectedId) {
          setSelectedId(currentlySelectedId);
        }
      }
    };

    const observer = new MutationObserver(findSelectedId);

    /* istanbul ignore else */
    if (wrapperRef.current) {
      observer.observe(wrapperRef.current as Node, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true,
      });
    }
    return () => observer.disconnect();
  }, [selectedId]);

  return (
    <StyledFlatTableWrapper
      ref={wrapperRef}
      data-component="flat-table-wrapper"
      isInSidebar={isInSidebar}
      hasStickyHead={hasStickyHead}
      colorTheme={colorTheme}
      minHeight={minHeight}
      overflowY={
        !isInSidebar && (hasStickyHead || hasStickyFooter) ? "auto" : undefined
      }
      height={addDefaultHeight && !hasMaxHeight ? "99%" : height}
      maxHeight={hasMaxHeight ? "100%" : undefined}
      display="flex"
      flexDirection="column"
      justifyContent={hasStickyFooter || height ? "space-between" : undefined}
      tabIndex={0}
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
    >
      <StyledTableContainer overflowX={overflowX} width={width}>
        <StyledFlatTable
          ref={tableRef}
          data-component="flat-table"
          {...tableStylingProps}
        >
          {caption ? <caption>{caption}</caption> : null}
          <FlatTableThemeContext.Provider
            value={{
              colorTheme,
              size,
              setSelectedId,
              selectedId,
            }}
          >
            {children}
          </FlatTableThemeContext.Provider>
        </StyledFlatTable>
      </StyledTableContainer>
      {footer && (
        <StyledFlatTableFooter hasStickyFooter={hasStickyFooter}>
          {footer}
        </StyledFlatTableFooter>
      )}
    </StyledFlatTableWrapper>
  );
};

FlatTable.displayName = "FlatTable";

export default FlatTable;

import React, {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import { TableContext, TableContextProps } from "./__internal__/contexts";
import {
  StyledTableWrapper,
  StyledTable,
  StyledInnerWrapper,
} from "./table.style";

export type BorderThickness = "none" | "small" | "medium" | "large";

export interface TableProps
  extends Pick<
    React.TableHTMLAttributes<HTMLTableElement>,
    "align" | "summary"
  > {
  /**
   * The content of the table.
   */
  children: React.ReactNode;
  /**
   * Indicates whether the table is draggable.
   */
  isDraggable?: boolean;
  /**
   * The maximum width of the table.
   * This will set an overflow-x on the table wrapper.
   */
  maxWidth?: string;
  /**
   * The pagination component for the table.
   */
  pagination?: ReactNode;
  /**
   * Indicates which column(s) should remain sticky when scrolling.
   */
  stickyColumn?: "first" | "last" | "both";
  /**
   * Indicates which row(s) should remain sticky when scrolling.
   */
  stickyRow?: "header" | "footer" | "both";
  /**
   * The variant of the table.
   */
  variant?: TableContextProps["variant"];
  /**
   * The size of the table.
   */
  size?: TableContextProps["size"];
  /**
   * Indicates whether the table should have zebra striping.
   */
  isZebraStriped?: boolean;
  /**
   * The outer borders of the table.
   */
  outerBorders?: "none" | "small";
  /**
   * The thickness of the horizontal borders within the table.
   */
  horizontalBorderThickness?: BorderThickness;
  /**
   * The thickness of the vertical borders within the table.
   */
  verticalBorderThickness?: BorderThickness;
}

const useIsomorphicEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Table = ({
  children,
  align,
  maxWidth,
  isDraggable = false,
  pagination,
  stickyColumn,
  stickyRow,
  variant = "prominent",
  size = "medium",
  isZebraStriped = false,
  outerBorders = "small",
  horizontalBorderThickness = "small",
  verticalBorderThickness = "small",
  ...props
}: TableProps) => {
  const hasStickyFirstColumn =
    stickyColumn === "first" || stickyColumn === "both";
  const hasStickyLastColumn =
    stickyColumn === "last" || stickyColumn === "both";
  const hasStickyHeader = stickyRow === "header" || stickyRow === "both";
  const hasStickyFooter = stickyRow === "footer" || stickyRow === "both";
  const showOuterBorder = variant === "prominent" || outerBorders !== "none";
  const hasPagination = !!pagination;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const checkIsScrollable = useCallback(() => {
    const element = scrollContainerRef.current;

    if (!element) return;

    setIsScrollable(
      element.scrollWidth - element.clientWidth > 1 ||
        element.scrollHeight - element.clientHeight > 1,
    );
  }, []);

  useIsomorphicEffect(() => {
    const container = scrollContainerRef.current;
    const table = tableRef.current;

    if (!container || !maxWidth) {
      setIsScrollable(false);
      return;
    }

    const observer = new ResizeObserver(checkIsScrollable);

    observer.observe(container);

    if (table) {
      observer.observe(table);
    }

    checkIsScrollable();

    return () => observer.disconnect();
  }, [checkIsScrollable, maxWidth]);

  return (
    <TableContext.Provider value={{ isDraggable, variant, size }}>
      <StyledTableWrapper
        $maxWidth={maxWidth}
        data-component="table-wrapper"
        data-role="table-wrapper"
      >
        <StyledInnerWrapper
          $variant={variant}
          $maxWidth={maxWidth}
          $hasPagination={hasPagination}
          $showOuterBorder={showOuterBorder}
          data-component="table-inner-wrapper"
          data-role="table-inner-wrapper"
        >
          <div
            data-element="table-scroll-container"
            ref={scrollContainerRef}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={isScrollable ? 0 : undefined}
          >
            <StyledTable
              data-role="table"
              {...props}
              $align={align}
              data-component="table"
              data-has-first-column={hasStickyFirstColumn}
              data-has-last-column={hasStickyLastColumn}
              data-has-sticky-header={hasStickyHeader}
              data-has-sticky-footer={hasStickyFooter}
              $isZebraStriped={isZebraStriped}
              $hasOverflow={!!maxWidth}
              $variant={variant}
              $horizontalBorderThickness={horizontalBorderThickness}
              $verticalBorderThickness={verticalBorderThickness}
            >
              {children}
            </StyledTable>
          </div>
        </StyledInnerWrapper>
        {pagination}
      </StyledTableWrapper>
    </TableContext.Provider>
  );
};

export default Table;

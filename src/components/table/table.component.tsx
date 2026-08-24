import React, {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { TableContext, TableContextProps } from "./__internal__/contexts";
import {
  StyledTableWrapper,
  StyledTable,
  StyledInnerWrapper,
} from "./table.style";

export type BorderThickness = "none" | "small" | "medium" | "large";

export interface TableProps
  extends Pick<React.TableHTMLAttributes<HTMLTableElement>, "summary"> {
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

    /* istanbul ignore if */
    if (!element) return;

    setIsScrollable(
      element.scrollWidth - element.clientWidth > 1 ||
        element.scrollHeight - element.clientHeight > 1,
    );
  }, []);

  const handleBodyFocusCapture = useCallback(
    (event: React.FocusEvent<HTMLTableElement>) => {
      const { target } = event;

      if (
        (!hasStickyHeader && !hasStickyFooter) ||
        !(target instanceof Element) ||
        !target.closest("tbody")
      ) {
        return;
      }

      const table = event.currentTarget;
      const targetBounds = target.getBoundingClientRect();
      const headerBounds = hasStickyHeader
        ? table.tHead?.getBoundingClientRect()
        : undefined;
      const footerBounds = hasStickyFooter
        ? table.tFoot?.getBoundingClientRect()
        : undefined;

      if (headerBounds && targetBounds.top < headerBounds.bottom) {
        target.scrollIntoView({ block: "start", inline: "nearest" });
      } else if (footerBounds && targetBounds.bottom > footerBounds.top) {
        target.scrollIntoView({ block: "end", inline: "nearest" });
      }
    },
    [hasStickyFooter, hasStickyHeader],
  );

  useIsomorphicEffect(() => {
    const container = scrollContainerRef.current;
    const table = tableRef.current;

    if (!container || !maxWidth) {
      setIsScrollable(false);
      return;
    }

    const observer = new ResizeObserver(checkIsScrollable);

    observer.observe(container);

    /* istanbul ignore else */
    if (table) {
      observer.observe(table);
    }

    checkIsScrollable();

    return () => observer.disconnect();
  }, [checkIsScrollable, maxWidth]);

  useIsomorphicEffect(() => {
    const table = tableRef.current;

    /* istanbul ignore if */
    if (!table) return;

    const header = hasStickyHeader ? table.tHead : null;
    const footer = hasStickyFooter ? table.tFoot : null;

    const updateStickyRowHeights = () => {
      table.style.setProperty(
        "--table-sticky-header-height",
        `${header?.offsetHeight ?? 0}px`,
      );
      table.style.setProperty(
        "--table-sticky-footer-height",
        `${footer?.offsetHeight ?? 0}px`,
      );
    };

    if (!header && !footer) {
      updateStickyRowHeights();
      return;
    }

    const observer = new ResizeObserver(updateStickyRowHeights);

    if (header) observer.observe(header);
    if (footer) observer.observe(footer);

    updateStickyRowHeights();

    return () => observer.disconnect();
  }, [hasStickyFooter, hasStickyHeader]);

  const contextValues = useMemo(
    () => ({
      isDraggable,
      variant,
      size,
    }),
    [isDraggable, variant, size],
  );

  return (
    <TableContext.Provider value={contextValues}>
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
              ref={tableRef}
              data-role="table"
              {...props}
              onFocusCapture={handleBodyFocusCapture}
              data-component="table"
              data-has-first-column={hasStickyFirstColumn}
              data-has-last-column={hasStickyLastColumn}
              data-has-sticky-header={hasStickyHeader}
              data-has-sticky-footer={hasStickyFooter}
              data-size={size}
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

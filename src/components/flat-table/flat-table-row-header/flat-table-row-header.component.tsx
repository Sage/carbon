import React, { useCallback, useRef } from "react";
import { PaddingProps } from "styled-system";
import { TableBorderSize, TableCellAlign } from "..";

import Icon from "../../icon";
import {
  StyledFlatTableRowHeader,
  StyledFlatTableRowHeaderContent,
} from "./flat-table-row-header.style";
import guid from "../../../__internal__/utils/helpers/guid";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import useTableCell from "../__internal__/use-table-cell";

export interface FlatTableRowHeaderProps extends PaddingProps, TagProps {
  /** Content alignment */
  align?: TableCellAlign;
  /** RowHeader content */
  children?: React.ReactNode;
  /** Column width, pass a number to set a fixed width in pixels */
  width?: number;
  /** Truncate cell content and add ellipsis to any text that overflows */
  truncate?: boolean;
  /** Title text to display if cell content truncates */
  title?: string;
  /** Sets a custom vertical right border */
  verticalBorder?: TableBorderSize;
  /** Sets the color of the right border */
  verticalBorderColor?: string;
  /** Defines whether the column should be sticky on the left or right hand side of the Table */
  stickyAlignment?: "left" | "right";
  /** Number of columns that a header cell should span */
  colspan?: number | string;
  /** Number of rows that a header cell should span */
  rowspan?: number | string;
  /** Sets an id string on the element */
  id?: string;
}

const FlatTableRowHeader = ({
  align = "left",
  children,
  width,
  py,
  px,
  truncate,
  title,
  stickyAlignment = "left",
  colspan,
  rowspan,
  id,
  ...rest
}: FlatTableRowHeaderProps) => {
  const internalId = useRef(id || guid());

  const {
    leftPosition,
    rightPosition,
    expandable,
    onClick,
    onKeyDown,
    isFirstCell,
    isExpandableCell,
    tabIndex,
    isInHighlightedRow,
    isInSelectedRow,
    bringToFront,
  } = useTableCell(internalId.current);

  const handleOnClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      if (isExpandableCell && onClick) onClick(ev);
    },
    [isExpandableCell, onClick],
  );

  const handleOnFocus = (ev: React.FocusEvent<HTMLElement>) => {
    bringToFront(ev, "TH");
  };

  const handleOnKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      /* istanbul ignore else */
      if (isExpandableCell && onKeyDown) {
        onKeyDown(ev);
      }
    },
    [isExpandableCell, onKeyDown],
  );

  return (
    <StyledFlatTableRowHeader
      leftPosition={stickyAlignment === "left" ? leftPosition || 0 : undefined}
      rightPosition={
        stickyAlignment === "right" ? rightPosition || 0 : undefined
      }
      align={align}
      width={width}
      py={py || "10px"}
      px={px || 3}
      onClick={handleOnClick}
      tabIndex={isExpandableCell ? tabIndex : undefined}
      onKeyDown={handleOnKeyDown}
      truncate={truncate}
      expandable={expandable}
      stickyAlignment={stickyAlignment}
      {...(colspan !== undefined && { colSpan: Number(colspan) })}
      {...(rowspan !== undefined && { rowSpan: Number(rowspan) })}
      data-selected={isInSelectedRow && isExpandableCell}
      data-highlighted={isInHighlightedRow && isExpandableCell}
      onFocus={handleOnFocus}
      {...rest}
      {...tagComponent("flat-table-row-header", {
        "data-element": "flat-table-row-header",
        ...rest,
      })}
      id={internalId.current}
    >
      <StyledFlatTableRowHeaderContent
        title={
          truncate && !title && typeof children === "string" ? children : title
        }
        expandable={expandable}
        data-role="flat-table-row-header-content"
      >
        {expandable && isFirstCell && (
          <Icon type="chevron_down_thick" mr="8px" />
        )}
        {children}
      </StyledFlatTableRowHeaderContent>
    </StyledFlatTableRowHeader>
  );
};

FlatTableRowHeader.displayName = "FlatTableRowHeader";

export default FlatTableRowHeader;

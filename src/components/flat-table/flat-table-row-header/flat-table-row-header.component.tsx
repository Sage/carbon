import React, {
  useCallback,
  // useLayoutEffect,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { PaddingProps } from "styled-system";
import { TableBorderSize, TableCellAlign } from "..";

import Icon from "../../icon";
import {
  StyledFlatTableRowHeader,
  StyledFlatTableRowHeaderContent,
} from "./flat-table-row-header.style";
import { FlatTableThemeContext } from "../flat-table.component";
import guid from "../../../__internal__/utils/helpers/guid";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import useCalculateStickyCells from "../__internal__/use-calculate-sticky-cells";

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

export const FlatTableRowHeader = ({
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
  const [tabIndex, setTabIndex] = useState(-1);
  const { selectedId } = useContext(FlatTableThemeContext);

  const {
    leftPosition,
    rightPosition,
    expandable,
    onClick,
    onKeyDown,
    isFirstCell,
    isExpandableCell,
  } = useCalculateStickyCells(internalId.current);

  useEffect(() => {
    setTabIndex(isExpandableCell && selectedId === internalId.current ? 0 : -1);
  }, [selectedId, isExpandableCell]);

  const handleOnClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      if (isExpandableCell && onClick) onClick(ev);
    },
    [isExpandableCell, onClick]
  );

  const handleOnKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      if (isExpandableCell && onKeyDown) {
        onKeyDown(ev);
      }
    },
    [isExpandableCell, onKeyDown]
  );

  return (
    <StyledFlatTableRowHeader
      leftPosition={stickyAlignment === "left" ? leftPosition || 0 : undefined}
      rightPosition={
        stickyAlignment === "right" ? rightPosition || 0 : undefined
      }
      align={align}
      {...tagComponent("flat-table-row-header", {
        "data-element": "flat-table-row-header",
        ...rest,
      })}
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
      {...rest}
      id={internalId.current}
    >
      <StyledFlatTableRowHeaderContent
        title={
          truncate && !title && typeof children === "string" ? children : title
        }
        expandable={expandable}
      >
        {expandable && isFirstCell && (
          <Icon type="chevron_down_thick" bgSize="extra-small" mr="8px" />
        )}
        {children}
      </StyledFlatTableRowHeaderContent>
    </StyledFlatTableRowHeader>
  );
};

FlatTableRowHeader.displayName = "FlatTableRowHeader";

export default FlatTableRowHeader;

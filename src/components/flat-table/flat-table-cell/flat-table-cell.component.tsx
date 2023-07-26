import React, { useRef, useState, useEffect, useContext } from "react";
import { PaddingProps } from "styled-system";
import { TableBorderSize, TableCellAlign } from "..";

import {
  StyledFlatTableCell,
  StyledCellContent,
} from "./flat-table-cell.style";
import Icon from "../../icon";
import { FlatTableThemeContext } from "../flat-table.component";
import guid from "../../../__internal__/utils/helpers/guid";
import FlatTableRowContext from "../flat-table-row/__internal__/flat-table-row-context";

export interface FlatTableCellProps extends PaddingProps {
  /** Content alignment */
  align?: TableCellAlign;
  /** Cell content */
  children?: React.ReactNode;
  /** Number of columns that a cell should span */
  colspan?: number | string;
  /** Number of rows that a cell should span */
  rowspan?: number | string;
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
  /** Sets an id string on the element */
  id?: string;
}

export const FlatTableCell = ({
  align = "left",
  children,
  pl,
  width,
  truncate = false,
  title,
  colspan,
  rowspan,
  id,
  ...rest
}: FlatTableCellProps) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const internalId = useRef(id || guid());
  const [tabIndex, setTabIndex] = useState(-1);
  const { selectedId } = useContext(FlatTableThemeContext);
  const {
    expandable,
    firstCellId,
    firstColumnExpandable,
    leftPositions,
    rightPositions,
    onClick,
    onKeyDown,
  } = useContext(FlatTableRowContext);

  const leftPosition = leftPositions[internalId.current];
  const rightPosition = rightPositions[internalId.current];
  const makeCellSticky =
    leftPosition !== undefined || rightPosition !== undefined;
  const isFirstCell = internalId.current === firstCellId;
  const isExpandableCell = expandable && isFirstCell && firstColumnExpandable;

  useEffect(() => {
    setTabIndex(selectedId === internalId.current ? 0 : -1);
  }, [selectedId]);

  return (
    <StyledFlatTableCell
      leftPosition={leftPosition}
      rightPosition={rightPosition}
      makeCellSticky={makeCellSticky}
      className={makeCellSticky ? "isSticky" : undefined}
      ref={ref}
      align={align}
      data-element="flat-table-cell"
      pl={pl}
      onClick={isExpandableCell ? onClick : undefined}
      tabIndex={isExpandableCell ? tabIndex : undefined}
      onKeyDown={isExpandableCell ? onKeyDown : undefined}
      colWidth={width}
      isTruncated={truncate}
      expandable={expandable}
      {...(colspan !== undefined && { colSpan: Number(colspan) })}
      {...(rowspan !== undefined && { rowSpan: Number(rowspan) })}
      {...rest}
      id={internalId.current}
    >
      <StyledCellContent
        title={
          truncate && !title && typeof children === "string" ? children : title
        }
        expandable={expandable}
      >
        {expandable && isFirstCell && (
          <Icon type="chevron_down_thick" bgSize="extra-small" mr="8px" />
        )}
        {children}
      </StyledCellContent>
    </StyledFlatTableCell>
  );
};

FlatTableCell.displayName = "FlatTableCell";

export default FlatTableCell;

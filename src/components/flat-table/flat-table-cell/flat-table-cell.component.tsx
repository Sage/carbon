import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import { PaddingProps } from "styled-system";
import { TableBorderSize, TableCellAlign } from "..";

import {
  StyledFlatTableCell,
  StyledCellContent,
} from "./flat-table-cell.style";
import Icon from "../../icon";
import { FlatTableThemeContext } from "../flat-table.component";
import guid from "../../../__internal__/utils/helpers/guid";

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
  /** Sets an id string on the DOM element */
  id?: string;
  /**
   * @private
   * @ignore
   */
  expandable?: boolean;
  /**
   * @private
   * @ignore
   */
  onClick?: () => void;
  /**
   * @private
   * @ignore
   */
  onKeyDown?: () => void;
  /**
   * @private
   * @ignore
   * Sets the left position when sticky column found
   */
  leftPosition?: number;
  /**
   * @private
   * @ignore
   * Sets the right position when sticky column found
   */
  rightPosition?: number;
  /**
   * @private
   * @ignore
   * Index of cell within row
   */
  cellIndex?: number;
  /**
   * @private
   * @ignore
   * Callback to report the offsetWidth
   */
  reportCellWidth?: (offset: number, index?: number) => void;
}

export const FlatTableCell = ({
  align = "left",
  children,
  pl,
  expandable = false,
  onClick,
  onKeyDown,
  reportCellWidth,
  cellIndex,
  leftPosition,
  rightPosition,
  width,
  truncate = false,
  title,
  colspan,
  rowspan,
  ...rest
}: FlatTableCellProps) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const id = useRef(guid());
  const [tabIndex, setTabIndex] = useState(-1);
  const { selectedId } = useContext(FlatTableThemeContext);

  useLayoutEffect(() => {
    if (ref.current && reportCellWidth) {
      reportCellWidth(ref.current.offsetWidth, cellIndex);
    }
  }, [reportCellWidth, cellIndex]);

  useEffect(() => {
    setTabIndex(selectedId === id.current ? 0 : -1);
  }, [selectedId]);

  return (
    <StyledFlatTableCell
      leftPosition={leftPosition}
      rightPosition={rightPosition}
      makeCellSticky={!!reportCellWidth}
      className={reportCellWidth ? "isSticky" : undefined}
      ref={ref}
      align={align}
      data-element="flat-table-cell"
      pl={pl}
      onClick={expandable && onClick ? onClick : undefined}
      tabIndex={expandable && onClick ? tabIndex : undefined}
      onKeyDown={expandable && onKeyDown ? onKeyDown : undefined}
      colWidth={width}
      isTruncated={truncate}
      expandable={expandable}
      id={id.current}
      {...(colspan !== undefined && { colSpan: Number(colspan) })}
      {...(rowspan !== undefined && { rowSpan: Number(rowspan) })}
      {...rest}
    >
      <StyledCellContent
        title={
          truncate && !title && typeof children === "string" ? children : title
        }
        expandable={expandable}
      >
        {expandable && (
          <Icon type="chevron_down_thick" bgSize="extra-small" mr="8px" />
        )}
        {children}
      </StyledCellContent>
    </StyledFlatTableCell>
  );
};

FlatTableCell.displayName = "FlatTableCell";

export default FlatTableCell;

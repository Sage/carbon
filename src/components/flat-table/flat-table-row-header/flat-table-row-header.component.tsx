import React, {
  useCallback,
  useEffect,
  useContext,
  useState,
  useRef,
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

export interface FlatTableRowHeaderProps extends PaddingProps {
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
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /**
   * @private
   * @ignore
   */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLElement>) => void;
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

export const FlatTableRowHeader = ({
  align = "left",
  children,
  width,
  py,
  px,
  expandable = false,
  onClick,
  onKeyDown,
  leftPosition,
  rightPosition,
  truncate,
  title,
  stickyAlignment = "left",
  colspan,
  rowspan,
  ...rest
}: FlatTableRowHeaderProps) => {
  const id = useRef(guid());
  const [tabIndex, setTabIndex] = useState(-1);
  const { selectedId } = useContext(FlatTableThemeContext);

  const handleOnClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      if (expandable && onClick) onClick(ev);
    },
    [expandable, onClick]
  );
  const handleOnKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      if (expandable && onKeyDown) onKeyDown(ev);
    },
    [expandable, onKeyDown]
  );

  useEffect(() => {
    setTabIndex(selectedId === id.current ? 0 : -1);
  }, [selectedId]);

  return (
    <StyledFlatTableRowHeader
      leftPosition={stickyAlignment === "left" ? leftPosition || 0 : undefined}
      rightPosition={
        stickyAlignment === "right" ? rightPosition || 0 : undefined
      }
      align={align}
      data-element="flat-table-row-header"
      width={width}
      py={py || "10px"}
      px={px || 3}
      onClick={handleOnClick}
      tabIndex={expandable && onClick ? tabIndex : undefined}
      onKeyDown={handleOnKeyDown}
      truncate={truncate}
      expandable={expandable}
      stickyAlignment={stickyAlignment}
      id={id.current}
      {...(colspan !== undefined && { colSpan: Number(colspan) })}
      {...(rowspan !== undefined && { rowSpan: Number(rowspan) })}
      {...rest}
    >
      <StyledFlatTableRowHeaderContent
        title={
          truncate && !title && typeof children === "string" ? children : title
        }
        expandable={expandable}
      >
        {expandable && (
          <Icon type="chevron_down_thick" bgSize="extra-small" mr="8px" />
        )}
        {children}
      </StyledFlatTableRowHeaderContent>
    </StyledFlatTableRowHeader>
  );
};

FlatTableRowHeader.displayName = "FlatTableRowHeader";

export default FlatTableRowHeader;

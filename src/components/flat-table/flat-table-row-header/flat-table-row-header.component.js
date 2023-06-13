import React, {
  useCallback,
  useEffect,
  useContext,
  useState,
  useRef,
} from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import Icon from "../../icon";
import {
  StyledFlatTableRowHeader,
  StyledFlatTableRowHeaderContent,
} from "./flat-table-row-header.style";
import { FlatTableThemeContext } from "../flat-table.component";
import guid from "../../../__internal__/utils/helpers/guid";

const paddingPropTypes = filterStyledSystemPaddingProps(
  styledSystemPropTypes.space
);

const FlatTableRowHeader = ({
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
  ...rest
}) => {
  const id = useRef(guid());
  const [tabIndex, setTabIndex] = useState(-1);
  const { selectedId } = useContext(FlatTableThemeContext);

  const handleOnClick = useCallback(
    (ev) => {
      if (expandable && onClick) onClick(ev);
    },
    [expandable, onClick]
  );
  const handleOnKeyDown = useCallback(
    (ev) => {
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
      colWidth={width}
      py={py || "10px"}
      px={px || 3}
      onClick={handleOnClick}
      tabIndex={expandable && onClick ? tabIndex : undefined}
      onKeyDown={handleOnKeyDown}
      isTruncated={truncate}
      expandable={expandable}
      stickyAlignment={stickyAlignment}
      id={id.current}
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

FlatTableRowHeader.propTypes = {
  /** Styled system padding props */
  ...paddingPropTypes,
  /** Content alignment */
  align: PropTypes.oneOf(["center", "left", "right"]),
  /** RowHeader content */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Column width, pass a number to set a fixed width in pixels */
  width: PropTypes.number,
  /** Truncate cell content and add ellipsis to any text that overflows */
  truncate: PropTypes.bool,
  /** Title text to display if cell content truncates */
  title: PropTypes.string,
  /**
   * @private
   * @ignore
   */
  expandable: PropTypes.bool,
  /**
   * @private
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @private
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /** Sets a custom vertical right border */
  verticalBorder: PropTypes.oneOf(["small", "medium", "large"]),
  /** Sets a vertical right border color, provide design token, any color from palette or any valid css color value. */
  verticalBorderColor: PropTypes.string,
  /** Defines whether the column should be sticky on the left or right hand side of the Table */
  stickyAlignment: PropTypes.oneOf(["left", "right"]),
  /**
   * @private
   * @ignore
   */
  leftPosition: PropTypes.number,
  /**
   * @private
   * @ignore
   */
  rightPosition: PropTypes.number,
};

FlatTableRowHeader.displayName = "FlatTableRowHeader";

export default FlatTableRowHeader;

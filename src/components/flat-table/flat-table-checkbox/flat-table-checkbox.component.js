import React, { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import StyledFlatTableCheckbox from "./flat-table-checkbox.style";
import { Checkbox } from "../../checkbox";

const FlatTableCheckbox = ({
  as = "td",
  checked,
  onChange,
  selectable = true,
  onClick,
  leftPosition,
  cellIndex,
  reportCellWidth,
  ariaLabelledBy,
  ...rest
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current && reportCellWidth) {
      reportCellWidth(ref.current.offsetWidth, cellIndex);
    }
  }, [reportCellWidth, cellIndex]);

  const dataElement = `flat-table-checkbox-${as === "td" ? "cell" : "header"}`;

  const handleClick = (event) => {
    event.stopPropagation();
    if (onClick) onClick(event);
  };

  const handleKeyDown = (event) => {
    event.stopPropagation();
  };

  return (
    <StyledFlatTableCheckbox
      ref={ref}
      makeCellSticky={!!reportCellWidth}
      className={reportCellWidth ? "isSticky" : undefined}
      leftPosition={leftPosition || 0}
      data-element={dataElement}
      as={as}
      {...rest}
    >
      {selectable && (
        <Checkbox
          checked={checked}
          onChange={onChange}
          name="flat-table-checkbox"
          mb={0}
          ariaLabelledBy={ariaLabelledBy}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        />
      )}
    </StyledFlatTableCheckbox>
  );
};

FlatTableCheckbox.propTypes = {
  /** Prop to polymorphically render either a 'th' or 'td' element */
  as: PropTypes.oneOf(["td", "th"]),
  /** Prop to set checked prop on Checkbox */
  checked: PropTypes.bool,
  /** Callback to be called onChange in Checkbox */
  onChange: PropTypes.func,
  /** Callback function to be called when click event received */
  onClick: PropTypes.func,
  /** Whether to render the checkbox or not, defaults to true */
  selectable: PropTypes.bool,
  /** The id of the element that labels the input */
  ariaLabelledBy: PropTypes.string,
  /**
   * @private
   * @ignore
   * Sets the left position when sticky column found
   */
  leftPosition: PropTypes.number,
  /**
   * @private
   * @ignore
   * Index of cell within row
   */
  cellIndex: PropTypes.number,
  /**
   * @private
   * @ignore
   * Callback to report the offsetWidth
   */
  reportCellWidth: PropTypes.func,
};

FlatTableCheckbox.displayName = "FlatTableCheckbox";

export default FlatTableCheckbox;

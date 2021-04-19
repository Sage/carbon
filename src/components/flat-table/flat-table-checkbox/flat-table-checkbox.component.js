import React, { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import StyledFlatTableCheckbox from "./flat-table-checkbox.style";
import { Checkbox } from "../../../__experimental__/components/checkbox";

const FlatTableCheckbox = ({
  as = "td",
  checked,
  onChange,
  selectable = true,
  leftPosition,
  cellIndex,
  reportCellWidth,
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current && reportCellWidth) {
      reportCellWidth(ref.current.offsetWidth, cellIndex);
    }
  }, [reportCellWidth, cellIndex]);

  const dataElement = `flat-table-checkbox-${as === "td" ? "cell" : "header"}`;

  return (
    <StyledFlatTableCheckbox
      ref={ref}
      makeCellSticky={!!reportCellWidth}
      leftPosition={leftPosition || 0}
      data-element={dataElement}
      as={as}
    >
      {selectable && (
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          checked={checked}
          onChange={onChange}
          name="flat-table-checkbox"
          mb={0}
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
  /** Whether to render the checkbox or not, defaults to true */
  selectable: PropTypes.bool,
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

export default FlatTableCheckbox;

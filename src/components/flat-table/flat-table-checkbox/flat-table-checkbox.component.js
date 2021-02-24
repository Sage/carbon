import React from "react";
import PropTypes from "prop-types";
import StyledFlatTableCheckbox from "./flat-table-checkbox.style";
import { Checkbox } from "../../../__experimental__/components/checkbox";

const FlatTableCheckbox = ({
  as = "td",
  checked,
  onChange,
  selectable = true,
}) => {
  const dataElement = `flat-table-checkbox-${as === "td" ? "cell" : "header"}`;

  return (
    <StyledFlatTableCheckbox data-element={dataElement} as={as}>
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
};

export default FlatTableCheckbox;

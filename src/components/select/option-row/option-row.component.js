import React, { useContext } from "react";
import PropTypes from "prop-types";
import StyledOptionRow from "./option-row.style";
import SelectListContext from "../__internal__/select-list-context";

const OptionRow = React.forwardRef(
  (
    { id, text, children, onSelect, value, index, hidden, style, ...rest },
    ref
  ) => {
    const handleClick = () => {
      onSelect({ id, text, value });
    };
    const selectListContext = useContext(SelectListContext);
    let isSelected = selectListContext.currentOptionsListIndex === index;

    if (selectListContext.multiselectValues) {
      isSelected = selectListContext.multiselectValues.includes(value);
    }

    return (
      <StyledOptionRow
        id={id}
        ref={ref}
        aria-selected={isSelected}
        data-component="option-row"
        onClick={handleClick}
        isHighlighted={selectListContext.currentOptionsListIndex === index}
        role="option"
        hidden={hidden}
        style={style}
        {...rest}
      >
        {children}
      </StyledOptionRow>
    );
  }
);

OptionRow.propTypes = {
  /** The option's visible text, displayed within Textbox of Select */
  text: PropTypes.string.isRequired,
  /** Row content, should consist of multiple `td` elements */
  children: PropTypes.node.isRequired,
  /** The option's invisible internal value */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  /**
   * @private
   * @ignore
   * Component id (prop added by the SelectList component)
   */
  id: PropTypes.string.isRequired,
  /**
   * @private
   * @ignore
   * Callback to return value when the element is selected (prop added by the SelectList component) */
  onSelect: PropTypes.func,
  /**
   * @private
   * @ignore
   * Position of the element in the list */
  index: PropTypes.number,
  /**
   * @private
   * @ignore
   * True when option should be hidden from the view (prop added by the SelectList component) */
  hidden: PropTypes.bool,
  /**
   * @private
   * @ignore
   * object containing CSS styles to be passed to the underlying DOM element */
  style: PropTypes.object,
};

export default OptionRow;

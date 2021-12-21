import React from "react";
import PropTypes from "prop-types";
import StyledOptionRow from "./option-row.style";

const OptionRow = React.forwardRef(
  ({ id, text, children, onSelect, value, isHighlighted, hidden }, ref) => {
    const handleClick = () => {
      onSelect({ id, text, value });
    };

    return (
      <StyledOptionRow
        id={id}
        ref={ref}
        aria-selected={isHighlighted}
        data-component="option-row"
        onClick={handleClick}
        isHighlighted={isHighlighted}
        role="option"
        hidden={hidden}
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
   * True if the option is highlighted (prop added by the SelectList component) */
  isHighlighted: PropTypes.bool,
  /**
   * @private
   * @ignore
   * True when option should be hidden from the view (prop added by the SelectList component) */
  hidden: PropTypes.bool,
};

export default OptionRow;

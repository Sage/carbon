import React, { useContext } from "react";
import PropTypes from "prop-types";
import StyledOption from "./option.style";
import SelectListContext from "../__internal__/select-list-context";

const Option = React.forwardRef(
  (
    {
      text,
      children,
      onSelect,
      value,
      id,
      index,
      hidden,
      onClick,
      style,
      ...rest
    },
    ref
  ) => {
    const selectListContext = useContext(SelectListContext);
    let isSelected = selectListContext.currentOptionsListIndex === index;

    if (selectListContext.multiselectValues) {
      isSelected = selectListContext.multiselectValues.includes(value);
    }

    function handleClick() {
      if (!onClick) {
        onSelect({ text, value, id });
      } else {
        onSelect();
        onClick({ target: { text, value, id } });
      }
    }

    return (
      <StyledOption
        id={id}
        ref={ref}
        aria-selected={isSelected}
        data-component="option"
        onClick={handleClick}
        isHighlighted={selectListContext.currentOptionsListIndex === index}
        role="option"
        hidden={hidden}
        style={style}
        {...rest}
      >
        {children || text}
      </StyledOption>
    );
  }
);

Option.propTypes = {
  /** The option's visible text, displayed within Textbox of Select, and used for filtering */
  text: PropTypes.string.isRequired,
  /** Optional: alternative rendered content, displayed within SelectList of Select (eg: an icon, an image, etc) */
  children: PropTypes.node,
  /** The option's invisible internal value */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  /**
   * @private
   * @ignore
   * Component id (prop added by the SelectList component)
   */
  id: PropTypes.string,
  /**
   * @private
   * @ignore
   * Callback to return value when the element is clicked (prop added by the SelectList component) */
  onClick: PropTypes.func,
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
  /** MultiSelect only - custom Pill border color - provide any color from palette or any valid css color value. */
  // eslint-disable-next-line react/no-unused-prop-types
  borderColor: PropTypes.string,
  /** MultiSelect only - fill Pill background with color */
  // eslint-disable-next-line react/no-unused-prop-types
  fill: PropTypes.bool,
  /**
   * @private
   * @ignore
   * object containing CSS styles to be passed to the underlying list-item */
  style: PropTypes.object,
};

export default Option;

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import { StyledPicklistItem, StyledButton } from "./duelling-picklist.style";
import Icon from "../icon";
import Events from "../../utils/helpers/events";

export const PicklistItem = React.forwardRef(
  (
    {
      children,
      type,
      disabled,
      onChange,
      item,
      index,
      handleKeyboardAccessibility,
      ...rest
    },
    ref
  ) => {
    const handleClick = useCallback(() => onChange(item), [onChange, item]);
    const handleKeydown = useCallback(
      (event) => {
        if (Events.isEnterKey(event) || Events.isSpaceKey(event)) {
          event.preventDefault();
          onChange(item);
        } else {
          handleKeyboardAccessibility(event, index);
        }
      },
      [onChange, item, handleKeyboardAccessibility, index]
    );

    const tabIndex = index === 0 && !disabled ? 0 : -1;

    return (
      <CSSTransition
        timeout={{
          appear: 500,
          enter: 300,
          exit: 0,
        }}
        classNames="picklist-item"
        {...rest}
        {...(type === "add" ? { enter: false } : {})}
      >
        <StyledPicklistItem
          onKeyDown={handleKeydown}
          tabIndex={tabIndex}
          ref={ref}
          data-element="picklist-item"
        >
          {children}
          <StyledButton tabIndex={-1} type={type} onClick={handleClick}>
            <Icon type={type} />
          </StyledButton>
        </StyledPicklistItem>
      </CSSTransition>
    );
  }
);

PicklistItem.propTypes = {
  /** Item content */
  children: PropTypes.node.isRequired,
  /** Define if item is of type add or remove */
  type: PropTypes.oneOf(["add", "remove"]).isRequired,
  /** Indicate if component is disabled */
  disabled: PropTypes.bool,
  /** Handler invoked when add/remove button is clicked or when space/enter is pressed on the whole item */
  onChange: PropTypes.func.isRequired,
  /** Value passed to the onChange handler */
  item: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  /** Internal prop passed downward by Picklist to indicate which children it is  */
  index: PropTypes.number.isRequired,
  /** Internal prop passed downward by Picklist to provide arrow/home/end keys navigation  */
  handleKeyboardAccessibility: PropTypes.func.isRequired,
};

export default React.memo(PicklistItem);

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import {
  StyledPicklistItem,
  StyledButton,
  StyledLockIcon,
} from "./picklist-item.style";
import Events from "../../../utils/helpers/events";

const PicklistItem = React.forwardRef(
  (
    {
      children,
      type,
      disabled,
      onChange,
      item,
      index,
      handleKeyboardAccessibility,
      locked,
      lockedTooltipMessage = "This item is locked and can not be moved",
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
          data-element="picklist-item"
          locked={locked}
        >
          {children}
          {!locked && (
            <StyledButton
              buttonType="primary"
              destructive={type === "remove"}
              iconType={type}
              onClick={handleClick}
              tabIndex={tabIndex}
              ref={ref}
            />
          )}
          {locked && (
            <StyledLockIcon
              type="locked"
              tooltipMessage={lockedTooltipMessage}
            />
          )}
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
  /**
   * Internal prop passed downward by Picklist to indicate which children it is
   * @private
   * @ignore
   */
  index: PropTypes.number,
  /** Internal prop passed downward by Picklist to provide arrow/home/end keys navigation
   * @private
   * @ignore
   */
  handleKeyboardAccessibility: PropTypes.func,
  /** Disable the item */
  locked: PropTypes.bool,
  /** Tooltip message for the locked icon */
  lockedTooltipMessage: PropTypes.string,
};

export default PicklistItem;

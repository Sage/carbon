import React, { useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import {
  StyledPicklistItem,
  StyledButton,
  StyledLockIcon,
} from "./picklist-item.style";
import FocusContext from "../duelling-picklist.context";
import Events from "../../../utils/helpers/events";

const PicklistItem = React.forwardRef(
  (
    {
      children,
      type,
      disabled,
      onChange,
      item,
      highlighted,
      locked,
      tooltipMessage = "This item is locked and can not be moved",
      index,
      listIndex,
      groupIndex,
      isLastGroup,
      isLastItem,
      ...rest
    },
    ref
  ) => {
    const { setElementToFocus } = useContext(FocusContext);

    const calculateFocusIndex = useCallback(() => {
      if (isLastItem) {
        const toggledListIndex = listIndex === 0 ? 1 : 0;
        const incrementedGroupIndex =
          groupIndex === 0 && index !== 0 ? 1 : groupIndex;

        return {
          itemIndex: isLastGroup ? 0 : incrementedGroupIndex,
          list: isLastGroup ? toggledListIndex : listIndex,
          group: undefined,
        };
      }
      return {
        itemIndex: index,
        list: listIndex,
        group: groupIndex,
      };
    }, [groupIndex, index, isLastGroup, isLastItem, listIndex]);

    const updateFocusElement = useCallback(() => {
      const { itemIndex, list, group } = calculateFocusIndex();
      setElementToFocus(itemIndex, list, group);
    }, [calculateFocusIndex, setElementToFocus]);

    const handleClick = useCallback(() => {
      onChange(item);
      updateFocusElement();
    }, [onChange, item, updateFocusElement]);

    const handleKeydown = useCallback(
      (event) => {
        if (Events.isEnterKey(event) || Events.isSpaceKey(event)) {
          event.preventDefault();
          onChange(item);
          updateFocusElement();
        }
      },
      [onChange, item, updateFocusElement]
    );

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
              highlighted={highlighted}
              ref={ref}
            />
          )}
          {locked && (
            <StyledLockIcon type="locked" tooltipMessage={tooltipMessage} />
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
  /** Disable the item */
  locked: PropTypes.bool,
  /** Tooltip message for the locked icon (only present when locked prop is true) */
  tooltipMessage: PropTypes.string,
  /** @private @ignore */
  highlighted: PropTypes.bool,
  /** @private @ignore */
  index: PropTypes.number,
  /** @private @ignore */
  groupIndex: PropTypes.number,
  /** @private @ignore */
  listIndex: PropTypes.number,
  /** @private @ignore */
  isLastItem: PropTypes.bool,
  /** @private @ignore */
  isLastGroup: PropTypes.bool,
};

export default PicklistItem;

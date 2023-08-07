import React, { useCallback, useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import {
  StyledPicklistItem,
  StyledButton,
  StyledLockIcon,
} from "./picklist-item.style";
import FocusContext from "../duelling-picklist.context";
import Events from "../../../__internal__/utils/helpers/events";

type Item = Record<string, unknown> | string | number;

export interface PicklistItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Define if item is of type add or remove */
  type: "add" | "remove";
  /** Handler invoked when add/remove button is clicked or when space/enter is pressed on the whole item */
  onChange: (item: Item) => void;
  /** Value passed to the onChange handler - can be a string, a number or an object */
  item: Item;
  /** Disable the item */
  locked?: boolean;
  /** Tooltip message for the locked icon (only present when locked prop is true) */
  tooltipMessage?: string;
  /** @private @ignore */
  index?: number;
  /** @private @ignore */
  groupIndex?: number;
  /** @private @ignore */
  listIndex?: number;
  /** @private @ignore */
  isLastItem?: boolean;
  /** @private @ignore */
  isLastGroup?: boolean;
}

export const PicklistItem = React.forwardRef<
  HTMLButtonElement,
  PicklistItemProps
>(
  (
    {
      children,
      type,
      onChange,
      item,
      locked,
      tooltipMessage = "This item is locked and can not be moved",
      index,
      listIndex,
      groupIndex,
      isLastGroup,
      isLastItem,
      ...transitionGroupProps
    }: PicklistItemProps,
    ref
  ) => {
    const { setElementToFocus } = useContext(FocusContext);
    const picklistItemNodeRef = useRef<HTMLLIElement | null>(null);

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
        {...transitionGroupProps}
        {...(type === "add" ? { enter: false } : {})}
        nodeRef={picklistItemNodeRef}
      >
        <StyledPicklistItem
          onKeyDown={handleKeydown}
          data-element="picklist-item"
          locked={locked}
          ref={picklistItemNodeRef}
        >
          {children}
          {!locked && (
            <StyledButton
              buttonType="primary"
              destructive={type === "remove"}
              iconType={type}
              onClick={handleClick}
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

PicklistItem.displayName = "PicklistItem";

export default PicklistItem;

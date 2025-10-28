import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { TransitionGroup } from "react-transition-group";

import { StyledPicklist, StyledEmptyContainer } from "./picklist.style";
import FocusContext from "../__internal__/duelling-picklist.context";
import Events from "../../../__internal__/utils/helpers/events";
import PicklistGroup from "../picklist-group/picklist-group.component";

/**
 * @deprecated `Picklist` has been deprecated. See the Carbon documentation for migration details.
 */
export interface PicklistProps {
  /** List of PicklistItem elements */
  children?: React.ReactNode;
  /** Placeholder to be rendered when list is empty */
  placeholder?: React.ReactNode;
  /** Indicate if component is disabled */
  disabled?: boolean;
  /** @private @ignore */
  index?: number;
}

/**
 * @deprecated `Picklist` has been deprecated. See the Carbon documentation for migration details.
 */
export const Picklist = ({
  disabled,
  children,
  placeholder,
  index,
}: PicklistProps) => {
  const { elementToFocus, setElementToFocus } = useContext(FocusContext);

  const isEmpty = useMemo(
    () => !React.Children.toArray(children).length,
    [children],
  );

  const filteredChildren = React.Children.toArray(children);

  const refs = useMemo(
    () =>
      Array.from(
        {
          length: filteredChildren.length,
        },
        () => React.createRef<HTMLLIElement>(),
      ),
    [filteredChildren.length],
  );

  const focusItem = useCallback(
    (
      ev: React.KeyboardEvent<HTMLDivElement | HTMLUListElement>,
      itemIndex: number,
    ) => {
      ev.preventDefault();
      refs[itemIndex].current?.focus();
    },
    [refs],
  );

  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement | HTMLUListElement>) => {
      if (Events.isHomeKey(ev)) {
        focusItem(ev, 0);
      } else if (Events.isEndKey(ev)) {
        focusItem(ev, refs.length - 1);
      }
    },
    [focusItem, refs],
  );

  const content = filteredChildren.map<React.ReactNode>((child, childIndex) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const props = {
      ref: refs[childIndex],
      disabled,
      index: childIndex,
      listIndex: index,
      isLastGroup:
        child.type === PicklistGroup &&
        childIndex === filteredChildren.length - 1,
    };

    return React.cloneElement(child, props);
  });

  useEffect(() => {
    if (
      elementToFocus.groupIndex === undefined &&
      elementToFocus.listIndex === index &&
      elementToFocus.itemIndex !== undefined
    ) {
      const itemToBeFocused = refs[elementToFocus.itemIndex]?.current;
      if (itemToBeFocused) {
        itemToBeFocused.focus();
        setElementToFocus();
      } else {
        setElementToFocus(0, index === 0 ? 1 : 0, elementToFocus.groupIndex);
      }
    }
  }, [elementToFocus, index, refs, setElementToFocus]);

  return (
    <StyledPicklist
      data-element="picklist"
      data-role="picklist"
      scrollVariant="light"
      onKeyDown={handleKeyDown}
    >
      {isEmpty && <StyledEmptyContainer>{placeholder}</StyledEmptyContainer>}
      <TransitionGroup component={null}>{content}</TransitionGroup>
    </StyledPicklist>
  );
};

Picklist.displayName = "Picklist";

export default Picklist;

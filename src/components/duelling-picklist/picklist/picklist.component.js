import React, { useCallback, useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

import { StyledPicklist, StyledEmptyContainer } from "./picklist.style";
import FocusContext from "../duelling-picklist.context";
import Events from "../../../__internal__/utils/helpers/events";
import PicklistGroup from "../picklist-group/picklist-group.component";

export const Picklist = ({ as, disabled, children, placeholder, index }) => {
  const { elementToFocus, setElementToFocus } = useContext(FocusContext);

  const isEmpty = useMemo(() => {
    const childrenArr = React.Children.toArray(children);
    return (
      !childrenArr.length ||
      (as === "div" && !childrenArr[0]?.props?.children?.length)
    );
  }, [as, children]);

  const filteredChildren = React.Children.toArray(children);

  const refs = useMemo(
    () =>
      Array.from(
        {
          length: filteredChildren.length,
        },
        () => React.createRef()
      ),
    [filteredChildren.length]
  );

  const focusItem = useCallback(
    (ev, itemIndex) => {
      ev.preventDefault();
      refs[itemIndex].current.focus();
    },
    [refs]
  );

  const handleKeyDown = useCallback(
    (ev) => {
      if (Events.isHomeKey(ev)) {
        focusItem(ev, 0);
      } else if (Events.isEndKey(ev)) {
        focusItem(ev, refs.length - 1);
      }
    },
    [focusItem, refs]
  );

  const content = filteredChildren.map(
    (child, childIndex) =>
      child &&
      React.cloneElement(child, {
        ref: as !== "div" ? refs[childIndex] : null,
        disabled,
        index: childIndex,
        listIndex: index,
        isLastGroup:
          child.type === PicklistGroup &&
          childIndex === filteredChildren.length - 1,
      })
  );
  useEffect(() => {
    if (
      elementToFocus?.groupIndex === undefined &&
      index === elementToFocus?.listIndex
    ) {
      if (refs[elementToFocus?.itemIndex]?.current) {
        refs[elementToFocus.itemIndex].current.focus();
        setElementToFocus();
      } else {
        setElementToFocus(0, index === 0 ? 1 : 0, elementToFocus?.groupIndex);
      }
    }
  }, [elementToFocus, index, refs, setElementToFocus]);

  return (
    <StyledPicklist
      as={as}
      data-element="picklist"
      scrollVariant="light"
      onKeyDown={handleKeyDown}
    >
      {isEmpty && (
        <StyledEmptyContainer as={as === "div" && "div"}>
          {placeholder}
        </StyledEmptyContainer>
      )}
      <TransitionGroup component={null}>{content}</TransitionGroup>
    </StyledPicklist>
  );
};

Picklist.propTypes = {
  /** Overrides the default rendered HTML tag of the Picklist component */
  as: PropTypes.string,
  /** List of PicklistItem elements */
  children: PropTypes.node,
  /** Placeholder to be rendered when list is empty */
  placeholder: PropTypes.node,
  /** Indicate if component is disabled */
  disabled: PropTypes.bool,
  /** @private @ignore */
  index: PropTypes.number,
};

export const areEqual = (prevProps, nextProps) => {
  let changesCounter = 0;
  const prevChildCount = React.Children.count(prevProps.children);
  const nextChildCount = React.Children.count(nextProps.children);

  if (prevChildCount !== nextChildCount) {
    changesCounter += 1;
  }

  if (prevProps.disabled !== nextProps.disabled) {
    changesCounter += 1;
  }

  return !changesCounter;
};

Picklist.displayName = "Picklist";

export default Picklist;

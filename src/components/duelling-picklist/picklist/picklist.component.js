import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

import Events from "../../../utils/helpers/events";
import { StyledPicklist, StyledEmptyContainer } from "./picklist.style";

export const Picklist = ({ disabled, children, placeholder }) => {
  const isEmpty = useMemo(() => !React.Children.toArray(children).length > 0, [
    children,
  ]);

  const refs = useMemo(
    () =>
      Array.from(
        {
          length: React.Children.count(children),
        },
        () => React.createRef()
      ),
    [children]
  );

  const focusItem = useCallback(
    (ev, index) => {
      ev.preventDefault();
      refs[index].current.focus();
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

  const content = React.Children.map(
    children,
    (child, index) =>
      child &&
      React.cloneElement(child, {
        ref: refs[index],
        disabled,
      })
  );

  return (
    <StyledPicklist
      data-element="picklist"
      scrollVariant="light"
      onKeyDown={handleKeyDown}
    >
      {isEmpty && <StyledEmptyContainer>{placeholder}</StyledEmptyContainer>}
      <TransitionGroup component={null}>{content}</TransitionGroup>
    </StyledPicklist>
  );
};

Picklist.propTypes = {
  /** List of PicklistItem elements */
  children: PropTypes.node,
  /** Placeholder to be rendered when list is empty */
  placeholder: PropTypes.node,
  /** Indicate if component is disabled */
  disabled: PropTypes.bool,
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

export default Picklist;

import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

import Events from "../../utils/helpers/events";
import {
  StyledPicklist,
  StyledEmptyContainer,
} from "./duelling-picklist.style";

export const Picklist = ({ disabled, children, placeholder }) => {
  const isEmpty = useMemo(() => !React.Children.count(children), [children]);

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
      if (index === -1) {
        refs[refs.length - 1].current.focus();
      } else if (index === refs.length) {
        refs[0].current.focus();
      } else {
        refs[index].current.focus();
      }
    },
    [refs]
  );

  const handleKeyboardAccessibility = useCallback(
    (ev, index) => {
      if (Events.isUpKey(ev)) {
        focusItem(ev, index - 1);
      } else if (Events.isDownKey(ev)) {
        focusItem(ev, index + 1);
      } else if (Events.isHomeKey(ev)) {
        focusItem(ev, 0);
      } else if (Events.isEndKey(ev)) {
        focusItem(ev, refs.length - 1);
      }
    },
    [focusItem, refs]
  );

  const content = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      ref: refs[index],
      index,
      disabled,
      handleKeyboardAccessibility,
    })
  );

  return (
    <StyledPicklist data-element="picklist">
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

export default React.memo(Picklist, areEqual);

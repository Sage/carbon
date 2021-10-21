import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import {
  StyledGroupWrapper,
  StyledPicklistGroupUl,
  StyledPicklistGroup,
  StyledGroupButton,
} from "./picklist-group.style";
import FocusContext from "../duelling-picklist.context";
import Events from "../../../__internal__/utils/helpers/events";

const PicklistGroup = React.forwardRef(
  (
    { title, children, type, onChange, index, listIndex, isLastGroup, ...rest },
    ref
  ) => {
    const { setElementToFocus, elementToFocus } = useContext(FocusContext);
    const [highlighted, setHighlighted] = useState(false);

    const filteredChildren = React.Children.toArray(children);

    const handleClick = useCallback(() => {
      onChange();
      setElementToFocus(index, listIndex);
    }, [index, listIndex, onChange, setElementToFocus]);

    const handleKeydown = useCallback(
      (event) => {
        if (Events.isEnterKey(event) || Events.isSpaceKey(event)) {
          event.preventDefault();
          onChange();
          setElementToFocus(index, listIndex);
        }
      },
      [index, listIndex, onChange, setElementToFocus]
    );

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

    const content = React.Children.map(
      children,
      (child, childIndex) =>
        child &&
        React.cloneElement(child, {
          ref: refs[childIndex],
          index: childIndex,
          listIndex,
          groupIndex: index,
          isLastGroup,
          isLastItem: childIndex === filteredChildren.length - 1,
        })
    );

    useEffect(() => {
      if (
        index === elementToFocus?.groupIndex &&
        listIndex === elementToFocus?.listIndex
      ) {
        refs[elementToFocus?.itemIndex].current.focus();
        setElementToFocus();
      }
    }, [
      elementToFocus,
      index,
      isLastGroup,
      listIndex,
      refs,
      setElementToFocus,
    ]);

    return (
      <CSSTransition
        timeout={{
          appear: 500,
          enter: 300,
          exit: 0,
        }}
        classNames="picklist-group"
        {...rest}
        {...(type === "add" ? { enter: false } : {})}
      >
        <StyledGroupWrapper highlighted={highlighted} type={type}>
          <StyledPicklistGroupUl>
            <StyledPicklistGroup
              onKeyDown={handleKeydown}
              data-element="picklist-group"
            >
              {title}
              <StyledGroupButton
                buttonType="secondary"
                destructive={type === "remove"}
                iconType={type}
                onClick={handleClick}
                onMouseEnter={() => setHighlighted(true)}
                onMouseLeave={() => setHighlighted(false)}
                onFocus={() => setHighlighted(true)}
                onBlur={() => setHighlighted(false)}
                ref={ref}
              />
            </StyledPicklistGroup>
            <TransitionGroup component={null}>{content}</TransitionGroup>
          </StyledPicklistGroupUl>
        </StyledGroupWrapper>
      </CSSTransition>
    );
  }
);

PicklistGroup.propTypes = {
  /** Group title */
  title: PropTypes.node.isRequired,
  /** Item content */
  children: PropTypes.node.isRequired,
  /** Define if item is of type add or remove */
  type: PropTypes.oneOf(["add", "remove"]).isRequired,
  /** Handler invoked when add/remove button is clicked or when space/enter is pressed on the whole item */
  onChange: PropTypes.func.isRequired,
  /** @private @ignore */
  index: PropTypes.number,
  /** @private @ignore */
  listIndex: PropTypes.number,
  /** @private @ignore */
  isLastGroup: PropTypes.bool,
};

export default PicklistGroup;

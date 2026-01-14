import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import {
  StyledGroupWrapper,
  StyledPicklistGroupUl,
  StyledPicklistGroup,
  StyledGroupButton,
} from "./picklist-group.style";
import FocusContext from "../__internal__/duelling-picklist.context";
import Events from "../../../__internal__/utils/helpers/events";

/**
 * @deprecated `PicklistGroup` has been deprecated. See the Carbon documentation for migration details.
 */
export interface PicklistGroupProps {
  /** Group title */
  title: React.ReactNode;
  /** Item content */
  children: React.ReactNode;
  /** Define if item is of type add or remove */
  type: "add" | "remove";
  /** Handler invoked when add/remove button is clicked or when space/enter is pressed on the whole item */
  onChange: () => void;
  /** @private @ignore */
  index?: number;
  /** @private @ignore */
  listIndex?: number;
  /** @private @ignore */
  isLastGroup?: boolean;
}

/**
 * @deprecated `PicklistGroup` has been deprecated. See the Carbon documentation for migration details.
 */
const PicklistGroup = React.forwardRef<HTMLButtonElement, PicklistGroupProps>(
  (
    {
      title,
      children,
      type,
      onChange,
      index,
      listIndex,
      isLastGroup,
      ...transitionGroupProps
    }: PicklistGroupProps,
    ref,
  ) => {
    const { setElementToFocus, elementToFocus } = useContext(FocusContext);
    const [highlighted, setHighlighted] = useState(false);
    const nodeRef = React.useRef<HTMLLIElement>(null);
    const filteredChildren = React.Children.toArray(children);

    const handleClick = useCallback(() => {
      onChange();
      setElementToFocus(index, listIndex);
    }, [index, listIndex, onChange, setElementToFocus]);

    const handleKeydown = useCallback(
      (event: React.KeyboardEvent<HTMLLIElement>) => {
        if (Events.isEnterKey(event) || Events.isSpaceKey(event)) {
          event.preventDefault();
          onChange();
          setElementToFocus(index, listIndex);
        }
      },
      [index, listIndex, onChange, setElementToFocus],
    );

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

    const content = React.Children.map<React.ReactNode, React.ReactNode>(
      children,
      (child, childIndex) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const props = {
          ref: refs[childIndex],
          index: childIndex,
          listIndex,
          groupIndex: index,
          isLastGroup,
          isLastItem: childIndex === filteredChildren.length - 1,
        };

        return React.cloneElement(child, props);
      },
    );

    useEffect(() => {
      if (
        elementToFocus.groupIndex === index &&
        elementToFocus.listIndex === listIndex &&
        elementToFocus.itemIndex !== undefined
      ) {
        refs[elementToFocus.itemIndex].current?.focus();
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
        nodeRef={nodeRef}
        classNames="picklist-group"
        {...transitionGroupProps}
        {...(type === "add" ? { enter: false } : {})}
      >
        <StyledGroupWrapper ref={nodeRef} highlighted={highlighted} type={type}>
          <StyledPicklistGroupUl>
            <StyledPicklistGroup
              onKeyDown={handleKeydown}
              data-element="picklist-group"
            >
              {title}
              <StyledGroupButton
                data-role="picklist-group-button"
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
  },
);

PicklistGroup.displayName = "PicklistGroup";

export default PicklistGroup;

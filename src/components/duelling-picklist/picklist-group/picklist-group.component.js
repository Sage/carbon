import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import {
  StyledGroupWrapper,
  StyledPicklistGroup,
  StyledGroupButton,
} from "./picklist-group.style";
import Events from "../../../utils/helpers/events/events";

const PicklistGroup = React.forwardRef(
  ({ title, children, type, onChange, ...rest }, ref) => {
    const [highlighted, setHighlighted] = useState(false);
    const handleClick = useCallback(() => onChange(), [onChange]);
    const handleKeydown = useCallback(
      (event) => {
        if (Events.isEnterKey(event) || Events.isSpaceKey(event)) {
          event.preventDefault();
          onChange();
        }
      },
      [onChange]
    );

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
          <StyledPicklistGroup
            onKeyDown={handleKeydown}
            ref={ref}
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
            />
          </StyledPicklistGroup>
          <TransitionGroup component={null}>{children}</TransitionGroup>
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
};

export default PicklistGroup;

import React, { useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import Events from "../../__internal__/utils/helpers/events";
import StyledIconButton from "./icon-button.style";
import Icon from "../icon";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const IconButton = React.forwardRef(
  ({ "aria-label": ariaLabel, onAction, children, disabled, ...rest }, ref) => {
    const marginProps = filterStyledSystemMarginProps(rest);
    const hasIconWithTooltip = !!React.Children.toArray(children).find(
      (child) => child?.props?.tooltipMessage
    );
    const [tooltipVisible, setTooltipVisible] = useState(undefined);

    const onKeyDown = (e) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        e.preventDefault();
        onAction(e);
      } else {
        e.stopPropagation();
      }
    };

    const handleOnAction = (e) => {
      onAction(e);
    };

    const handleTooltipVisibility = (ev, callbackName) => {
      setTooltipVisible(["onFocus", "onMouseEnter"].includes(callbackName));
      if (rest[callbackName]) rest[callbackName](ev);
    };

    return (
      <StyledIconButton
        {...rest}
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        onClick={handleOnAction}
        ref={ref}
        disabled={disabled}
        {...(!disabled &&
          hasIconWithTooltip && {
            onFocus: (ev) => handleTooltipVisibility(ev, "onFocus"),
            onBlur: (ev) => handleTooltipVisibility(ev, "onBlur"),
            onMouseEnter: (ev) => handleTooltipVisibility(ev, "onMouseEnter"),
            onMouseLeave: (ev) => handleTooltipVisibility(ev, "onMouseLeave"),
          })}
        {...marginProps}
      >
        <TooltipProvider
          disabled={disabled}
          tooltipVisible={tooltipVisible}
          focusable={false}
        >
          {children}
        </TooltipProvider>
      </StyledIconButton>
    );
  }
);

IconButton.propTypes = {
  ...marginPropTypes,
  /** Children prop is restricted to one Icon Component */
  children: PropTypes.shape({
    type: PropTypes.oneOf([Icon, PropTypes.element]),
  }).isRequired,
  /** Callback */
  onAction: PropTypes.func.isRequired,
  /** Prop to specify the aria-label of the icon-button component */
  "aria-label": PropTypes.string,
  /** Set the button to disabled */
  disabled: PropTypes.bool,
};

export default IconButton;

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
    const [internalRef, setInternalRef] = useState(null);
    const marginProps = filterStyledSystemMarginProps(rest);

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

    return (
      <StyledIconButton
        {...rest}
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        onClick={handleOnAction}
        ref={(reference) => {
          if (reference) {
            setInternalRef(reference);
            if (!ref) return;
            if (typeof ref === "object") ref.current = reference;
            if (typeof ref === "function") ref(reference);
          }
        }}
        disabled={disabled}
        {...marginProps}
      >
        <TooltipProvider
          disabled={disabled}
          focusable={false}
          target={internalRef}
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

import React from "react";
import PropTypes from "prop-types";
import StyledToolbarButton from "./toolbar-button.style";

const ToolbarButton = React.forwardRef(
  (
    {
      onKeyDown,
      onMouseDown,
      activated,
      ariaLabel,
      tabbable,
      children,
      onMouseOver,
      onMouseLeave,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    return (
      <StyledToolbarButton
        data-component="text-editor-toolbar-button"
        ref={ref}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        isActive={activated}
        aria-label={ariaLabel}
        {...(!tabbable && { tabIndex: -1 })}
        activated={activated}
        tabbable={tabbable}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </StyledToolbarButton>
    );
  }
);

ToolbarButton.propTypes = {
  /** Accessibility label for a button */
  ariaLabel: PropTypes.string.isRequired,
  /** The children for the button */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  /** Used to control the button's active status */
  activated: PropTypes.bool,
  /** Callback to handle any keydown events on a button */
  onKeyDown: PropTypes.func.isRequired,
  /** Callback to handle any mouse down events on a button */
  onMouseDown: PropTypes.func.isRequired,
  /** Controls whether the button can be tabbed to */
  tabbable: PropTypes.bool,
  onMouseOver: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default ToolbarButton;

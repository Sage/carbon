import React from "react";
import PropTypes from "prop-types";
import StyledToolbarButton from "./toolbar-button.style";
import TooltipDecorator from "../../../../../utils/decorators/tooltip-decorator/tooltip-decorator";

class ToolbarButton extends React.Component {
  componentDidUpdate() {
    // ensure tooltip is hidden when prop updates
    if (!this.props.tooltipVisible) {
      this.onHide();
    }
  }

  render() {
    return (
      <>
        <StyledToolbarButton
          data-component="text-editor-toolbar-button"
          ref={(comp) => {
            this._target = comp;
          }}
          onMouseOver={this.props.onMouseOver}
          onMouseLeave={this.props.onMouseLeave}
          onFocus={this.props.onMouseOver}
          onKeyDown={this.props.onKeyDown}
          onMouseDown={this.props.onMouseDown}
          onBlur={this.props.onMouseLeave}
          isActive={this.props.activated}
          aria-label={this.props.ariaLabel}
          {...(!this.props.tabbable && { tabIndex: -1 })}
          type="button"
        >
          {this.props.children}
        </StyledToolbarButton>

        {this.tooltipHTML}
      </>
    );
  }
}

ToolbarButton.propTypes = {
  /** Accessibility label for a button */
  ariaLabel: PropTypes.string.isRequired,
  /** The children for the button */
  children: PropTypes.node.isRequired,
  /** Used to control the button's active status */
  activated: PropTypes.bool,
  /** Callback to handle any keydown events on a button */
  onKeyDown: PropTypes.func.isRequired,
  /** Callback to handle any mouse down events on a button */
  onMouseDown: PropTypes.func.isRequired,
  /** Callback to handle any mouse over events on a button */
  onMouseOver: PropTypes.func.isRequired,
  /** Callback to handle any mouse leave events on a button */
  onMouseLeave: PropTypes.func.isRequired,
  /** Controls whether the button's tooltip should be shown */
  tooltipVisible: PropTypes.bool,
  tabbable: PropTypes.bool,
};

ToolbarButton.defaultProps = {
  tooltipVisible: false,
};

export default TooltipDecorator(ToolbarButton);

import React from 'react';
import PropTypes from 'prop-types';
import { StyledToolbarButton } from './toolbar.style';
import TooltipDecorator from '../../../utils/decorators/tooltip-decorator';

class ToolbarButton extends React.Component {
  componentDidUpdate() {
    // prevents a race condition where the tooltip state does not update fast enough
    if (!this.props.tooltipVisible) {
      this.onHide();
    }
  }

  render() {
    return (
      <>
        <StyledToolbarButton
          ref={ (comp) => { this._target = comp; } }
          onMouseOver={ this.props.onMouseOver }
          onMouseLeave={ this.props.onMouseLeave }
          onFocus={ this.props.onMouseOver }
          onKeyDown={ this.props.onKeyDown }
          onMouseDown={ this.props.onMouseDown }
          onBlur={ this.props.onMouseLeave }
        >
          { this.props.children }
        </StyledToolbarButton>

        { this.tooltipHTML }
      </>
    );
  }
}

ToolbarButton.propTypes = {
  children: PropTypes.node.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  tooltipVisible: PropTypes.bool
};

ToolbarButton.defaultProps = {
  tooltipVisible: false
};

export default TooltipDecorator(ToolbarButton);

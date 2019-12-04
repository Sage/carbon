import React from 'react';
import PropTypes from 'prop-types';
import StyledTab from './tab.style';
import tagComponent from '../../../utils/helpers/tags';

class Tab extends React.Component {
  static contextTypes = {
    /**
     * Defines what contexts are available to this tab componenet
     * https://facebook.github.io/react/docs/context.html
     */
    tabs: PropTypes.object
  };

  static childContextTypes = {
    /**
     * Defines a context object for context children of this tab component.
     * https://facebook.github.io/react/docs/context.html
     */
    tab: PropTypes.object
  };

  /**
   * Returns tab object to context children.
   */
  getChildContext() {
    return {
      tab: {
        setValidity: this.setValidity,
        setWarning: this.setWarning
      }
    };
  }

  /**
   * Sets valid state to passed param
   * it notifies the parent context of the change
   * and sets the current valid state to the new value
   *
   */
  setValidity = (valid) => {
    this.context.tabs.changeValidity(this.props.tabId, valid);
  };

  /**
   * Sets warning state to passed param
   * it notifies the parent context of the change
   * and sets the current warning state to the new value
   */
  setWarning = (warning) => {
    this.context.tabs.changeWarning(this.props.tabId, warning);
  };

  render() {
    const {
      className, children, isTabSelected, position, ariaLabelledby, role
    } = this.props;
    return (
      <StyledTab
        className={ className }
        role={ role }
        isTabSelected={ isTabSelected }
        aria-labelledby={ ariaLabelledby }
        position={ position }
        { ...tagComponent('tab', this.props) }
      >
        {children}
      </StyledTab>
    );
  }
}

Tab.defaultProps = {
  position: 'top',
  role: 'tabpanel'
};

Tab.propTypes = {
  tabId: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  isTabSelected: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'left']),
  role: PropTypes.string,
  ariaLabelledby: PropTypes.string
};

export default Tab;

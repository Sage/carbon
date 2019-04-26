import React from 'react';
import PropTypes from 'prop-types';
import StyledTab from './tab.style';

class Tab extends React.Component {
  // ** Returns tab object to context children. */
  getChildContext() {
    return {
      tab: {
        setValidity: this.setValidity,
        setWarning: this.setWarning
      }
    };
  }

  // ** Sets valid state to passed param
  // It notifies the parent context of the change
  // and sets the current valid state to the new value */
  setValidity = (valid) => {
    this.context.tabs.changeValidity(this.props.tabId, valid);
  };

  // ** Sets warning state to passed param
  // It notifies the parent context of the change
  //  and sets the current warning state to the new value */
  setWarning = (warning) => {
    this.context.tabs.changeWarning(this.props.tabId, warning);
  };

  render() {
    const {
      ariaLabelledby, className, role, children, isTabSelected, position
    } = this.props;
    return (
      <StyledTab
        aria-labelledby={ ariaLabelledby }
        className={ className }
        role={ role }
        isTabSelected={ isTabSelected }
        position={ position }
      >
        {children}
      </StyledTab>
    );
  }
}

// ** Defines a context object for context children of this tab component.
// https://facebook.github.io/react/docs/context.html */
Tab.childContextTypes = {
  tab: PropTypes.object
};

// ** Defines what contexts are available to this tab componenet
// https://facebook.github.io/react/docs/context.html */
Tab.contextTypes = {
  tabs: PropTypes.object
};

Tab.defaultProps = {
  role: 'tabPanel'
};

Tab.propTypes = {
  ariaLabelledby: PropTypes.string,
  role: PropTypes.string,
  title: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  // TODO: po co ten title
  tabId: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  isTabSelected: PropTypes.bool,
  position: PropTypes.string
};

export default Tab;

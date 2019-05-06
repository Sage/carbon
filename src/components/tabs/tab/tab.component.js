import React from 'react';
import PropTypes from 'prop-types';
import StyledTab from './tab.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

class Tab extends React.Component {
  getChildContext() {
    return {
      tab: {
        setValidity: this.setValidity,
        setWarning: this.setWarning
      }
    };
  }

  setValidity = (valid) => {
    this.context.tabs.changeValidity(this.props.tabId, valid);
  };

  setWarning = (warning) => {
    this.context.tabs.changeWarning(this.props.tabId, warning);
  };

  render() {
    const {
      ariaLabelledby, className, role, children, isTabSelected, position, title
    } = this.props;
    return (
      <StyledTab
        aria-labelledby={ ariaLabelledby }
        className={ className }
        role={ role }
        title={ title }
        isTabSelected={ isTabSelected }
        position={ position }
      >
        {children}
      </StyledTab>
    );
  }
}

Tab.childContextTypes = {
  tab: PropTypes.object
};

Tab.contextTypes = {
  tabs: PropTypes.object
};

Tab.defaultProps = {
  role: 'tabPanel'
};

Tab.propTypes = {
  ariaLabelledby: PropTypes.string,
  role: PropTypes.string,
  title: PropTypes.string,
  tabId: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  isTabSelected: PropTypes.bool,
  position: PropTypes.oneOf(OptionsHelper.orientation)
};

export default Tab;

import React from 'react';
import PropTypes from 'prop-types';
import StyledTab from './tab.style';
import OptionsHelper from '../../../utils/helpers/options-helper';
import TabHeader from '../tab-header/tab-header.component';
import TabContent from '../tab-content/tab-content-component';

class Tab extends React.Component {
  setValidity = (valid) => {
    this.context.tabs.changeValidity(this.props.tabId, valid);
  };

  setWarning = (warning) => {
    this.context.tabs.changeWarning(this.props.tabId, warning);
  };

  render() {
    const {
      ariaLabelledby, className, role, children, isTabSelected, position, title, tabId
    } = this.props;
    return (
      <StyledTab
        aria-labelledby={ ariaLabelledby }
        className={ className }
        role={ role }
        isTabSelected={ isTabSelected }
        position={ position }
      >
        <TabHeader
          position={ position }
          isTabSelected={ isTabSelected }
          title={ title }
          // className={ this.tabHeaderClasses(child) }
          tabId={ tabId }
          id={ tabId }
          onClick={ this.handleTabClick }
          // onKeyDown={ this.handleKeyDown(index) }
          role='tab'
          tabIndex={ isTabSelected ? '0' : '-1' }
        />
        <TabContent>{children}</TabContent>
      </StyledTab>
    );
  }
}

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

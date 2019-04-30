import React from 'react';
import PropTypes from 'prop-types';
import StyledTabContent from './tab-content-style';

const TabContent = ({
  isTabSelected, className, tabId, id, onClick, onKeyDown, tabIndex, position, children
}) => {
  return (
    <StyledTabContent
      isTabSelected={ isTabSelected }
      aria-selected={ isTabSelected }
      className={ className }
      data-element='select-tab'
      data-tabid={ tabId }
      id={ id }
      onClick={ onClick }
      onKeyDown={ onKeyDown }
      role='tab'
      tabIndex={ tabIndex }
      position={ position }
    >
      {children}
    </StyledTabContent>
  );
};

TabContent.defaultProps = {
  position: 'horizontal'
};

TabContent.propTypes = {
  children: PropTypes.node,
  isTabSelected: PropTypes.bool,
  position: PropTypes.string,
  className: PropTypes.string,
  tabId: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabIndex: PropTypes.string
};

export default TabContent;

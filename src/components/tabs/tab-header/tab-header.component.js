import React from 'react';
import PropTypes from 'prop-types';
import StyledTabHeader from './tab-header.style';

const TabHeader = ({
  isTabSelected,
  ariaSelected,
  className,
  dataTabId,
  id,
  onClick,
  onKeyDown,
  tabIndex,
  position,
  title
}) => {
  return (
    <StyledTabHeader
      isTabSelected={ isTabSelected }
      aria-selected={ ariaSelected }
      className={ className }
      data-element='select-tab'
      data-tabid={ dataTabId }
      id={ id }
      onClick={ onClick }
      onKeyDown={ onKeyDown }
      role='tab'
      tabIndex={ tabIndex }
      position={ position }
    >
      {title}
    </StyledTabHeader>
  );
};

TabHeader.defaultProps = {
  position: 'horizontal'
};

TabHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isTabSelected: PropTypes.bool,
  position: PropTypes.string,
  ariaSelected: PropTypes.bool,
  className: PropTypes.string,
  dataTabId: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabIndex: PropTypes.string
};

export default TabHeader;

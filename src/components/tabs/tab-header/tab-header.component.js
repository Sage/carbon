import React from 'react';
import PropTypes from 'prop-types';
import StyledTabHeader from './tab-header.style';

const TabHeader = (props) => {
  return (
    <StyledTabHeader
      isTabSelected={ props.isTabSelected }
      aria-selected={ props.ariaSelected }
      className={ props.className }
      data-element='select-tab'
      data-tabid={ props.dataTabId }
      id={ props.id }
      key={ props.key }
      onClick={ props.onClick }
      onKeyDown={ props.onKeyDown }
      ref={ props.ref }
      role='tab'
      tabIndex={ props.tabIndex }
      position={ props.position }
    >
      {props.title}
    </StyledTabHeader>
  );
};

TabHeader.defaultProps = {};

TabHeader.propTypes = {
  title: PropTypes.string,
  isTabSelected: PropTypes.bool,
  position: PropTypes.string,
  ariaSelected: PropTypes.string,
  className: PropTypes.string,
  dataTabId: PropTypes.string,
  id: PropTypes.string,
  key: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ref: PropTypes.string,
  tabIndex: PropTypes.string
};

export default TabHeader;

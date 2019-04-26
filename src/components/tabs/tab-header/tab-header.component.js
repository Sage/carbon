import React from 'react';
import PropTypes from 'prop-types';
import StyledTabHeader from './tab-header.style';

const TabHeader = (props) => {
  return <StyledTabHeader isTabSelected={ props.isTabSelected }>{props.title}</StyledTabHeader>;
};

TabHeader.defaultProps = {};

TabHeader.propTypes = {
  title: PropTypes.string,
  isTabSelected: PropTypes.bool
};

export default TabHeader;

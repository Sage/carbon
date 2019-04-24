import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags/tags';
import SidebarHeaderStyle from './sidebar-header.style';

const SidebarHeader = props => (
  <SidebarHeaderStyle className={ props.className } { ...tagComponent('sidebar-header', props) }>
    { props.children }
  </SidebarHeaderStyle>
);

SidebarHeader.propTypes = {
  /** This component supports children. */
  children: PropTypes.node,
  /** A custom class name. */
  className: PropTypes.string
};

export default SidebarHeader;

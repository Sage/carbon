import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags/tags';
import SidebarHeaderStyle from './sidebar-header.style';

const SidebarHeader = ({ className, children, ...props }) => (
  <SidebarHeaderStyle className={ className } { ...tagComponent('sidebar-header', props) }>
    { children }
  </SidebarHeaderStyle>
);

SidebarHeader.propTypes = {
  /** This component supports children. */
  children: PropTypes.node,
  /** A custom class name. */
  className: PropTypes.string
};

export default SidebarHeader;

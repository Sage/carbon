import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../../utils/helpers/tags/tags';
import SidebarHeaderStyle from './sidebar-header.style';

class SidebarHeader extends React.Component {
  /** Returns classes for the component. */
  get mainClasses() {
    return classNames(
      this.props.className
    );
  }

  /** Renders the component. */
  render() {
    return (
      <SidebarHeaderStyle className={ this.mainClasses } { ...tagComponent('sidebar-header', this.props) }>
        { this.props.children }
      </SidebarHeaderStyle>
    );
  }
}

SidebarHeader.propTypes = {
  /** This component supports children. */
  children: PropTypes.node,
  /** A custom class name. */
  className: PropTypes.string
};

export default SidebarHeader;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../../utils/helpers/tags';
import './sidebar-header.scss';

class SidebarHeader extends React.Component {
  static propTypes = {
    /**
     * This component supports children.
     */
    children: PropTypes.node,

    /**
     * A custom class name.
     *
     */
    className: PropTypes.string
  };

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames('carbon-sidebar-header', this.props.className);
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses } { ...tagComponent('sidebar-header', this.props) }>
        {this.props.children}
      </div>
    );
  }
}

export default SidebarHeader;

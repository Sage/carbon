import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { tagComponent } from '../../../utils/helpers/tags';

/**
 * A Sidebar Header widget.
 *
 * Sidebar header can be used as a first child of the Sidebar component
 *
 * == How to use a Sidebar Header in a component:
 *
 * In your file
 *
 *   import { Sidebar, SidebarHeader } from 'carbon/lib/components/sidebar';
 *
 * To render the Sidebar Header:
 *
 *   <Sidebar
 *     onClose={ closeSidebar }
 *     open={ true }
 *   >
 *   <SidebarHeader />
 *   </Sidebar>
 *
 * @class SidebarHeader
 * @constructor
 */
class SidebarHeader extends React.Component {

  static propTypes = {

    /**
     * Required prop which will be the content
     * of the sidebar header
     *
     * @property children
     * @type {Multiple}
     */
    children: PropTypes.node,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string
  }

  static defaultProps = {
    children: null,
    className: ''
  }

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'carbon-sidebar-header',
      this.props.className
    );
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
        { this.props.children }
      </div>
    );
  }
}

export default SidebarHeader;

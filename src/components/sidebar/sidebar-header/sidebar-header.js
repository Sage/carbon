import React from 'react';
import classNames from 'classnames';

class SidebarHeader extends React.Component {

  static propTypes = {

    /**
     * Required prop which will be the content
     * of the sidebar header
     *
     * @property children
     * @type {Multiple}
     */
    children: React.PropTypes.node.isRequired
  }

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'ui-sidebar-header',
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
      <div className={ this.mainClasses }>
        { this.props.children }
      </div>
    );
  }
}

export default SidebarHeader;

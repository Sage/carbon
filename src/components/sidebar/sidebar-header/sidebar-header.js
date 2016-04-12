import React from 'react';
import classNames from 'classnames';

class Sidebar extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
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

export default Sidebar;

import React from 'react';
import classNames from 'classnames';
import MenuItem from './menu-item';
import SubmenuBlock from './submenu-block';

/**
 * Renders a menu component, with menu items.
 */
class Menu extends React.Component {
  static propTypes = {
    as: PropTypes.string // defines the style of the component eg. primary/secondary
  }

  static defaultProps = {
    as: "primary"
  }

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      "carbon-menu",
      this.props.className,
      `carbon-menu--${this.props.as}`
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <div className={ this.classes }>
        { this.props.children }
      </div>
    );
  }
}

export {
  Menu,
  MenuItem,
  SubmenuBlock
};

import React from 'react';
import classNames from 'classnames';
import Link from './../../link';

/**
 * Renders a menu item for the menu component.
 */
class MenuItem extends React.Component {
  static propTypes = {
    /**
     * Defines which direction the submenu will hang eg. left/right
     *
     * @property submenuDirection
     * @type {String}
     */
    submenuDirection: React.PropTypes.string,

    /**
     * Is the menu item the currently selected item.
     *
     * @property selected
     * @type {Boolean}
     */
    selected: React.PropTypes.bool,

    /**
     * (for submenus) renders with a divide between items.
     *
     * @property divide
     * @type {Boolean}
     */
    divide: React.PropTypes.bool,

    /**
     * A title for the menu item that has a submenu.
     *
     * @property submenu
     * @type {String | Object}
     */
    submenu: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),

    /**
     * The href to use for the menu item.
     *
     * @property href
     * @type {String}
     */
    href: React.PropTypes.string,

    /**
     * The to link to use for the menu item.
     *
     * @property to
     * @type {String}
     */
    to: React.PropTypes.string,

    /**
     * The target to use for the menu item.
     *
     * @property target
     * @type {String}
     */
    target: React.PropTypes.string
  }

  static defaultProps = {
    submenuDirection: "right"
  }

  /**
   * Determines what content will be rendered for the menu item.
   *
   * @return {Object} JSX
   */
  get content() {
    // if does not have a submenu, just render the children
    if (!this.props.submenu) { return this.props.children; }

    // if it does have a submenu, render the following:
    let submenuClasses = classNames(
      "ui-menu-item__submenu",
      `ui-menu-item__submenu--${this.props.submenuDirection}`
    );

    return (
      <div>
        <MenuItem className="ui-menu-item__submenu-title" href={ this.props.href } to={ this.props.to }>
          { this.props.submenu }
        </MenuItem>

        <div className={ submenuClasses }>
          { this.props.children }
        </div>
      </div>
    );
  }

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      "ui-menu-item",
      this.props.className, {
        ["ui-menu-item--has-link"]: this.props.href || this.props.to,
        ["ui-menu-item--has-submenu"]: this.props.submenu,
        ["ui-menu-item--selected"]: this.props.selected,
        ["ui-menu-item--divide"]: this.props.divide
      }
    );
  }

  /**
   * @method render
   */
  render() {
    let component = this.props.submenu ? "div" : Link;

    return (
      React.createElement(
        component,
        {
          className: this.classes,
          href: this.props.href,
          to: this.props.to,
          target: this.props.target
        },
        this.content
      )
    );
  }
}

export default MenuItem;

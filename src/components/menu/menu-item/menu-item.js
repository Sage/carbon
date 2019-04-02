import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { assign } from 'lodash';
import Link from '../../link';
import tagComponent from '../../../utils/helpers/tags';
import './menu-item.scss';

/**
 * Renders a menu item for the menu component.
 */
class MenuItem extends React.Component {
  static propTypes = {
    /**
     * Children elements
     */
    children: PropTypes.node.isRequired,

    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * onClick handler
     */
    onClick: PropTypes.func,

    /**
     * Adds an icon to the menu item.
     */
    icon: PropTypes.string,

    /**
     * Defines which direction the submenu will hang eg. left/right
     */
    submenuDirection: PropTypes.string,

    /**
     * Is the menu item the currently selected item.
     */
    selected: PropTypes.bool,

    /**
     * (for submenus) renders with a divide between items.
     */
    divide: PropTypes.bool,

    /**
     * A title for the menu item that has a submenu.
     */
    submenu: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    /**
     * The href to use for the menu item.
     */
    href: PropTypes.string,

    /**
     * The to link to use for the menu item.
     */
    to: PropTypes.string,

    /**
     * The target to use for the menu item.
     */
    target: PropTypes.string
  }

  static defaultProps = {
    submenuDirection: 'right'
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
    const submenuClasses = classNames(
      'carbon-menu-item__submenu',
      `carbon-menu-item__submenu--${this.props.submenuDirection}`
    );

    return (
      <React.Fragment>
        <MenuItem
          className='carbon-menu-item__submenu-title' href={ this.props.href }
          to={ this.props.to }
        >
          { this.props.submenu }
        </MenuItem>

        <ul className={ submenuClasses }>
          {
            React.Children.map(
              this.props.children,
              child => <li className='carbon-menu-item__submenu-item'>{ child }</li>
            )
          }
        </ul>
      </React.Fragment>
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
      'carbon-menu-item',
      this.props.className, {
        'carbon-menu-item--divide': this.props.divide,
        'carbon-menu-item--has-link': this.props.href || this.props.to || this.props.onClick,
        'carbon-menu-item--has-submenu': this.props.submenu,
        'carbon-menu-item--selected': this.props.selected
      }
    );
  }

  /**
   * @method render
   */
  render() {
    const component = this.props.submenu ? 'div' : Link;
    let props = {
      className: this.classes,
      href: this.props.href,
      to: this.props.to,
      target: this.props.target,
      onClick: this.props.onClick,
      icon: this.props.icon
    };

    props = assign({}, props, tagComponent('menu-item', this.props));

    return (
      React.createElement(
        component,
        props,
        this.content
      )
    );
  }
}

export default MenuItem;

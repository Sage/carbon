import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuItem from './menu-item';
import SubmenuBlock from './submenu-block';
import tagComponent from '../../utils/helpers/tags';
import './menu.scss';

class Menu extends React.Component {
  static propTypes = {
    /**
     * Defines the style of the component eg. primary/secondary
     *
     * @property as
     * @type {String}
     */
    as: PropTypes.string,

    /**
     * Children elements
     *
     * @property children
     * @type {Node}
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
    as: 'primary'
  }

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      'carbon-menu',
      this.props.className,
      `carbon-menu--${this.props.as}`
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <nav className={ this.classes } { ...tagComponent('menu', this.props) }>
        <ul className='carbon-menu__items'>
          {
            React.Children.map(
              this.props.children,
              child => <li className='carbon-menu__item'>{ child }</li>
            )
          }
        </ul>
      </nav>
    );
  }
}

export {
  Menu,
  MenuItem,
  SubmenuBlock
};

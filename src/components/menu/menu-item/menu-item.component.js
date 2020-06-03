import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from '../../link';
import StyledMenuItemWrapper from './menu-item.style';
import { StyledSubmenu, StyledSubmenuItem, StyledSubmenuTitle } from '../submenu-block/submenu.style';

const MenuItem = (props) => {
  const content = () => {
    // if does not have a submenu, just render the children
    if (!props.submenu) return props.children;

    return (
      <>
        <StyledSubmenuTitle>
          <MenuItem
            href={ props.href }
            to={ props.to }
            menuType={ props.menuType }
          >
            { props.submenu }
          </MenuItem>
        </StyledSubmenuTitle>
        <StyledSubmenu submenuDirection={ props.submenuDirection }>
          {
            React.Children.map(
              props.children,
              child => (
                <StyledSubmenuItem>
                  {React.cloneElement(child, { menuType: props.menuType })}
                </StyledSubmenuItem>
              )
            )
          }
        </StyledSubmenu>
      </>
    );
  };

  const classes = () => {
    return classNames({ 'carbon-menu-item--has-link': props.href || props.to || props.onClick });
  };

  const elementProps = {
    className: classes(),
    href: props.href,
    to: props.to,
    target: props.target,
    onClick: props.onClick,
    icon: props.icon,
    divide: props.divide,
    hasSubmenu: Boolean(props.submenu),
    selected: props.selected,
    menuType: props.menuType
  };

  if (props.submenu) {
    elementProps.routerLink = props.routerLink;
  }

  return (
    <StyledMenuItemWrapper
      as={ props.submenu ? 'div' : Link }
      data-component='menu-item'
      { ...elementProps }
    >
      {content()}
    </StyledMenuItemWrapper>
  );
};

MenuItem.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
  /** Custom className */
  className: PropTypes.string,
  /** onClick handler */
  onClick: PropTypes.func,
  /** Adds an icon to the menu item. */
  icon: PropTypes.string,
  /** Defines which direction the submenu will hang eg. left/right */
  submenuDirection: PropTypes.string,
  /** Is the menu item the currently selected item. */
  selected: PropTypes.bool,
  /** (for submenus) renders with a divide between items. */
  divide: PropTypes.bool,
  /** A title for the menu item that has a submenu. */
  submenu: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** The href to use for the menu item. */
  href: PropTypes.string,
  /** The to link to use for the menu item. */
  to: PropTypes.string,
  /** The link element to use when providing the to value */
  routerLink: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** The target to use for the menu item. */
  target: PropTypes.string,
  /** menu theme provided by <Menu /> */
  menuType: PropTypes.oneOf(['primary', 'secondary'])
};

MenuItem.defaultProps = {
  submenuDirection: 'right'
};

export default MenuItem;

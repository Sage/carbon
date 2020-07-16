import React from 'react';
import PropTypes from 'prop-types';
import { StyledMenuWrapper, StyledMenuItemsWrapper, StyledMenuItem } from './menu.style';

const Menu = ({ menuType = 'light', children }) => {
  return (
    <StyledMenuWrapper
      data-component='menu'
      menuType={ menuType }
    >
      <StyledMenuItemsWrapper
        role='menubar'
      >
        {
          React.Children.map(
            children,
            (child) => {
              return (
                <StyledMenuItem>{
                  React.cloneElement(
                    child,
                    { menuType },
                  )
                }
                </StyledMenuItem>
              );
            }
          )
        }
      </StyledMenuItemsWrapper>
    </StyledMenuWrapper>
  );
};

Menu.propTypes = {
  /** Defines the color scheme of the component */
  menuType: PropTypes.oneOf(['light', 'dark']),
  /** Children elements */
  children: PropTypes.node
};

export default Menu;

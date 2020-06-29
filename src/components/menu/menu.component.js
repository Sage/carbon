import React from 'react';
import PropTypes from 'prop-types';
import { StyledMenuWrapper, StyledMenuItemsWrapper, StyledMenuItem } from './menu.style';

const Menu = ({ menuType, children }) => {
  return (
    <StyledMenuWrapper
      data-component='menu'
      menuType={ menuType }
    >
      <StyledMenuItemsWrapper>
        {
          React.Children.map(
            children,
            child => (
              <StyledMenuItem>{
                React.cloneElement(
                  child,
                  { menuType }
                )
              }
              </StyledMenuItem>
            )
          )
        }
      </StyledMenuItemsWrapper>
    </StyledMenuWrapper>
  );
};

Menu.propTypes = {
  /** Defines the style of the component eg. primary/secondary */
  menuType: PropTypes.oneOf(['primary', 'secondary']),
  /** Children elements */
  children: PropTypes.node
};

Menu.defaultProps = {
  menuType: 'primary'
};

export default Menu;

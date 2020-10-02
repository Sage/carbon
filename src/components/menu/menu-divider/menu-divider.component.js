import React from 'react';
import PropTypes from 'prop-types';
import StyledDivider from './menu-divider.style';

const MenuDivider = React.forwardRef(({ menuType }, ref) => (
  <StyledDivider
    data-component='menu-divider'
    menuType={ menuType }
    ref={ ref }
  />
));

MenuDivider.propTypes = {
  /**
   * menu color scheme provided by <Menu />
   * @private
   * @ignore
   *
  */
  menuType: PropTypes.oneOf(['light', 'dark'])
};

export default MenuDivider;

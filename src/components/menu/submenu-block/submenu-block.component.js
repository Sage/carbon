import React from 'react';
import PropTypes from 'prop-types';
import { StyledSubmenuBlock } from './submenu.style';

const SubmenuBlock = (props) => {
  return (
    <StyledSubmenuBlock data-component='submenu-block'>
      {React.Children.map(
        props.children,
        child => React.cloneElement(child, { menuType: props.menuType })
      )}
    </StyledSubmenuBlock>
  );
};

SubmenuBlock.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
  /** menu theme provided by <Menu /> */
  menuType: PropTypes.oneOf(['primary', 'secondary'])

};

export default SubmenuBlock;

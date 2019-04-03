import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './button.style';
import StyledNavbar from './navbar.style';
import Icon from '../../icon/icon';

const Navbar = ({
  onPreviousClick,
  onNextClick,
  ...props
}) => {
  return (
    <StyledNavbar { ...props }>
      <StyledButton
        type='button'
        onClick={ () => onPreviousClick() }
      >
        <Icon type='chevron_left' />
      </StyledButton>
      <StyledButton
        type='button'
        onClick={ () => onNextClick() }
      >
        <Icon type='chevron_right' />
      </StyledButton>
    </StyledNavbar>
  );
};

Navbar.propTypes = {
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func
};

export default Navbar;

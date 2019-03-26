import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './button.style';
import Icon from '../../icon/icon';

const Navbar = ({
  onPreviousClick,
  onNextClick,
  className
}) => {
  return (
    <div className={ className }>
      <StyledButton
        className='DayPicker-NavButton--prev'
        type='button'
        onClick={ () => onPreviousClick() }
      >
        <Icon type='chevron_left' />
      </StyledButton>
      <StyledButton
        className='DayPicker-NavButton--next'
        type='button'
        onClick={ () => onNextClick() }
      >
        <Icon type='chevron_right' />
      </StyledButton>
    </div>
  );
};

Navbar.propTypes = {
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  className: PropTypes.string
};

export default Navbar;

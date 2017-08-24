import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({
  onPreviousClick,
  onNextClick,
  className
}) => {
  return (
    <div className={ className }>
      <button
        className='DayPicker-NavButton DayPicker-NavButton--prev'
        onClick={ () => onPreviousClick() }
      >
        <span className='DayPicker-NavButton__arrow'>‹</span>
      </button>
      <button
        className='DayPicker-NavButton DayPicker-NavButton--next'
        onClick={ () => onNextClick() }
      >
        <span className='DayPicker-NavButton__arrow'>›</span>
      </button>
    </div>
  );
};

Navbar.propTypes = {
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  className: PropTypes.string
};

export default Navbar;

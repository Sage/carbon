import React from 'react';
import PropTypes from 'prop-types';

import StyledHr from './hr.style';

const Hr = ({
  mt = 3,
  mb = 3,
  ml,
  mr
}) => {
  return (
    <StyledHr
      data-component='hr'
      mt={ mt }
      mb={ mb }
      ml={ ml }
      mr={ mr }
    />
  );
};

Hr.propTypes = {
  /** Margin top, this value will be multiplied by the theme spacing constant (8) */
  mt: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  /** Margin bottom, this value will be multiplied by the theme spacing constant (8) */
  mb: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  /** Margin left, any valid css value */
  ml: PropTypes.string,
  /** Margin right, any valid css value */
  mr: PropTypes.string
};

export default Hr;

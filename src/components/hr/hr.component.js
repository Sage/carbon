import React from 'react';
import PropTypes from 'prop-types';

import StyledHr from './hr.style';
import useIsAboveBreakpoint from '../../hooks/__internal__/useIsAboveBreakpoint';

const Hr = ({
  adaptiveMxBreakpoint,
  mt = 3,
  mb = 3,
  ml,
  mr
}) => {
  const largeScreen = useIsAboveBreakpoint(adaptiveMxBreakpoint);
  let marginLeft = ml;
  let marginRight = mr;
  if (adaptiveMxBreakpoint && !largeScreen) {
    marginLeft = 0;
    marginRight = 0;
  }

  return (
    <StyledHr
      data-component='hr'
      mt={ mt }
      mb={ mb }
      ml={ marginLeft }
      mr={ marginRight }
    />
  );
};

Hr.propTypes = {
  /** Margin top, this value will be multiplied by the theme spacing constant (8) */
  mt: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  /** Margin bottom, this value will be multiplied by the theme spacing constant (8) */
  mb: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  /** Margin left, any valid css value */
  ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Margin right, any valid css value */
  mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Breakpoint for adaptive left and right margins (below the breakpoint they go to 0).
   * Enables the adaptive behaviour when set */
  adaptiveMxBreakpoint: PropTypes.number
};

export default Hr;

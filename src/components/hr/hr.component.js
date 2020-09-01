import React from 'react';
import propTypes from '@styled-system/prop-types';

import StyledHr from './hr.style';

const Hr = ({
  mt = 3,
  mb = 3,
  ...props
}) => {
  return (
    <StyledHr
      data-component='hr'
      mt={ mt }
      mb={ mb }
      { ...props }
    />
  );
};

Hr.propTypes = {
  ...propTypes.space
};

export default Hr;

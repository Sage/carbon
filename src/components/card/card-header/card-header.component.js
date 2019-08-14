import React from 'react';
import propTypes from 'prop-types';
import StyledCardHeader from './card-header.style';

const CardHeader = ({
  header,
  theme,
  ...props
}) => (
  <StyledCardHeader
    data-element='card-header'
    { ...props }
  >
    { header }
  </StyledCardHeader>
);

CardHeader.propTypes = {
  header: propTypes.string,
  theme: propTypes.object
};

export default CardHeader;

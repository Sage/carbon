import React from 'react';
import propTypes from 'prop-types';
import StyledCardDescription from './card-description.style';

const CardDescription = ({
  description,
  theme,
  ...props
}) => (
  <StyledCardDescription
    data-element='card-description'
    { ...props }
  >
    { description }
  </StyledCardDescription>
);

CardDescription.propTypes = {
  description: propTypes.string,
  theme: propTypes.object
};

export default CardDescription;

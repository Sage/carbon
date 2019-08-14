import React from 'react';
import propTypes from 'prop-types';
import StyledCardFooter from './card-footer.style';

const CardFooter = ({
  footer,
  theme,
  ...props
}) => (
  <StyledCardFooter
    data-element='card-footer'
    theme={ theme }
    { ...props }
  >
    { footer }
  </StyledCardFooter>
);

CardFooter.propTypes = {
  footer: propTypes.string,
  theme: propTypes.object
};

export default CardFooter;

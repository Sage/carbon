import React from 'react';
import propTypes from 'prop-types';
import StyledCard from './card.style';

const Card = ({ border, description, footer }) => (
  <StyledCard
    border={ border }
  >
    { description && (
      <div data-element='description'>
        { description }
      </div>
    )}
    { footer && (
      <div data-element='footer'>
        { footer }
      </div>
    )}
  </StyledCard>
);

Card.propTypes = {
  border: propTypes.bool,
  description: propTypes.string,
  footer: propTypes.string
};

export default Card;

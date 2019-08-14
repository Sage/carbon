import React from 'react';
import propTypes from 'prop-types';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardDescription,
  StyledCardFooter
} from './card.style';

const Card = ({
  border,
  description,
  footer,
  header,
  theme,
  ...props
}) => (
  <StyledCard
    border={ border }
    theme={ theme }
    { ...props }
  >
    { header && (
      <StyledCardHeader data-element='header'>
        { header }
      </StyledCardHeader>
    )}
    { description && (
      <StyledCardDescription data-element='description'>
        { description }
      </StyledCardDescription>
    )}
    { footer && (
      <StyledCardFooter
        data-element='footer'
        theme={ theme }
      >
        { footer }
      </StyledCardFooter>
    )}
  </StyledCard>
);

Card.propTypes = {
  border: propTypes.bool,
  description: propTypes.string,
  footer: propTypes.string,
  header: propTypes.string,
  theme: propTypes.object
};

export default Card;

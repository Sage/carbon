import React from 'react';
import propTypes from 'prop-types';
import StyledCard from './card.style';
import CardDescription from './card-description';
import CardHeader from './card-header';
import CardFooter from './card-footer';

const Card = ({
  border,
  description,
  footer,
  header,
  theme,
  cardWidth,
  ...props
}) => (
  <StyledCard
    data-element='card'
    border={ border }
    theme={ theme }
    cardWidth={ cardWidth }
    { ...props }
  >
    { header && (
      <CardHeader
        header={ header }
        theme={ theme }
      />
    )}
    { description && (
      <CardDescription
        description={ description }
        theme={ theme }
      />
    )}
    { footer && (
      <CardFooter
        footer={ footer }
        theme={ theme }
      />
    )}
  </StyledCard>
);

Card.propTypes = {
  border: propTypes.bool,
  description: propTypes.string,
  footer: propTypes.string,
  header: propTypes.string,
  theme: propTypes.object,
  cardWidth: propTypes.string
};

export default Card;

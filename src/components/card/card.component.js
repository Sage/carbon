import React from 'react';
import propTypes from 'prop-types';
import {
  POSITION_FOOTER,
  POSITION_HEADER,
  POSITION_MIDDLE
} from './card.const';
import StyledCard from './card.style';
import CardSection from './card-section';

const Card = ({
  border,
  middle,
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
      <CardSection
        positionType={ POSITION_HEADER }
        theme={ theme }
        primary={ header[0].title }
        secondary={ header[0].subtitle }
      />
    )
    }
    { middle && (
      <CardSection
        positionType={ POSITION_MIDDLE }
        theme={ theme }
        primary={ middle[0].primary }
        secondary={ middle[0].secondary }
        tertiary={ middle[0].tertiary }
      />
    )}
    { footer && (
      <CardSection
        positionType={ POSITION_FOOTER }
        theme={ theme }
        primary={ footer }
      />
    )}
  </StyledCard>
);

Card.propTypes = {
  border: propTypes.bool,
  middle: propTypes.array,
  footer: propTypes.string,
  header: propTypes.array,
  theme: propTypes.object,
  cardWidth: propTypes.string
};

export default Card;

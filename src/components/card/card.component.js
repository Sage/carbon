import React from 'react';
import propTypes from 'prop-types';
import {
  POSITION_FOOTER,
  POSITION_HEADER,
  POSITION_MIDDLE
} from './card.const';
import StyledCard from './card.style';
import CardPosition from './card-position';

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
      <CardPosition
        alignment={ header[0].alignment }
        positionType={ POSITION_HEADER }
        theme={ theme }
        primary={ header[0].title }
        secondary={ header[0].subtitle }
      />
    )
    }
    { middle && (
      <CardPosition
        alignment={ middle[0].alignment }
        positionType={ POSITION_MIDDLE }
        theme={ theme }
        primary={ middle[0].primary }
        secondary={ middle[0].secondary }
        tertiary={ middle[0].tertiary }
      />
    )}
    { footer && (
      <CardPosition
        alignment={ footer[0].alignment }
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

import React from 'react';
import propTypes from 'prop-types';
import StyledCardPosition from './card-position.style';
import CardSection from '../card-section/card-section.component';

const CardPosition = ({
  align,
  positionType,
  theme,
  primary,
  secondary,
  tertiary
}) => {
  return (
    <StyledCardPosition
      data-element={ positionType }
      positionType={ positionType }
      theme={ theme }
    >
      <CardSection
        align={ align }
        positionType={ positionType }
        primary={ primary }
        secondary={ secondary }
        tertiary={ tertiary }
        theme={ theme }
      />
    </StyledCardPosition>
  );
};

CardPosition.propTypes = {
  /** text alignment of the card section text */
  align: propTypes.string,
  /** position of width in the card */
  positionType: propTypes.string,
  /** theme object provided to the card */
  theme: propTypes.object,
  /** text value of the primary element */
  primary: propTypes.string,
  /** text value of the secondary element */
  secondary: propTypes.string,
  /** text value of the tertiary element */
  tertiary: propTypes.string
};

export default CardPosition;

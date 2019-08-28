import React from 'react';
import propTypes from 'prop-types';
import StyledCardPosition from './card-position.style';
import CardSection from '../card-section/card-section.component';

const CardPosition = ({
  positionType,
  size,
  ...props
}) => {
  return (
    <StyledCardPosition
      data-element={ positionType }
      positionType={ positionType }
      size={ size }
    >
      <CardSection
        positionType={ positionType }
        { ...props }
      />
    </StyledCardPosition>
  );
};

CardPosition.propTypes = {
  /** text alignment of the card section text */
  align: propTypes.string,
  /** position of width in the card */
  positionType: propTypes.string,
  /** text value of the primary element */
  primary: propTypes.string,
  /** text value of the secondary element */
  secondary: propTypes.string,
  /** text value of the tertiary element */
  tertiary: propTypes.string
};

export default CardPosition;

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
  align: propTypes.string,
  positionType: propTypes.string,
  theme: propTypes.object,
  primary: propTypes.string,
  secondary: propTypes.string,
  tertiary: propTypes.string
};

export default CardPosition;

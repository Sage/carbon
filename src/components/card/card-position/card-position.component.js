import React from 'react';
import propTypes from 'prop-types';
import StyledCardPosition from './card-position.style';
import StyledCardSection from '../card-section/card-section.style';
import {
  TEXT_TYPE_PRIMARY,
  TEXT_TYPE_SECONDARY,
  TEXT_TYPE_TERTIARY
} from '../card.const';

const CardPosition = ({
  alignment,
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
      {
        primary && (
          <StyledCardSection
            alignment={ alignment }
            data-element={ TEXT_TYPE_PRIMARY }
            positionType={ positionType }
            primary
            theme={ theme }
          >
            { primary }
          </StyledCardSection>
        )
      }
      {
        secondary && (
          <StyledCardSection
            data-element={ TEXT_TYPE_SECONDARY }
            positionType={ positionType }
            secondary
            theme={ theme }
          >
            { primary }
          </StyledCardSection>
        )
      }
      {
        tertiary && (
          <StyledCardSection
            data-element={ TEXT_TYPE_TERTIARY }
            positionType={ positionType }
            tertiary
            theme={ theme }
          >
            { primary }
          </StyledCardSection>
        )
      }
    </StyledCardPosition>
  );
};

CardPosition.propTypes = {
  alignment: propTypes.string,
  positionType: propTypes.string,
  theme: propTypes.object,
  primary: propTypes.string,
  secondary: propTypes.string,
  tertiary: propTypes.string
};

export default CardPosition;

import React from 'react';
import propTypes from 'prop-types';
import StyledCardSection from './card-section.style';
import {
  TEXT_TYPE_PRIMARY,
  TEXT_TYPE_SECONDARY,
  TEXT_TYPE_TERTIARY
} from '../card.const';

const CardSection = ({
  positionType,
  theme,
  primary,
  secondary,
  tertiary
}) => {
  return (
    <StyledCardSection
      theme={ theme }
    >
      <div
        className={ positionType }
        data-element={ positionType }
      >
        {
          primary && (
            <div className={ TEXT_TYPE_PRIMARY }>
              { primary }
            </div>
          )
        }
        {
          secondary && (
            <div className={ TEXT_TYPE_SECONDARY }>
              { secondary }
            </div>
          )
        }
        {
          tertiary && (
            <div className={ TEXT_TYPE_TERTIARY }>
              { tertiary }
            </div>
          )
        }
      </div>
    </StyledCardSection>
  );
};

CardSection.propTypes = {
  positionType: propTypes.string,
  theme: propTypes.object,
  primary: propTypes.string,
  secondary: propTypes.string,
  tertiary: propTypes.string
};

export default CardSection;

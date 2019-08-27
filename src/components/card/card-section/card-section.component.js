import React from 'react';
import propTypes from 'prop-types';
import {
  StyledCardSection,
  StyledCardContent
} from './card-section.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const { cardSection, cardTextTypes } = OptionsHelper;

const CardSection = ({
  align,
  positionType,
  primary,
  secondary,
  tertiary
}) => {
  return (
    <StyledCardSection
      data-element='cardsection'
      align={ align }
    >
      {
        primary && positionType === cardSection.header && (
          <StyledCardContent
            data-element={ `${positionType}-${cardTextTypes.primary}` }
            positionType={ positionType }
            styleType='primary'
          >
            { primary }
          </StyledCardContent>
        )
      }
      {
        secondary && positionType === cardSection.header && (
          <StyledCardContent
            data-element={ `${positionType}-${cardTextTypes.secondary}` }
            positionType={ positionType }
            styleType='secondary'
          >
            { secondary }
          </StyledCardContent>
        )
      }
      {
        primary && positionType === cardSection.middle && (
          <StyledCardContent
            data-element={ `${positionType}-${cardTextTypes.primary}` }
            positionType={ positionType }
            styleType='primary'
          >
            { primary }
          </StyledCardContent>
        )
      }
      {
        secondary && positionType === cardSection.middle && (
          <StyledCardContent
            data-element={ `${positionType}-${cardTextTypes.secondary}` }
            positionType={ positionType }
            styleType='secondary'
          >
            { secondary }
          </StyledCardContent>
        )
      }
      {
        tertiary && positionType === cardSection.middle && (
          <StyledCardContent
            data-element={ `${positionType}-${cardTextTypes.tertiary}` }
            positionType={ positionType }
            styeType='tertiary'
          >
            { tertiary }
          </StyledCardContent>
        )
      }
      {
        primary && positionType === cardSection.footer && (
          <StyledCardContent
            data-element={ `${positionType}-${cardTextTypes.primary}` }
            positionType={ positionType }
            contentType='footer'
          >
            { primary }
          </StyledCardContent>
        )
      }
    </StyledCardSection>
  );
};

CardSection.propTypes = {
  /** text alignment of the card section text */
  align: propTypes.oneOf(OptionsHelper.alignFull),
  /** position of width in the card */
  positionType: propTypes.oneOf(Object.keys(cardSection)),
  /** text value of the primary element */
  primary: propTypes.string,
  /** text value of the secondary element */
  secondary: propTypes.string,
  /** text value of the tertiary element */
  tertiary: propTypes.string
};

export default CardSection;

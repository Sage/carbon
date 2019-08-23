import React from 'react';
import propTypes from 'prop-types';
import {
  StyledCardSection,
  StyledHeaderPrimary,
  StyledHeaderSecondary,
  StyledMiddlePrimary,
  StyledMiddleSecondary,
  StyledMiddleTertiary,
  StyledFooterPrimary
} from './card-section.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const { cardSectionPositions, cardTextTypes } = OptionsHelper;

const CardSection = ({
  align,
  positionType,
  primary,
  secondary,
  tertiary,
  theme
}) => {
  return (
    <StyledCardSection
      data-element='cardsection'
      align={ align }
    >
      {
        primary && positionType === cardSectionPositions.header && (
          <StyledHeaderPrimary
            data-element={ `${positionType}-${cardTextTypes.primary}` }
            primary
            theme={ theme }
          >
            { primary }
          </StyledHeaderPrimary>
        )
      }
      {
        secondary && positionType === cardSectionPositions.header && (
          <StyledHeaderSecondary
            data-element={ `${positionType}-${cardTextTypes.secondary}` }
            secondary
            theme={ theme }
          >
            { secondary }
          </StyledHeaderSecondary>
        )
      }
      {
        primary && positionType === cardSectionPositions.middle && (
          <StyledMiddlePrimary
            data-element={ `${positionType}-${cardTextTypes.primary}` }
            primary
            theme={ theme }
          >
            { primary }
          </StyledMiddlePrimary>
        )
      }
      {
        secondary && positionType === cardSectionPositions.middle && (
          <StyledMiddleSecondary
            data-element={ `${positionType}-${cardTextTypes.secondary}` }
            secondary
            theme={ theme }
          >
            { secondary }
          </StyledMiddleSecondary>
        )
      }
      {
        tertiary && positionType === cardSectionPositions.middle && (
          <StyledMiddleTertiary
            data-element={ `${positionType}-${cardTextTypes.tertiary}` }
            tertiary
            theme={ theme }
          >
            { tertiary }
          </StyledMiddleTertiary>
        )
      }
      {
        primary && positionType === cardSectionPositions.footer && (
          <StyledFooterPrimary
            data-element={ `${positionType}-${cardTextTypes.primary}` }
            primary
            theme={ theme }
          >
            { primary }
          </StyledFooterPrimary>
        )
      }
    </StyledCardSection>
  );
};

CardSection.propTypes = {
  /** text alignment of the card section text */
  align: propTypes.oneOf(OptionsHelper.alignFull),
  /** position of width in the card */
  positionType: propTypes.oneOf(OptionsHelper.cardSectionPositions),
  /** theme object provided to the card */
  theme: propTypes.object,
  /** text value of the primary element */
  primary: propTypes.string,
  /** text value of the secondary element */
  secondary: propTypes.string,
  /** text value of the tertiary element */
  tertiary: propTypes.string
};

export default CardSection;

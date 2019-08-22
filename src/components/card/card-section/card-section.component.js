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
import {
  TEXT_TYPE_PRIMARY,
  TEXT_TYPE_SECONDARY,
  TEXT_TYPE_TERTIARY,
  POSITION_HEADER,
  POSITION_MIDDLE,
  POSITION_FOOTER
} from '../card.const';

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
        primary && positionType === POSITION_HEADER && (
          <StyledHeaderPrimary
            data-element={ `${positionType}-${TEXT_TYPE_PRIMARY}` }
            primary
            theme={ theme }
          >
            { primary }
          </StyledHeaderPrimary>
        )
      }
      {
        secondary && positionType === POSITION_HEADER && (
          <StyledHeaderSecondary
            data-element={ `${positionType}-${TEXT_TYPE_SECONDARY}` }
            secondary
            theme={ theme }
          >
            { secondary }
          </StyledHeaderSecondary>
        )
      }
      {
        primary && positionType === POSITION_MIDDLE && (
          <StyledMiddlePrimary
            data-element={ `${positionType}-${TEXT_TYPE_PRIMARY}` }
            primary
            theme={ theme }
          >
            { primary }
          </StyledMiddlePrimary>
        )
      }
      {
        secondary && positionType === POSITION_MIDDLE && (
          <StyledMiddleSecondary
            data-element={ `${positionType}-${TEXT_TYPE_SECONDARY}` }
            secondary
            theme={ theme }
          >
            { secondary }
          </StyledMiddleSecondary>
        )
      }
      {
        tertiary && positionType === POSITION_MIDDLE && (
          <StyledMiddleTertiary
            data-element={ `${positionType}-${TEXT_TYPE_TERTIARY}` }
            tertiary
            theme={ theme }
          >
            { tertiary }
          </StyledMiddleTertiary>
        )
      }
      {
        primary && positionType === POSITION_FOOTER && (
          <StyledFooterPrimary
            data-element={ `${positionType}-${TEXT_TYPE_PRIMARY}` }
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
  align: propTypes.string,
  positionType: propTypes.string,
  theme: propTypes.object,
  primary: propTypes.string,
  secondary: propTypes.string,
  tertiary: propTypes.string
};

export default CardSection;

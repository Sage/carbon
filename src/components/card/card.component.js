import React from 'react';
import propTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledCard from './card.style';
import CardPosition from './card-position';

const { cardSectionPositions } = OptionsHelper;

const Card = ({
  header,
  middle,
  footer,
  border,
  headerPrimary,
  headerSecondary,
  headerAlign,
  middlePrimary,
  middleSecondary,
  middleTertiary,
  middleAlign,
  footerPrimary,
  footerAlign,
  cardWidth,
  theme,
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
        align={ headerAlign }
        positionType={ cardSectionPositions.header }
        theme={ theme }
        primary={ headerPrimary }
        secondary={ headerSecondary }
      />
    )
    }
    { middle && (
      <CardPosition
        align={ middleAlign }
        positionType={ cardSectionPositions.middle }
        theme={ theme }
        primary={ middlePrimary }
        secondary={ middleSecondary }
        tertiary={ middleTertiary }
      />
    )}
    { footer && (
      <CardPosition
        align={ footerAlign }
        positionType={ cardSectionPositions.footer }
        theme={ theme }
        primary={ footerPrimary }
      />
    )}
  </StyledCard>
);

Card.propTypes = {
  header: propTypes.bool,
  middle: propTypes.bool,
  footer: propTypes.bool,
  border: propTypes.bool,
  headerPrimary: propTypes.string,
  headerSecondary: propTypes.string,
  headerAlign: propTypes.bool,
  middlePrimary: propTypes.string,
  middleSecondary: propTypes.string,
  middleTertiary: propTypes.string,
  middleAlign: propTypes.bool,
  footerPrimary: propTypes.string,
  footerAlign: propTypes.bool,
  theme: propTypes.object,
  cardWidth: propTypes.string
};

export default Card;

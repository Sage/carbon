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
  /** flag to indicate if a header is required */
  header: propTypes.bool,
  /** flag to indicate if a middle is required */
  middle: propTypes.bool,
  /** flag to indicate if a footer is required */
  footer: propTypes.bool,
  /** flag to indicate if a border is required */
  border: propTypes.bool,
  /** text value of the header primary element */
  headerPrimary: propTypes.string,
  /** text value of the header secondary element */
  headerSecondary: propTypes.string,
  /** text alignment of the header text */
  headerAlign: propTypes.oneOf(OptionsHelper.alignFull),
  /** text value of the middle primary element */
  middlePrimary: propTypes.string,
  /** text value of the middle secondary element */
  middleSecondary: propTypes.string,
  /** text value of the middle tertiary element */
  middleTertiary: propTypes.string,
  /** text alignment of the middle text */
  middleAlign: propTypes.oneOf(OptionsHelper.alignFull),
  /** text value of the footer primary element */
  footerPrimary: propTypes.string,
  /** text alignment of the footer text */
  footerAlign: propTypes.oneOf(OptionsHelper.alignFull),
  /** theme object provided to the card */
  theme: propTypes.object,
  /** style value for width of card */
  cardWidth: propTypes.string
};

Card.defaultProps = {
  headerAlign: 'center',
  middleAlign: 'center',
  footerAlign: 'center',
  border: false
};
export default Card;

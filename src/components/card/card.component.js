import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledCard from './card.style';
import CardPosition from './card-position';
import BaseTheme from '../../style/themes/base';

const { header, middle, footer } = OptionsHelper.cardSection;

function renderCardPosition(props, position, size) {
  if (!Object.keys(props).length) return null;
  
  return (
    <CardPosition
      positionType={ position }
      size={ size }
      { ...props }
    />
  );
}

const Card = ({
  border,
  headerProps,
  middleProps,
  footerProps,
  cardWidth,
  size,
  ...props
}) => (
  <StyledCard
    data-element='card'
    border={ border }
    cardWidth={ cardWidth }
    size={ size }
    { ...props }
  >
    { renderCardPosition(headerProps, header) }
    { renderCardPosition(middleProps, middle) }
    { renderCardPosition(footerProps, footer, size) }
  </StyledCard>
);

Card.propTypes = {
  /** flag to indicate if a header is required */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** flag to indicate if a border is required */
  border: PropTypes.bool,
  /** text value of the header primary element */
  headerProps: PropTypes.shape({
    primary: PropTypes.string,
    /** text value of the header secondary element */
    secondary: PropTypes.string,
    /** text alignment of the header text */
    align: PropTypes.oneOf(OptionsHelper.alignFull)
  }),
  middleProps: PropTypes.shape({
    primary: PropTypes.string,
    /** text value of the middle secondary element */
    secondary: PropTypes.string,
    /** text value of the middle tertiary element */
    tertiary: PropTypes.string,
    /** text alignment of the middle text */
    align: PropTypes.oneOf(OptionsHelper.alignFull)
  }),
  footerProps: PropTypes.shape({
    /** text value of the footer primary element */
    primary: PropTypes.string,
    /** text alignment of the footer text */
    align: PropTypes.oneOf(OptionsHelper.alignFull)
  }),
  theme: PropTypes.object,
  /** style value for width of card */
  cardWidth: PropTypes.string
};

Card.defaultProps = {
  size: OptionsHelper.sizesRestricted[1],
  headerProps: { align: 'center' },
  middleProps: { align: 'center' },
  footerProps: { align: 'center' },
  border: false,
  theme: BaseTheme
};
export default Card;

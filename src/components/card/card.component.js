import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledCard from './card.style';
import CardPosition from './card-position';
import BaseTheme from '../../style/themes/base';

const { cardSection } = OptionsHelper;

// check if props empty for bool flags

function hasProps(props) {
  return Object.keys(props).length;
}

const Card = ({
  border,
  headerProps,
  middleProps,
  footerProps,
  cardWidth,
  ...props
}) => (
  <StyledCard
    data-element='card'
    border={ border }
    cardWidth={ cardWidth }
    { ...props }
  >
    { hasProps(headerProps) && (
      <CardPosition
        { ...headerProps }
        positionType={ cardSection.header }
      />
    )
    }
    { hasProps(middleProps) && (
      <CardPosition
        { ...middleProps }
        positionType={ cardSection.middle }
      />
    )}
    { hasProps(footerProps) && (
      <CardPosition
        { ...footerProps }
        positionType={ cardSection.footer }
      />
    )}
  </StyledCard>
);

Card.propTypes = {
  /** flag to indicate if a header is required */
  header: PropTypes.bool,
  /** flag to indicate if a middle is required */
  middle: PropTypes.bool,
  /** flag to indicate if a footer is required */
  footer: PropTypes.bool,
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
  headerProps: { align: 'center' },
  middleProps: { align: 'center' },
  footerProps: { align: 'center' },
  border: false,
  theme: BaseTheme
};
export default Card;

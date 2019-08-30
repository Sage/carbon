import React from 'react';
import PropTypes from 'prop-types';
import StyledCardContent from './card-content.style';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

const CardContent = ({
  align,
  children,
  positionType,
  textType,
  ...props
}) => (
  <StyledCardContent
    data-element={ `${positionType}-card-content` }
    align={ align }
    positionType={ positionType }
    textType={ textType }
    { ...props }
  >
    { children }
  </StyledCardContent>
);

const { alignFull, cardSection, cardTextTypes } = OptionsHelper;

CardContent.propTypes = {
  /** text alignment of the card section text */
  align: PropTypes.oneOf(alignFull),
  /** applies styling based on the content's row position */
  positionType: PropTypes.oneOf(cardSection).isRequired,
  /** children of the content component */
  children: PropTypes.node,
  /** Add text styling based on type */
  textType: PropTypes.oneOf(cardTextTypes)
};

CardContent.defaultProps = {
  align: 'center'
};

export default CardContent;

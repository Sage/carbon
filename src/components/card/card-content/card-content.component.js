import React from 'react';
import PropTypes from 'prop-types';
import StyledCardContent from './card-content.style';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

const CardContent = ({
  align,
  children,
  positionType,
  ...props
}) => {
  return (
    <StyledCardContent
      data-element={ `${positionType}-card-content` }
      align={ align }
      positionType={ positionType }
      { ...props }
    >
      { children }
    </StyledCardContent>
  );
};

CardContent.propTypes = {
  /** text alignment of the card section text */
  align: PropTypes.oneOf(OptionsHelper.alignFull),
  positionType: PropTypes.oneOf(OptionsHelper.cardSection),
  /** text value of the primary element */
  children: PropTypes.node
};


CardContent.defaultProps = {
  align: 'center'
};

export default CardContent;

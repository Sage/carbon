import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';
import StyledCardFooter from './card-footer.style';

const { sizesRestricted } = OptionsHelper;

const CardFooter = ({
  footerFilled,
  spacing,
  children
}) => {
  return (
    <StyledCardFooter
      key='card-footer'
      data-element='card-footer'
      footerFilled={ footerFilled }
      marginSize={ spacing }
      positionType='footer'
    >
      { children }
    </StyledCardFooter>
  );
};

CardFooter.propTypes = {
  footerFilled: PropTypes.bool,
  /** size of card for applying padding (small | medium | large) */
  spacing: PropTypes.oneOf(sizesRestricted),
  children: PropTypes.node.isRequired
};

CardFooter.defaultProps = {
  spacing: OptionsHelper.sizesRestricted[1]
};
export default CardFooter;

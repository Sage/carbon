import React from 'react';
import PropTypes from 'prop-types';
import StyledCardRow from './card-row.style';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

const CardRow = ({
  children,
  inline,
  spacing,
  ...props
}) => {
  return (
    <StyledCardRow
      data-element='card-row'
      inline={ inline }
      spacing={ spacing }
      { ...props }
    >
      { children }
    </StyledCardRow>
  );
};

CardRow.propTypes = {
  children: PropTypes.node.isRequired,
  /** size of card for applying margin (small | medium | large) */
  spacing: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** display card content inline */
  inline: PropTypes.bool
};

export default CardRow;

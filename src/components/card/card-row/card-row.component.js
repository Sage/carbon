import React from 'react';
import PropTypes from 'prop-types';
import StyledCardRow from './card-row.style';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

const CardRow = ({
  children,
  footerFilled,
  inline,
  positionType,
  size,
  ...props
}) => {
  const rowChildren = React.Children.map(children, (child, index) => {
    if (!child) return null;

    const key = child.key || `card-content-${index}`;
    return React.cloneElement(child, { key, ...child.props });
  });

  return (
    <StyledCardRow
      data-element={ `card-row-${positionType}` }
      footerFilled={ footerFilled }
      inline={ inline }
      positionType={ positionType }
      marginSize={ size }
      { ...props }
    >
      { rowChildren }
    </StyledCardRow>
  );
};

CardRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  /** position of width in the card */
  positionType: PropTypes.string,
  /** size of card for applying padding (small | medium | large) */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** display card content inline */
  inline: PropTypes.bool,
  /** prop to set background of footer */
  footerFilled: PropTypes.bool
};

export default CardRow;

import React from 'react';
import PropTypes from 'prop-types';
import StyledCardRow from './card-row.style';
import CardContent from '../card-content';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

const CardRow = ({
  positionType,
  children,
  size,
  ...props
}) => {
  const rowChildren = React.Children.map(children, (child, index) => {
    if (!child) return null;
    if (child.type.displayName === 'CardContent') return React.cloneElement(child, { ...child.props });
    console.log(child.type.displayName);

    const {
      align, inline, positon, ...rest
    } = child.props;
    const key = child.key || `card-content-${index + 1}`;
    return (
      <CardContent
        key={ key }
        align={ align }
        inline={ inline }
        positionType={ positionType }
      >
        { React.cloneElement(child, { ...rest }) }
      </CardContent>
    );
  });

  return (
    <StyledCardRow
      data-element={ `card-row-${positionType}` }
      positionType={ positionType }
      size={ size }
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
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted)
};

export default CardRow;

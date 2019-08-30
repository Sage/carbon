import React from 'react';
import PropTypes from 'prop-types';
import StyledCardRow from './card-row.style';
import CardContent from '../card-content';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

const CardRow = ({
  children,
  footerFilled,
  inlineRow,
  positionType,
  size,
  ...props
}) => {
  const rowChildren = React.Children.map(children, (child, index) => {
    if (!child) return null;

    const key = child.key || `card-content-${String(index)}`;
    console.log('align', child.props.align);
    if (child.type.displayName === 'CardContent') return React.cloneElement(child, { key, ...child.props });

    const {
      align,
      inline,
      positon,
      ...rest
    } = child.props;
    console.log(align);
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
      footerFilled={ footerFilled }
      inlineRow={ inlineRow }
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
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** display card content inline */
  inlineRow: PropTypes.bool,
  /** prop to set background of footer */
  footerFilled: PropTypes.bool
};

export default CardRow;

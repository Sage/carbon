import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledCard from './card.style';
import CardRow from './card-row';
import BaseTheme from '../../style/themes/base';

const { cardSection } = OptionsHelper;

const Card = ({
  border,
  cardRows,
  cardWidth,
  padding,
  ...props
}) => {
  const renderCardRows = () => {
    return cardRows.map((row, index) => {
      const { positionType, content } = row;

      if (!positionType || !content || !content.length) return null;

      // if ()

      return positionType === cardSection[index] && (
        <CardRow
          key={ `card-row-${index + 1}` }
          positionType={ positionType }
          size={ padding }
          { ...props }
        >
          { content }
        </CardRow>
      );
    });
  };

  return (
    <StyledCard
      data-element='card'
      border={ border }
      cardWidth={ cardWidth }
      size={ padding }
      { ...props }
    >
      { cardRows && renderCardRows() }
    </StyledCard>
  );
};

Card.propTypes = {
  /** size of card for applying padding (small | medium | large) */
  padding: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** flag to indicate if a border is required */
  border: PropTypes.bool,
  draggable: PropTypes.bool,
  clickable: PropTypes.bool,
  cardRows: PropTypes.arrayOf(
    PropTypes.shape({
      positionType: PropTypes.oneOf(OptionsHelper.cardSection),
      content: PropTypes.arrayOf(PropTypes.node)
    })
  ),
  theme: PropTypes.object,
  /** style value for width of card */
  cardWidth: PropTypes.string
};

Card.defaultProps = {
  padding: OptionsHelper.sizesRestricted[1],
  border: false,
  theme: BaseTheme
};
export default Card;

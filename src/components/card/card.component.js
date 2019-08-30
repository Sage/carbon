import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledCard from './card.style';
import CardRow from './card-row';
import BaseTheme from '../../style/themes/base';

const { cardSection, sizesRestricted } = OptionsHelper;

const Card = ({
  border,
  cardRows,
  cardWidth,
  footerFilled,
  padding,
  ...props
}) => {
  const renderCardRows = () => {
    return cardRows.map((row, index) => {
      const {
        positionType, content, inline, ...rowProps
      } = row;

      if (!positionType || !content || !content.length) return null;

      return positionType === cardSection[index] && (
        <CardRow
          key={ `card-row-${String(index)}` }
          footerFilled={ footerFilled }
          inlineRow={ inline }
          positionType={ positionType }
          size={ padding }
          { ...rowProps }
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
  padding: PropTypes.oneOf(sizesRestricted),
  /** flag to indicate if a border is required */
  border: PropTypes.bool,
  /** flag to indicate if card is draggable */
  draggable: PropTypes.bool,
  /** flag to indicate if card is interactive */
  clickable: PropTypes.bool,
  /** card rows with content */
  cardRows: PropTypes.arrayOf(
    PropTypes.shape({
      positionType: PropTypes.oneOf(cardSection).isRequired,
      content: PropTypes.arrayOf(PropTypes.node).isRequired,
      inline: PropTypes.bool
    })
  ),
  footerFilled: PropTypes.bool,
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

import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledCard from './card.style';
import Icon from '../icon';
import CardRow from './card-row';
import BaseTheme from '../../style/themes/base';

const { cardSection, sizesRestricted } = OptionsHelper;

const Card = ({
  action,
  border,
  cardRows,
  cardWidth,
  clickable,
  draggable,
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

  const handleClick = (ev) => {
    if (clickable && !draggable && action) {
      action(ev);
    }
  };

  return (
    <StyledCard
      data-element='card'
      border={ border }
      cardWidth={ cardWidth }
      clickable={ clickable }
      draggable={ draggable }
      onlick={ handleClick }
      size={ padding }
      { ...props }
    >
      { draggable && <Icon type='drag' />}
      { cardRows && renderCardRows() }
    </StyledCard>
  );
};

Card.propTypes = {
  /** action to be executed when card is clicked or enter pressed */
  action: PropTypes.func,
  /** flag to indicate if a border is required */
  border: PropTypes.bool,
  /** style value for width of card */
  cardWidth: PropTypes.string,
  /** card rows with content */
  cardRows: PropTypes.arrayOf(
    PropTypes.shape({
      positionType: PropTypes.oneOf(cardSection).isRequired,
      content: PropTypes.arrayOf(PropTypes.node).isRequired,
      inline: PropTypes.bool
    })
  ),
  /** flag to indicate if card is interactive */
  clickable: PropTypes.bool,
  /** flag to indicate if card is draggable */
  draggable: PropTypes.bool,
  footerFilled: PropTypes.bool,
  /** size of card for applying padding (small | medium | large) */
  padding: PropTypes.oneOf(sizesRestricted),
  theme: PropTypes.object
};

Card.defaultProps = {
  border: false,
  padding: OptionsHelper.sizesRestricted[1],
  theme: BaseTheme
};
export default Card;

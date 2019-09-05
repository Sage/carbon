import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledCard from './card.style';
import Icon from '../icon';
import BaseTheme from '../../style/themes/base';

const { sizesRestricted } = OptionsHelper;

const Card = ({
  action,
  border,
  children,
  cardFooter,
  cardWidth,
  clickable,
  draggable,
  footerFilled,
  spacing,
  ...props
}) => {
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
      spacing={ spacing }
      { ...props }
    >
      { draggable && <Icon type='drag' />}
      { children }
    </StyledCard>
  );
};

Card.propTypes = {
  /** action to be executed when card is clicked or enter pressed */
  action: PropTypes.func,
  /** flag to indicate if a border is required */
  border: PropTypes.bool,
  children: PropTypes.node.isRequired,
  /** style value for width of card */
  cardWidth: PropTypes.string,
  cardFooter: PropTypes.node,
  /** flag to indicate if card is interactive */
  clickable: PropTypes.bool,
  /** flag to indicate if card is draggable */
  draggable: PropTypes.bool,
  footerFilled: PropTypes.bool,
  /** size of card for applying padding (small | medium | large) */
  spacing: PropTypes.oneOf(sizesRestricted),
  theme: PropTypes.object
};

Card.defaultProps = {
  border: false,
  spacing: OptionsHelper.sizesRestricted[1],
  theme: BaseTheme
};
export default Card;

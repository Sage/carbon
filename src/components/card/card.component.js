import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledCard from './card.style';
import Icon from '../icon';
import BaseTheme from '../../style/themes/base';

const { sizesRestricted } = OptionsHelper;

const Card = ({
  action,
  children,
  cardWidth,
  clickable,
  draggable,
  spacing,
  ...props
}) => {
  const handleClick = (ev) => {
    if (clickable && !draggable && action) {
      action(ev);
    }
  };

  const renderChildren = () => {
    return React.Children.map(children, child => React.cloneElement(child, { spacing }));
  };

  return (
    <StyledCard
      data-element='card'
      cardWidth={ cardWidth }
      clickable={ clickable }
      draggable={ draggable }
      onlick={ handleClick }
      spacing={ spacing }
      { ...props }
    >
      { draggable && <Icon type='drag' />}
      { renderChildren() }
    </StyledCard>
  );
};

Card.propTypes = {
  /** action to be executed when card is clicked or enter pressed */
  action: PropTypes.func,
  children: PropTypes.node.isRequired,
  /** style value for width of card */
  cardWidth: PropTypes.string,
  /** flag to indicate if card is interactive */
  clickable: PropTypes.bool,
  /** flag to indicate if card is draggable */
  draggable: PropTypes.bool,
  /** size of card for applying padding (small | medium | large) */
  spacing: PropTypes.oneOf(sizesRestricted),
  theme: PropTypes.object
};

Card.defaultProps = {
  spacing: OptionsHelper.sizesRestricted[1],
  theme: BaseTheme
};
export default Card;

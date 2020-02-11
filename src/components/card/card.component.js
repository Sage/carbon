import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledCard from './card.style';
import Icon from '../icon';

const { sizesRestricted } = OptionsHelper;

const Card = ({
  action,
  children,
  cardWidth,
  interactive,
  draggable,
  spacing
}) => {
  const handleClick = (ev) => {
    if (!draggable && action) {
      action(ev);
    }
  };

  const renderChildren = () => {
    return React.Children.map(children, child => React.cloneElement(child, { spacing }));
  };

  const onClickHandler = (interactive) ? handleClick : null;

  return (
    <StyledCard
      data-component='card'
      cardWidth={ cardWidth }
      interactive={ interactive }
      draggable={ draggable }
      spacing={ spacing }
      type='button'
      onClick={ onClickHandler }
      tabIndex={ 0 }
    >
      { draggable && <Icon type='drag' />}
      { renderChildren() }
    </StyledCard>
  );
};
Card.defaultProps = {
  spacing: 'medium'
};

Card.propTypes = {
  /** action to be executed when card is clicked or enter pressed */
  action: PropTypes.func,
  children: PropTypes.node.isRequired,
  /** style value for width of card */
  cardWidth: PropTypes.string,
  /** flag to indicate if card is interactive */
  interactive: PropTypes.bool,
  /** flag to indicate if card is draggable */
  draggable: PropTypes.bool,
  /** size of card for applying padding (small | medium | large) */
  spacing: PropTypes.oneOf(sizesRestricted)
};

export default Card;

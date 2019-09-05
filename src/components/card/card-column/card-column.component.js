import React from 'react';
import PropTypes from 'prop-types';
import StyledCardColumn from './card-column.style';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

const CardColumn = ({
  align,
  children,
  type,
  ...props
}) => (
  <StyledCardColumn
    align={ align }
    data-element={ `${type.position}-card-column` }
    position={ type.position }
    contentStyle={ type.contentStyle }
    { ...props }
  >
    { children }
  </StyledCardColumn>
);

const { alignFull, cardSection, cardTextTypes } = OptionsHelper;

CardColumn.propTypes = {
  /** text alignment of the card section text */
  align: PropTypes.oneOf(alignFull),
  type: PropTypes.shape({
    /** applies styling based on the content's row position */
    position: PropTypes.oneOf(cardSection).isRequired,
    /** add text styling based on type */
    contentStyle: PropTypes.oneOf(cardTextTypes).isRequired
  }),
  /** children of the content component */
  children: PropTypes.node
};

CardColumn.defaultProps = {
  align: 'center',
  type: {
    position: 'middle',
    contentStyle: 'primary'
  }
};

export default CardColumn;

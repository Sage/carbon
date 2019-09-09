import React from 'react';
import PropTypes from 'prop-types';
import StyledCardColumn from './card-column.style';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

const CardColumn = ({
  align,
  children,
  ...props
}) => (
  <StyledCardColumn
    align={ align }
    data-element='card-column'
    { ...props }
  >
    { children }
  </StyledCardColumn>
);

const { alignFull } = OptionsHelper;

CardColumn.propTypes = {
  /** text alignment of the card section text */
  align: PropTypes.oneOf(alignFull),
  /** children of the content component */
  children: PropTypes.node
};

CardColumn.defaultProps = {
  align: 'center'
};

export default CardColumn;

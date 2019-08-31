import React from 'react';
import PropTypes from 'prop-types';
import StyledCardContent from './card-content.style';
import OptionsHelper from '../../../utils/helpers/options-helper/options-helper';

const CardContent = ({
  align,
  children,
  type,
  ...props
}) => (
  <StyledCardContent
    align={ align }
    data-element={ `${type.position}-card-content` }
    position={ type.position }
    contentStyle={ type.contentStyle }
    { ...props }
  >
    { children }
  </StyledCardContent>
);

const { alignFull, cardSection, cardTextTypes } = OptionsHelper;

CardContent.propTypes = {
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

CardContent.defaultProps = {
  align: 'center',
  type: {
    position: 'middle',
    contentStyle: 'primary'
  }
};

export default CardContent;

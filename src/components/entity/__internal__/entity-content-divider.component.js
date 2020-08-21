import React from 'react';
import PropTypes from 'prop-types';

import { StyledEntityContentDivider } from './entity.style';

const EntityContentDivider = ({ ml = 2, mr = 2 }) => (
  <StyledEntityContentDivider
    data-element='entity-content-divider'
    mr={ mr }
    ml={ ml }
  />
);

EntityContentDivider.propTypes = {
  /** Margin right, given number will be multiplied by base spacing unit (8) */
  mr: PropTypes.number,
  /** Margin left, given number will be multiplied by base spacing unit (8) */
  ml: PropTypes.number
};

export default EntityContentDivider;

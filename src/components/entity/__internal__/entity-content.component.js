import React from 'react';
import PropTypes from 'prop-types';

import { StyledEntityContent } from './entity.style';

const EntityContent = ({ children }) => (
  <StyledEntityContent data-element='entity-content'>
    {children}
  </StyledEntityContent>
);

EntityContent.propTypes = {
  /** Elements to be rendered as a content of EntityContent line */
  children: PropTypes.node.isRequired
};

export default EntityContent;

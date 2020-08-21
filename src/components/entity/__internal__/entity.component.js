import React from 'react';
import PropTypes from 'prop-types';

import { StyledEntity } from './entity.style';

const Entity = ({ header, content }) => (
  <StyledEntity data-component='entity'>
    {header}
    {content}
  </StyledEntity>
);

Entity.propTypes = {
  /** Header of the Entity component */
  header: PropTypes.node,
  /** Content of the Entity component */
  content: PropTypes.node
};

export default Entity;

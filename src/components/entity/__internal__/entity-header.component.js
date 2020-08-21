import React from 'react';
import PropTypes from 'prop-types';

import { StyledEntityHeader, StyledEntityHeaderContainer } from './entity.style';

const EntityHeader = ({
  fontSize = 16, title, adornments, menu
}) => {
  return (
    <StyledEntityHeaderContainer data-element='entity-header'>
      <StyledEntityHeader fontSize={ fontSize }>{title}</StyledEntityHeader>
      {adornments}
      {menu}
    </StyledEntityHeaderContainer>
  );
};

EntityHeader.propTypes = {
  /** Entity title  */
  title: PropTypes.string,
  /** Title font-size */
  fontSize: PropTypes.oneOf([14, 16]),
  /** Additional adornments like Icon or Pill components to be rendered next to title  */
  adornments: PropTypes.node,
  /** ActionPopover to be rendered on the far right side of EntityHeader   */
  menu: PropTypes.node
};

export default EntityHeader;

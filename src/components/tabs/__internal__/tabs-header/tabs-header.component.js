import React from 'react';
import PropTypes from 'prop-types';
import StyledTabsHeader from './tabs-header.style';

const TabsHeader = ({
  align = 'left', children, position = 'top', role
}) => {
  return (
    <StyledTabsHeader
      align={ align }
      position={ position }
      role={ role }
    >
      {children}
    </StyledTabsHeader>
  );
};

TabsHeader.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'left']),
  role: PropTypes.string
};

export default TabsHeader;

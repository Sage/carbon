import React from 'react';
import PropTypes from 'prop-types';
import StyledTabsHeader from './tabs-header.style';

const TabsHeader = ({ align, children, position }) => {
  return (
    <StyledTabsHeader
      align={ align } position={ position }
      role='tablist'
    >
      {children}
    </StyledTabsHeader>
  );
};

TabsHeader.defaultProps = {
  align: 'left'
};

TabsHeader.propTypes = {
  align: PropTypes.string,
  children: PropTypes.any, // TODO: wywalic to any
  position: PropTypes.string
};

export default TabsHeader;

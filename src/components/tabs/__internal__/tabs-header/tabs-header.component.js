import React from 'react';
import PropTypes from 'prop-types';
import StyledTabsHeader from './tabs-header.style';

const TabsHeader = ({
  align = 'left',
  children,
  position = 'top',
  role,
  extendedLine,
  alternateStyling,
  noRightBorder = false,
  hasCustomTarget = false
}) => {
  return (
    <StyledTabsHeader
      align={ align }
      position={ position }
      role={ role }
      extendedLine={ extendedLine }
      alternateStyling={ alternateStyling }
      noRightBorder={ noRightBorder }
      hasCustomTarget={ hasCustomTarget }
    >
      {children}
    </StyledTabsHeader>
  );
};

TabsHeader.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'left']),
  role: PropTypes.string,
  extendedLine: PropTypes.bool,
  alternateStyling: PropTypes.bool,
  noRightBorder: PropTypes.bool,
  hasCustomTarget: PropTypes.bool
};

export default TabsHeader;

import React from 'react';
import PropTypes from 'prop-types';
import StyledTabsHeader from './tabs-header.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const TabsHeader = ({
  align, children, position, role
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

TabsHeader.defaultProps = {
  align: 'left',
  position: 'top'
};

TabsHeader.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'left']),
  role: PropTypes.string
};

export default TabsHeader;

import React from 'react';
import PropTypes from 'prop-types';
import StyledTabsHeader from './tabs-header.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

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
  align: 'left',
  position: 'top'
};

TabsHeader.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'left'])
};

export default TabsHeader;

import React from 'react';
import PropTypes from 'prop-types';
import StyledTabsHeader from './tabs-header.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const TabsHeader = ({
  align, children, position, isTabSelected
}) => {
  return (
    // <StyledTabsHeader
    //   align={ align } position={ position }
    //   role='tablist'
    // >
    //   {children.map((header, index) => {
    //     const tabRefs = [];
    //     const ref = `${header.props.tabId}-tab`;
    //     tabRefs.push(ref);

    //     return (
    //       <TabHeader
    //         position={ this.props.position }
    //         isTabSelected={ isTabSelected }
    //         title={ header.props.title }
    //         // className={ this.tabHeaderClasses(child) }
    //         tabId={ header.props.tabId }
    //         id={ ref }
    //         key={ ref }
    //         onClick={ this.handleTabClick }
    //         // onKeyDown={ this.handleKeyDown(index) }
    //         role='tab'
    //         // tabIndex={ this.isTabSelected(child.props.tabId) ? '0' : '-1' }
    //       />
    //     );
    //   })}
    // </StyledTabsHeader>
    null
  );
};

TabsHeader.defaultProps = {
  align: 'left',
  position: 'horizontal'
};

TabsHeader.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(OptionsHelper.orientation),
  isTabSelected: PropTypes.bool
};

export default TabsHeader;

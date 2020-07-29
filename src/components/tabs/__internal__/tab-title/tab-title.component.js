import React from 'react';
import PropTypes from 'prop-types';
import StyledTabTitle from './tab-title.style';
import tagComponent from '../../../../utils/helpers/tags/tags';

const TabTitle = React.forwardRef(({
  isTabSelected,
  dataTabId,
  title,
  position = 'top',
  tabHasError,
  tabHasWarning,
  ...tabTitleProps
}, ref) => {
  return (
    <StyledTabTitle
      ref={ ref }
      aria-selected={ isTabSelected }
      data-element='select-tab'
      data-tabid={ dataTabId }
      role='tab'
      position={ position }
      isTabSelected={ isTabSelected }
      tabHasError={ tabHasError }
      tabHasWarning={ tabHasWarning }
      { ...tabTitleProps }
      { ...tagComponent('tab-header', tabTitleProps) }
    >
      { title }
    </StyledTabTitle>
  );
});

TabTitle.propTypes = {
  title: PropTypes.string.isRequired,
  isTabSelected: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'left']),
  className: PropTypes.string,
  dataTabId: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabIndex: PropTypes.string,
  tabHasError: PropTypes.bool,
  tabHasWarning: PropTypes.bool
};

export default TabTitle;

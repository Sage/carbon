/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import StyledTabTitle from './tab-title.style';
import tagComponent from '../../../utils/helpers/tags';

class TabTitle extends React.Component {
  render() {
    const {
      isTabSelected, dataTabId, title, ...tabTitleProps
    } = this.props;

    return (
      <StyledTabTitle
        aria-selected={ isTabSelected }
        data-element='select-tab'
        data-tabid={ dataTabId }
        role='tab'
        isTabSelected={ isTabSelected }
        { ...tabTitleProps }
        { ...tagComponent('tab-header', this.props) }
      >
        {title}
      </StyledTabTitle>
    );
  }
}

TabTitle.defaultProps = {
  position: 'top'
};

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

/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import StyledTabTitle from './tab-title.style';
import tagComponent from '../../../utils/helpers/tags';

class TabTitle extends React.Component {
  render() {
    const {
      isTabSelected,
      className,
      dataTabId,
      id,
      onClick,
      onKeyDown,
      tabIndex,
      position,
      title,
      tabHasError,
      tabHasWarning,
      ...props
    } = this.props;

    return (
      <StyledTabTitle
        aria-selected={ isTabSelected }
        className={ className }
        data-element='select-tab'
        data-tabid={ dataTabId }
        id={ id }
        onClick={ onClick }
        onKeyDown={ onKeyDown }
        role='tab'
        tabIndex={ tabIndex }
        position={ position }
        isTabSelected={ isTabSelected }
        tabHasError={ tabHasError }
        tabHasWarning={ tabHasWarning }
        { ...tagComponent('tab-header', props) }
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

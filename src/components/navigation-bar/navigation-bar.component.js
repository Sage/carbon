import React from 'react';
import PropTypes from 'prop-types';
import AppWrapper from '../app-wrapper/app-wrapper';
import StyledNavigationBar from './navigation-bar.style';

const NavigationBar = ({
  navigationType = 'light',
  isLoading = false,
  children,
  ariaLabel
}) => {
  return (
    <StyledNavigationBar
      role='navigation'
      aria-label={ ariaLabel }
      navigationType={ navigationType }
      data-component='navigation-bar'
    >
      <AppWrapper className='carbon-navigation-bar__content'>
        {!isLoading && children }
      </AppWrapper>
    </StyledNavigationBar>
  );
};

NavigationBar.propTypes = {
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
  /** color scheme of navigation component */
  navigationType: PropTypes.oneOf(['light', 'dark']),
  /** if 'true' the children will not be visible */
  isLoading: PropTypes.bool
};

export default NavigationBar;

import React from 'react';
import PropTypes from 'prop-types';
import AppWrapper from '../app-wrapper/app-wrapper';
import StyledNavigationBar from './navigation-bar.style';

const NavigationBar = ({ navigationType = 'light', children, ariaLabel }) => {
  return (
    <StyledNavigationBar
      role='navigation'
      aria-label={ ariaLabel }
      navigationType={ navigationType }
      data-component='navigation-bar'
    >
      <AppWrapper className='carbon-navigation-bar__content'>
        { children }
      </AppWrapper>
    </StyledNavigationBar>
  );
};

NavigationBar.propTypes = {
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
  navigationType: PropTypes.oneOf(['light', 'dark'])
};

export default NavigationBar;

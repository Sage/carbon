import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../stores/app';
import BrowserStore from './../../stores/browser';
import classNames from 'classnames';

import AppSidebar from './app-sidebar';
import AppFooter from './app-footer'
import Navbar from './navbar';

const RESIZE_WIDTH = 1024;

class Chrome extends React.Component {
  classes = () => {
    let tablet = this._isSmallScreen();
    return classNames("chrome", {
      "chrome--desktop": !tablet,
      "chrome--tablet": tablet
    });
  }

  render() {
    return (
      <div className={ this.classes() }>

        <AppSidebar
          className='chrome__menu'
          isTablet={ this._isSmallScreen() }
          menuOpen={ this.state.appStore.get('menuOpen') }
        />

        <div className='chrome__content'>
          <Navbar isTablet={ this._isSmallScreen() } />
            { this.props.children }
          <AppFooter />
        </div>

      </div>
    );
  }

  _isSmallScreen = () => {
    return this.state.browserStore.get('width') <= RESIZE_WIDTH;
  }
}

export default connect(Chrome, [ BrowserStore, AppStore ]);

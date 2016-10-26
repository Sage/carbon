import React from 'react';
import { connect } from 'utils/flux';
import BrowserStore from './../../stores/browser';
import classNames from 'classnames';

import AppSidebar from './app-sidebar';
import AppFooter from './app-footer'
import Navbar from './navbar';

const RESIZE_WIDTH = 1024;

class Chrome extends React.Component {
  classes = () => {
    let tablet = this._isSmallScreen();
    return classNames("carbon-demo", {
      "carbon-demo--desktop": !tablet,
      "carbon-demo--tablet": tablet
    });
  }

  render() {
    return (
      <div className={ this.classes() }>
        <AppSidebar isTablet={ this._isSmallScreen() } />

        <div className='carbon-demo__content'>
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

export default connect(Chrome, BrowserStore);

import classNames from 'classnames';
import React from 'react';

// Flux
import { connect } from 'utils/flux';
import BrowserStore from '../../stores/browser';
import DemoStore from '../../stores/demo';

// Demo
import Footer from './footer'
import Header from './header';
import Menu from './menu';

const RESIZE_WIDTH = 1040;

class Chrome extends React.Component {
  render() {
    return (
      <div className='chrome'>
        <Menu
          isTablet={ this._isSmallScreen() }
          menuOpen={ this.state.appStore.get('menuOpen') }
        />
        <Header />
        { this.props.children }
        <Footer />
      </div>
    );
  }

  _isSmallScreen = () => {
    return this.state.browserStore.get('width') <= RESIZE_WIDTH;
  }
}

export default connect(Chrome, [ BrowserStore, DemoStore ]);

import classNames from 'classnames';
import React from 'react';

// Flux
import { connect } from 'utils/flux';
import BrowserStore from '../../stores/browser';
import DemoStore from '../../stores/demo';

// Demo
import Footer from './footer';
import Header from './header';
import Menu from './menu';
import './chrome.scss';

const RESIZE_WIDTH = 1040;

class Chrome extends React.Component {
  render() {
    var page_url = this.props.location.pathname.split('/');
    var page_class_name = page_url[page_url.length -1]

    return (
      <div className={ 'page-' + page_class_name + ' chrome' }>
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

import React from 'react';
import { connect } from 'utils/flux';
import BrowserStore from './../../stores/browser';
import { Link } from 'react-router';

import StaticSidebar from './../../components/static-sidebar';
import { Sidebar } from 'components/sidebar';

const RESIZE_WIDTH = 1024;

class Chrome extends React.Component {

  sidebarContent = () => {
    return 'Sidebar Stuff';
  }

  fullWidth = () => {
    return (
      <StaticSidebar>
        { this.sidebarContent() }
      </StaticSidebar>
    )
  }

  smallWidth = () => {
    return (
      <Sidebar position='left' open={ true }>
        { this.sidebarContent() }
      </Sidebar>
    )
  }

  /**
   * @method render
   */
  render() {
    let contentWrapper = this.fullWidth();

    if (this._isSmallScreen()) {
      contentWrapper = this.smallWidth();
    }

    return (
      <div className='carbon-demo'>
        { contentWrapper }
        <div className='carbon-demo__content'>
        </div>
      </div>
    );
  }

  _isSmallScreen = () => {
    return this.state.browserStore.get('width') <= RESIZE_WIDTH;
  }
}

export default connect(Chrome, BrowserStore);

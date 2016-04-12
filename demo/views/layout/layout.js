import React from 'react';
import RowDemo from './row-demo';
import TabsDemo from './tabs-demo';
import PodDemo from './pod-demo';
import TileDemo from './tile-demo';

class Layout extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Layout</h1>
        <RowDemo />
        <TabsDemo />
        <PodDemo />
        <PodDemo collapsed={ true }/>
        <TileDemo />
      </div>
    );
  }
}

export default Layout;

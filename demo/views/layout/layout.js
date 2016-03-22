import React from 'react';
import RowDemo from './row-demo';
import TabsDemo from './tabs-demo';

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
      </div>
    );
  }
}

export default Layout;

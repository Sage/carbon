import React from 'react';
import RowDemo from './row-demo';
import PodDemo from './pod-demo';

class Layout extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Layout</h1>
        <RowDemo />
        <PodDemo />
        <PodDemo collapsed={ true }/>
      </div>
    );
  }
}

export default Layout;

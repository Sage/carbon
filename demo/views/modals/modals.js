import React from 'react';
import DialogDemo from './dialog-demo';
import SidebarDemo from './sidebar-demo';

class Modals extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Modals</h1>
        <DialogDemo />
        <SidebarDemo />
      </div>
    );
  }
}

export default Modals;

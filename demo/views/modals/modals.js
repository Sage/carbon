import React from 'react';
import DialogDemo from './dialog-demo';
import DialogFullScreenDemo from './dialog-full-screen-demo';
import SidebarDemo from './sidebar-demo';
import AlertDemo from './alert-demo';
import ConfirmDemo from './confirm-demo';

class Modals extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Modals</h1>
        <DialogDemo />
        <DialogFullScreenDemo />
        <SidebarDemo />
        <AlertDemo />
        <ConfirmDemo />
      </div>
    );
  }
}

export default Modals;

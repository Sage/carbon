import React from 'react';
import DialogDemo from './dialog-demo';
import DialogFullScreenDemo from './dialog-full-screen-demo';

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
      </div>
    );
  }
}

export default Modals;

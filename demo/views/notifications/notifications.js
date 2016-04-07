import React from 'react';
import FlashDemo from './flash-demo';
import MessageDemo from './message-demo';
import ToastDemo from './toast-demo';

class Notifications extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Notifications</h1>
        <FlashDemo />
        <MessageDemo />
        <ToastDemo />
      </div>
    );
  }
}

export default Notifications;

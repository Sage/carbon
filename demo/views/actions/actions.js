import React from 'react';
import ButtonDemo from './button-demo';
import LinkDemo from './link-demo';
import SplitButtonDemo from './split-button-demo';

class Actions extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Actions</h1>
        <ButtonDemo />
        <LinkDemo />
        <SplitButtonDemo />
      </div>
    );
  }
}

export default Actions;

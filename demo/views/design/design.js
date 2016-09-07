import React from 'react';
import Text from './text-demo';
import Colours from './colours-demo';

class Design extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Design</h1>
        <Colours />
        <Text />
      </div>
    );
  }
}

export default Design;

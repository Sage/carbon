import React from 'react';
import SpinnerDemo from './spinner-demo';
import PillDemo from './pill-demo';

class Misc extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Misc</h1>
        <SpinnerDemo />
        <PillDemo />
      </div>
    );
  }
}

export default Misc;

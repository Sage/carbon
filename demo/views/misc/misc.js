import React from 'react';
import IconDemo from './icon-demo';
import SpinnerDemo from './spinner-demo';
import PillDemo from './pill-demo';
import ToolTipDemo from './tooltip-demo';

class Misc extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Misc</h1>
        <IconDemo />
        <SpinnerDemo />
        <PillDemo />
        <ToolTipDemo />
      </div>
    );
  }
}

export default Misc;

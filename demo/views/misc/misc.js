import React from 'react';
import IconDemo from './icon-demo';
import SpinnerDemo from './spinner-demo';
import PillDemo from './pill-demo';
import PortraitDemo from './portrait-demo';
import ProfileDemo from './profile-demo';
import TooltipDemo from './tooltip-demo';
import HelpDemo from './help-demo';

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
        <PortraitDemo />
        <ProfileDemo />
        <PillDemo />
        <TooltipDemo />
        <HelpDemo />
      </div>
    );
  }
}

export default Misc;

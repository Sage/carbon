import React from 'react';
import ButtonDemo from './button-demo';
import LinkDemo from './link-demo';
import SplitButtonDemo from './split-button-demo';
import MultiActionButtomDemo from './multi-action-button-demo';
import MultiStepWizardDemo from './multi-step-wizard-demo';
import ButtonToggleDemo from './button-toggle-demo';
import MenuDemo from './menu-demo';
import AnimatedMenuButtonDemo from './animated-menu-button-demo';

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
        <MultiActionButtomDemo />
        <MultiStepWizardDemo />
        <SplitButtonDemo />
        <ButtonToggleDemo />
        <MenuDemo />
        <AnimatedMenuButtonDemo />
      </div>
    );
  }
}

export default Actions;

import React from 'react';
import ButtonDemo from './button-demo';
import LinkDemo from './link-demo';
import SplitButtonDemo from './split-button-demo';
import MultiActionButtomDemo from './multi-action-button-demo';
import ButtonToggleDemo from './button-toggle-demo';
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
        <SplitButtonDemo />
        <ButtonToggleDemo />
        <AnimatedMenuButtonDemo />
      </div>
    );
  }
}

export default Actions;

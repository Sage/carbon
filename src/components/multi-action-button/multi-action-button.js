import React from 'react';
import classNames from 'classnames';
import Icon from './../icon';
import Button from './../button';
import SplitButton from './../split-button';

/**
 * A MultiActionButton widget.
 *
 * == How to use a MultiActionButton in a component:
 *
 * In your file
 *
 *   import MultiActionButton from 'components/multi-action-button';
 *
 * To render a MultiActionButton (developer can add any buttons to dropdown):
 *
 *   <MultiActionButton text="Main Text">
 *     <Button onClick="buttonClickHandler1">Button name 1</Button>
 *     <Button onClick="buttonClickHandler2">Button name 2</Button>
 *   </MultiActionButton>
 *
 * @class MultiActionButton
 * @constructor
 */
class MultiActionButton extends SplitButton {

  /**
   * Returns classes for the component.
   * @override
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      super.mainClasses,
      'ui-multi-action-button',
      { 'ui-multi-action-button--open': this.state.showAdditionalButtons }
    );
  }

  /**
   * Returns classes for the additional actions.
   * @override
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get additionalButtonsClasses() {
    return super.additionalButtonsClasses +
      ' ui-multi-action-button__additional-buttons';
  }

  /**
   * Returns classes for the main button.
   * @override
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get toggleButtonClasses() {
    return super.toggleButtonClasses +
      ' ui-multi-action-button__toggle';
  }

  /**
   * Returns the HTML for the main button.
   * @override
   *
   * @method renderMainButton
   * @return {Object}
   */
  get renderMainButton() {
    return (
      <div>
        <Button { ...this.toggleButtonProps } >
          { this.props.text}
          <Icon type='dropdown' />
        </Button>
      </div>
    );
  }
}

export default MultiActionButton;

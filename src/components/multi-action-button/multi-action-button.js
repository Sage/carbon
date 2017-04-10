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

  static propTypes = {
    /**
     * Customizes the appearance, can be set to 'primary', 'secondary' or 'transparent'.
     *
     * @property as
     * @type {String}
     * @default 'secondary'
     */
    as: React.PropTypes.string,

    /**
     * The text to be displayed in the SplitButton.
     *
     * @property text
     * @type {String}
     */
    text: React.PropTypes.string.isRequired,

    /**
     * Gives the button a disabled state.
     *
     * @property boolean
     * @type {Boolean}
     * @default false
     */
    disabled: React.PropTypes.bool,

    /**
     * Aligns the button's options, can be set to `right`.
     *
     * @property align
     * @type {String}
     */
    align: React.PropTypes.string
  }

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
      'carbon-multi-action-button', {
        'carbon-multi-action-button--open': this.state.showAdditionalButtons,
        'carbon-multi-action-button--align-right': this.props.align === "right"
      }
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
      ' carbon-multi-action-button__additional-buttons' +
      ' carbon-multi-action-button__additional-buttons--' + this.props.as;
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
      ' carbon-multi-action-button__toggle' +
      ' carbon-multi-action-button__toggle--' + this.props.as;
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
      <Button { ...this.toggleButtonProps } data-element='main-button'>
        { this.props.text}
        <Icon type='dropdown' />
      </Button>
    );
  }

  componentTags() {
    return {
      'data-component': 'multi-action-button',
      'data-element': this.props['data-element'],
      'data-role': this.props['data-role']
    };
  }
}

export default MultiActionButton;

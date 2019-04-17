import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import Button from '../button';
// import SplitButton from '../split-button';
import './multi-action-button.scss';

class MultiActionButton extends Component {
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
        'carbon-multi-action-button--align-right': this.props.align === 'right'
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
    return `${super.additionalButtonsClasses
    } carbon-multi-action-button__additional-buttons`
      + ` carbon-multi-action-button__additional-buttons--${this.props.as}`;
  }

  /**
   * Returns classes for the main button.
   * @override
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get toggleButtonClasses() {
    return `${super.toggleButtonClasses
    } carbon-multi-action-button__toggle`
      + ` carbon-multi-action-button__toggle--${this.props.as}`;
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

MultiActionButton.propTypes = {
  /**
   * Customizes the appearance, can be set to 'primary', 'secondary' or 'transparent'.
   */
  as: PropTypes.string,

  /**
   * The text to be displayed in the SplitButton.
   */
  text: PropTypes.string.isRequired,

  /**
   * Gives the button a disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * A custom value for the data-element attribute
   */
  'data-element': PropTypes.string,

  /**
   * A custom value for the data-element attribute
   */
  'data-role': PropTypes.string,

  /**
   * Aligns the button's options, can be set to `right`.
   */
  align: PropTypes.string
};

export default MultiActionButton;

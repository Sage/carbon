import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import Button from '../button';
import { validProps } from '../../utils/ether';
import './split-button.scss';

class SplitButton extends React.Component {
  static propTypes = {
    /**
     * Customizes the appearance, can be set to 'primary' or 'secondary'.
     */
    as: PropTypes.string,

    /**
     * A custom value for the data-element attribute
     */
    'data-element': PropTypes.string,

    /**
     * A custom value for the data-element attribute
     */
    'data-role': PropTypes.string,

    /**
     * The additional button to display.
     */
    children: PropTypes.node.isRequired,

    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * Gives the button a disabled state.
     */
    disabled: PropTypes.bool,

    /**
     * The text to be displayed in the SplitButton.
     */
    text: PropTypes.string.isRequired
  }

  static defaultProps = {
    as: 'secondary',
    disabled: false
  }

  static safeProps = ['disabled', 'as']

  constructor(args) {
    super(args);
    this.componentTags = this.componentTags.bind(this);
  }

  state = {
    /**
     * Tracks whether the additional buttons should be visible.
     */
    showAdditionalButtons: false
  }

  /**
   * Shows the additional buttons.
   */
  showButtons = () => {
    this.setState({ showAdditionalButtons: true });
  }

  /**
   * Hides additional buttons.
   */
  hideButtons = () => {
    this.setState({ showAdditionalButtons: false });
  }

  /**
   * Returns classes for the component.
   */
  get mainClasses() {
    return classNames(
      'carbon-split-button',
      this.props.className,
      {
        'carbon-split-button--open': this.state.showAdditionalButtons
      }
    );
  }

  /**
   * Returns classes for the additional actions.
   */
  get additionalButtonsClasses() {
    return classNames(
      'carbon-split-button__additional-buttons',
      {
        'carbon-split-button__additional-buttons--hidden': !this.state.showAdditionalButtons
      }
    );
  }

  /**
   * Returns classes for toggle button.
   */
  get toggleButtonClasses() {
    return 'carbon-split-button__toggle';
  }

  /**
   * Returns props for the main button.
   */
  get mainButtonProps() {
    const { ...props } = validProps(this);
    props.onMouseEnter = this.hideButtons;
    props.className = 'carbon-split-button__main-button';
    return props;
  }

  /**
   * Returns props for the toggle.
   */
  get toggleButtonProps() {
    const opts = {
      disabled: this.props.disabled,
      as: this.props.as,
      onClick: (ev) => { ev.preventDefault(); },
      className: this.toggleButtonClasses
    };

    if (!this.props.disabled) {
      opts.onMouseEnter = this.showButtons;
    }

    return opts;
  }

  /**
   * Returns the data tags for the component.
   */
  componentTags() {
    return {
      'data-component': 'split-button',
      'data-element': this.props['data-element'],
      'data-role': this.props['data-role']
    };
  }

  /**
   * Returns the HTML for the main button.
   */
  get renderMainButton() {
    return (
      <div>
        <Button { ...this.mainButtonProps } data-element='main-button'>
          { this.props.text}
        </Button>

        <Button { ...this.toggleButtonProps } data-element='open'>
          <Icon type='dropdown' />
        </Button>
      </div>
    );
  }

  /**
   * Returns the HTML for the additional buttons.
   */
  get renderAdditionalButtons() {
    return (
      <div className={ this.additionalButtonsClasses } data-element='additional-buttons'>
        { this.props.children }
      </div>
    );
  }

  render() {
    return (
      <div
        className={ this.mainClasses } onMouseLeave={ this.hideButtons }
        { ...this.componentTags() }
      >
        { this.renderMainButton }
        { this.renderAdditionalButtons }
      </div>
    );
  }
}

export default SplitButton;

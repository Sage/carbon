import React from 'react';
import classNames from 'classnames';
import Icon from './../icon';
import Button from './../button';
import { validProps } from '../../utils/ether';

/**
 * A SplitButton widget.
 *
 * == How to use a SplitButton in a component:
 *
 * In your file
 *
 *   import SplitButton from 'components/split-button';
 *
 * To render a SplitButton (developer can add any buttons to dropdown):
 *
 *   <SplitButton text="Main Button" onClick={clickHandler}>
 *     <Button onClick="buttonClickHandler1">Button name 1</Button>
 *     <Button onClick="buttonClickHandler2">Button name 2</Button>
 *   </SplitButton>
 *
 * @class SplitButton
 * @constructor
 */
class SplitButton extends React.Component {

  static propTypes = {
    /**
     * Customizes the appearance, can be set to 'primary' or 'secondary'.
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
    disabled: React.PropTypes.bool
  }

  static defaultProps = {
    as: 'secondary',
    disabled: false
  }

  static safeProps = ['disabled', 'as']

  state = {
    /**
     * Tracks whether the additional buttons should be visible.
     *
     * @property showAdditionalButtons
     * @type {Boolean}
     * @default false
     */
    showAdditionalButtons: false
  }

  constructor(args) {
    super(args);
    this.componentTags = this.componentTags.bind(this);
  }

  /**
   * Shows the additional buttons.
   *
   * @method showButtons
   */
  showButtons = () => {
    this.setState({ showAdditionalButtons: true });
  }

  /**
   * Hides additional buttons.
   *
   * @method hideButtons
   */
  hideButtons = () => {
    this.setState({ showAdditionalButtons: false });
  }

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   * @return {String} Main className
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
   *
   * @method mainClasses
   * @return {String} Main className
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
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get toggleButtonClasses() {
    return 'carbon-split-button__toggle';
  }

  /**
   * Returns props for the main button.
   *
   * @method mainButtonProps
   * @return {Object}
   */
  get mainButtonProps() {
    let { ...props } = validProps(this);
    props.onMouseEnter = this.hideButtons;
    props.className = "carbon-split-button__main-button";
    return props;
  }

  /**
   * Returns props for the toggle.
   *
   * @method toggleButtonProps
   * @return {Object}
   */
  get toggleButtonProps() {
    let opts = {
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
   * Returns the HTML for the main button.
   *
   * @method renderMainButton
   * @return {Object}
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
   *
   * @method renderAdditionalButtons
   * @return {Object}
   */
  get renderAdditionalButtons() {
    return (
      <div className={ this.additionalButtonsClasses } data-element='additional-buttons'>
        { this.props.children }
      </div>
    );
  }

  /**
   * @method render
   * @return {Object}
   */
  render() {
    return (
      <div className={ this.mainClasses } onMouseLeave={ this.hideButtons } { ...this.componentTags() }>
        { this.renderMainButton }
        { this.renderAdditionalButtons }
      </div>
    );
  }

  componentTags() {
    return {
      'data-component': 'split-button',
      'data-element': this.props['data-element'],
      'data-role': this.props['data-role']
    };
  }
}

export default SplitButton;
